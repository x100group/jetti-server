import { lib } from '../../std.lib';
import { PostResult } from '../post.interfaces';
import { RegisterInfoRLS } from '../Registers/Info/RLS';
import { CompanyItems, DocumentUserSettings } from './Document.UserSettings';
import { MSSQL } from '../../mssql';
import { IServerDocument } from '../documents.factory.server';

export const queryPost = `
--DECLARE @p1 uniqueidentifier = 'F787EA90-D593-11EA-A56A-0B950F0DDFD1'
DECLARE @UserOrGroup TABLE ([documents] uniqueidentifier, [type] nvarchar(50), [UserOrGroup] uniqueidentifier)
DECLARE @ResUserOrGroup TABLE ([document] uniqueidentifier, [User] uniqueidentifier, [AccountAD] nvarchar(50))

DROP TABLE IF EXISTS #CompanyList

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
and DocUserSettings.[id] = @p1

SELECT DocUserSettings.[id] as "document"
, CompanyList.[company]
INTO #CompanyList
FROM [dbo].[Documents] as DocUserSettings
CROSS APPLY OPENJSON(JSON_QUERY(DocUserSettings.[doc], '$.CompanyList'))
WITH ([company] uniqueidentifier) as "CompanyList"
WHERE 1=1
and DocUserSettings.[type] = 'Document.UserSettings'
and DocUserSettings.[id] = @p1

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

DELETE FROM [rls].[company] WHERE [document] = @p1;

SELECT DISTINCT Result.[document]
,Result.[AccountAD] [user]
,CompanyList.[company]
INTO #RLS
FROM @ResUserOrGroup as Result
CROSS APPLY (SELECT [document], [company] FROM #CompanyList) as "CompanyList"
WHERE Result.[document] = @p1;

INSERT INTO rls.[company]([user],[company],[document])
SELECT [user],[company],[document] FROM #RLS;

SELECT * FROM #RLS;`;

export class DocumentUserSettingsServer extends DocumentUserSettings implements IServerDocument {

  async AddDescendantsCompany(tx: MSSQL) {
    if (!this.company) throw new Error(`Empty company!`);
    const query = `
    SELECT
      cat.id company,
      [Group.id] [group],
      [ResponsibilityCenter.id] responsibilityCenter
    FROM dbo.[Descendants](@p1, '') comp
    left join [dbo].[Catalog.Company] cat on cat.id = comp.id
    order by
      [Group.value],
      [ResponsibilityCenter.value],
      cat.[Company]`;
    const companyItems = await tx.manyOrNone<CompanyItems>(query, [this.company]);
    companyItems
      .filter(c => !this.CompanyList.find(cl => cl.company === c.company))
      .forEach(c => this.CompanyList.push(c));
  }

  async RefreshCompanyList(tx: MSSQL) {
    const compIds = this.CompanyList.filter(e => !!e.company).map(e => `'${e.company}'`).join(',');
    const query = `
    SELECT
      id company,
      [Group.id] [group],
      [ResponsibilityCenter.id] responsibilityCenter
    FROM [dbo].[Catalog.Company]
    WHERE id IN (${compIds})
    order by
      [Group.value],
      [ResponsibilityCenter.value],
      [Company]`;
    this.CompanyList = await tx.manyOrNone<CompanyItems>(query);
  }

  async ClearCompanyList(tx: MSSQL) {
    this.CompanyList = [];
  }

  async onValueChanged(prop: string, value: any, tx: MSSQL) {
    switch (prop) {
      case 'company':
        return this;
      default:
        return this;
    }
  }

  async onCommand(command: string, args: any, tx: MSSQL) {
    switch (command) {
      case 'company':
        return {};
      case 'AddDescendantsCompany':
        await this.AddDescendantsCompany(tx);
        return this;
      case 'RefreshCompanyList':
        await this.RefreshCompanyList(tx);
        return this;
      case 'ClearCompanyList':
        await this.ClearCompanyList(tx);
        return this;
      default:
        return {};
    }
  }

  async beforeDelete(tx: MSSQL) {
    await this.deleteRLSMovements(tx);
    return this;
  }

  async onUnPost(tx: MSSQL) {
    await this.deleteRLSMovements(tx);
    return this;
  }

  async deleteRLSMovements(tx: MSSQL) {
    await tx.none(`DELETE FROM [rls].[company] WHERE [document] = @p1`, [this.id]);
  }

  async onPost(tx: MSSQL) {
    await lib.util.adminMode(true, tx);
    try {
      await tx.none(`EXECUTE [dbo].[UserSettings.Update.RLS]'${this.id}'`);
      return { Account: [], Accumulation: [], Info: [] };
    } catch (ex) { throw new Error(ex); }
    finally { await lib.util.adminMode(false, tx); }
  }

  async _onPost(tx: MSSQL) {
    const Registers: PostResult = { Account: [], Accumulation: [], Info: [] };

    await lib.util.adminMode(true, tx);
    try {
      await this.deleteRLSMovements(tx);
      const Users = await tx.manyOrNone<{ id: string, code: string }>(`
        SELECT id, code FROM  Documents WHERE deleted = 0 AND id IN (
          SELECT @p1 id
          UNION ALL
          SELECT [UsersGroup.User] id FROM Documents
          CROSS APPLY OPENJSON (doc, N'$.Users')
          WITH
          (
            [UsersGroup.User] UNIQUEIDENTIFIER N'$.User'
          ) AS Users
          WHERE (1=1) AND
          [posted] = 1 AND
          [type] = N'Catalog.UsersGroup' AND
          [id] = @p1
        );`, [this.UserOrGroup]
      );

      // lib.sys.clearUsersPermissons(Users.map(e => e.id));

      for (const user of Users) {
        for (const row of this.CompanyList) {
          Registers.Info.push(new RegisterInfoRLS({
            company: row.company,
            user: user.code,
          }));
        }
      }

      const query = (Registers.Info as RegisterInfoRLS[])
        .map(e => `INSERT INTO [rls].[company]([user],[company],[document]) VALUES('${e.user}', '${e.company}', '${this.id}')`)
        .join(';');

      await tx.none(query);

      return Registers;

    } catch (ex) { throw new Error(ex); }
    finally { await lib.util.adminMode(false, tx); }
  }
}

