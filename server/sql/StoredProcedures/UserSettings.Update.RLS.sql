CREATE PROCEDURE [dbo].[UserSettings.Update.RLS]
	@DocId uniqueidentifier
AS
BEGIN
	DECLARE @UserOrGroup TABLE ([documents] uniqueidentifier, [type] nvarchar(50), [UserOrGroup] uniqueidentifier)
	DECLARE @ResUserOrGroup TABLE ([document] uniqueidentifier, [User] uniqueidentifier, [AccountAD] nvarchar(50))

--	DECLARE @DocCompany uniqueidentifier = (SELECT [company] FROM [dbo].[Documents] WHERE [id] = @DocId);
	DECLARE @DocDate datetimeoffset(7) = (SELECT [date] FROM [dbo].[Documents] WHERE [id] = @DocId);

	DROP TABLE IF EXISTS #CompanyList
	DROP TABLE IF EXISTS #RLS

	INSERT INTO @UserOrGroup
	SELECT DocUserSettings.[id] as [documents]
		,SpravDoc.[type] as [type]
		,docJson.[UserOrGroup]
	FROM [dbo].[Documents] as DocUserSettings
	CROSS APPLY OPENJSON(DocUserSettings.[doc]) 
	WITH ([UserOrGroup] uniqueidentifier) as docJson
	LEFT JOIN [dbo].[Documents] as SpravDoc on SpravDoc.[id] = docJson.[UserOrGroup]
	WHERE 1=1
		and DocUserSettings.[type] = 'Document.UserSettings'
		and DocUserSettings.[id] = @DocId

	SELECT DocUserSettings.[id] as "document"
		, CompanyList.[company]
	INTO #CompanyList
	FROM [dbo].[Documents] as DocUserSettings
	CROSS APPLY OPENJSON(JSON_QUERY(DocUserSettings.[doc], '$.CompanyList'))
	WITH ([company] uniqueidentifier) as "CompanyList"
	WHERE 1=1
		and DocUserSettings.[type] = 'Document.UserSettings'
		and DocUserSettings.[id] = @DocId

	if ((SELECT TOP 1 [type] FROM @UserOrGroup) = 'Catalog.UsersGroup')
	BEGIN
		INSERT INTO @ResUserOrGroup
		SELECT (SELECT TOP 1 [documents] FROM @UserOrGroup) as "document"
			,Users.[User] as "User"
			,CatUser.[code] as "AccountAD"
		FROM [dbo].[documents] as DocUserGroup 
		CROSS APPLY OPENJSON(JSON_QUERY(DocUserGroup.[doc], '$.Users'))
		WITH ([User] uniqueidentifier) as Users
		LEFT JOIN [dbo].[Catalog.User.v] as CatUser with (noexpand) on CatUser.[id] = Users.[User]
		where DocUserGroup.[type] = (SELECT TOP 1 [type] FROM @UserOrGroup) and DocUserGroup.[id] = (SELECT TOP 1 [UserOrGroup] FROM @UserOrGroup) 
	END

	if ((SELECT TOP 1 [type] FROM @UserOrGroup) = 'Catalog.User')
	BEGIN
		INSERT INTO @ResUserOrGroup
		SELECT (SELECT TOP 1 [documents] FROM @UserOrGroup) as "document"
			,DocUser.[id] as "User"
			,CatUser.[code] as "AccountAD"
		FROM [dbo].[documents] as DocUser 
		LEFT JOIN [dbo].[Catalog.User.v] as CatUser with (noexpand) on CatUser.[id] = DocUser.[id]
		where DocUser.[type] = (SELECT TOP 1 [type] FROM @UserOrGroup) and DocUser.[id] = (SELECT TOP 1 [UserOrGroup] FROM @UserOrGroup) 
	END

	SELECT DISTINCT CompanyList.[company] as [company]
		,Result.[AccountAD] as [user]
		,Result.[document] as [document]
	INTO #RLS
	FROM @ResUserOrGroup as Result
	CROSS APPLY (SELECT [document], [company] FROM #CompanyList) as "CompanyList"
	WHERE Result.[document] = @DocId

	DELETE FROM [rls].[company] WHERE [document] = @DocId
	INSERT INTO [rls].[company]([company],[user],[document])
	SELECT [company]
		,[user]
		,[document]
	FROM #RLS

	DELETE FROM [dbo].[Register.Info] WHERE [document] = @DocId
	INSERT INTO [dbo].[Register.Info]([id],[date],[type],[data],[document],[company])
	SELECT NEWID() as [id]
		,@DocDate as [date]
		,'Register.Info.RLS' as [type]
		,(SELECT [user] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) as [data]
		,[document]
		,[company]
	FROM #RLS
END
GO

GRANT  EXECUTE ON [dbo].[UserSettings.Update.RLS] TO JETTI