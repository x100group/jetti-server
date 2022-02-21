
------------------------------ BEGIN Catalog.BRMRules ------------------------------

      RAISERROR('Catalog.BRMRules start', 0 ,1) WITH NOWAIT;
      GO
      
    CREATE OR ALTER TRIGGER [Catalog.BRMRules.t] ON [Documents] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Catalog.BRMRules');
      IF (@COUNT_D) > 1 DELETE FROM [Catalog.BRMRules.v] WHERE id IN (SELECT id FROM deleted WHERE type = N'Catalog.BRMRules');
      IF (@COUNT_D) = 1 DELETE FROM [Catalog.BRMRules.v] WHERE id = (SELECT id FROM deleted WHERE type = N'Catalog.BRMRules');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Catalog.BRMRules') = 0 RETURN;

      INSERT INTO [Catalog.BRMRules.v] ([id],[type],[date],[code],[description],[posted],[deleted],[isfolder],[timestamp],[parent],[company],[user],[workflow],[functionName],[weight])
    
      SELECT [id],[type],[date],[code],[description],[posted],[deleted],[isfolder],[timestamp],[parent],[company],[user]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."functionName"')), '') [functionName]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."weight"')), 0) [weight]

    FROM inserted r
    WHERE [type] = N'Catalog.BRMRules'
    END	
GO

    DROP TABLE IF EXISTS [Catalog.BRMRules.v];
    DROP VIEW IF EXISTS [Catalog.BRMRules.v];	
GO

    
      SELECT [id],[type],[date],[code],[description],[posted],[deleted],[isfolder],[timestamp],[parent],[company],[user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."functionName"')), '') [functionName]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."weight"')), 0) [weight]

    INTO [Catalog.BRMRules.v]
    FROM [Documents] r
    WHERE r.type = N'Catalog.BRMRules';	
GO

    GRANT SELECT,INSERT,DELETE ON [Catalog.BRMRules.v] TO JETTI;	
GO

    ALTER TABLE [Catalog.BRMRules.v] ADD CONSTRAINT [PK_Catalog.BRMRules.v] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE UNIQUE CLUSTERED INDEX [Catalog.BRMRules.v] ON [Catalog.BRMRules.v](id);
      
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.deleted] ON [Catalog.BRMRules.v](deleted,description,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.code.f] ON [Catalog.BRMRules.v](parent,isfolder,code,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.description.f] ON [Catalog.BRMRules.v](parent,isfolder,description,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.description] ON [Catalog.BRMRules.v](description,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.code] ON [Catalog.BRMRules.v](code,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.user] ON [Catalog.BRMRules.v]([user],id);
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.company] ON [Catalog.BRMRules.v](company,id);
      RAISERROR('Catalog.BRMRules end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.BRMRules ------------------------------

------------------------------ BEGIN Catalog.MoneyDocument ------------------------------

      RAISERROR('Catalog.MoneyDocument start', 0 ,1) WITH NOWAIT;
      GO
      
    CREATE OR ALTER TRIGGER [Catalog.MoneyDocument.t] ON [Documents] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Catalog.MoneyDocument');
      IF (@COUNT_D) > 1 DELETE FROM [Catalog.MoneyDocument.v] WHERE id IN (SELECT id FROM deleted WHERE type = N'Catalog.MoneyDocument');
      IF (@COUNT_D) = 1 DELETE FROM [Catalog.MoneyDocument.v] WHERE id = (SELECT id FROM deleted WHERE type = N'Catalog.MoneyDocument');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Catalog.MoneyDocument') = 0 RETURN;

      INSERT INTO [Catalog.MoneyDocument.v] ([id],[type],[date],[code],[description],[posted],[deleted],[isfolder],[timestamp],[parent],[company],[user],[workflow],[kind],[currency],[Owner],[Price],[ExpiredAt])
    
      SELECT [id],[type],[date],[code],[description],[posted],[deleted],[isfolder],[timestamp],[parent],[company],[user]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."kind"')) [kind]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Owner"')) [Owner]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Price"')), 0) [Price]
      , TRY_CONVERT(DATE, JSON_VALUE(doc,N'$."ExpiredAt"'),127) [ExpiredAt]

    FROM inserted r
    WHERE [type] = N'Catalog.MoneyDocument'
    END	
GO

    DROP TABLE IF EXISTS [Catalog.MoneyDocument.v];
    DROP VIEW IF EXISTS [Catalog.MoneyDocument.v];	
GO

    
      SELECT [id],[type],[date],[code],[description],[posted],[deleted],[isfolder],[timestamp],[parent],[company],[user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."kind"')) [kind]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Owner"')) [Owner]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Price"')), 0) [Price]
      , TRY_CONVERT(DATE, JSON_VALUE(doc,N'$."ExpiredAt"'),127) [ExpiredAt]

    INTO [Catalog.MoneyDocument.v]
    FROM [Documents] r
    WHERE r.type = N'Catalog.MoneyDocument';	
GO

    GRANT SELECT,INSERT,DELETE ON [Catalog.MoneyDocument.v] TO JETTI;	
GO

    ALTER TABLE [Catalog.MoneyDocument.v] ADD CONSTRAINT [PK_Catalog.MoneyDocument.v] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE UNIQUE CLUSTERED INDEX [Catalog.MoneyDocument.v] ON [Catalog.MoneyDocument.v](id);
      
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.MoneyDocument.v.deleted] ON [Catalog.MoneyDocument.v](deleted,description,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.MoneyDocument.v.code.f] ON [Catalog.MoneyDocument.v](parent,isfolder,code,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.MoneyDocument.v.description.f] ON [Catalog.MoneyDocument.v](parent,isfolder,description,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.MoneyDocument.v.description] ON [Catalog.MoneyDocument.v](description,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.MoneyDocument.v.code] ON [Catalog.MoneyDocument.v](code,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.MoneyDocument.v.user] ON [Catalog.MoneyDocument.v]([user],id);
    CREATE UNIQUE NONCLUSTERED INDEX [Catalog.MoneyDocument.v.company] ON [Catalog.MoneyDocument.v](company,id);
      RAISERROR('Catalog.MoneyDocument end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.MoneyDocument ------------------------------
