
------------------------------ BEGIN Catalog.Account ------------------------------

RAISERROR('Catalog.Account start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.Account.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.Account.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.Account.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."descriptionEng"')), '') [descriptionEng]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isActive"')), 0) [isActive]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isPassive"')), 0) [isPassive]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isForex"')), 0) [isForex]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.Account'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.Account.v] ON [Catalog.Account.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Account.v.deleted] ON [Catalog.Account.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Account.v.code.f] ON [Catalog.Account.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Account.v.description.f] ON [Catalog.Account.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Account.v.description] ON [Catalog.Account.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Account.v.code] ON [Catalog.Account.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Account.v.user] ON [Catalog.Account.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Account.v.company] ON [Catalog.Account.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.Account.v]TO jetti;
RAISERROR('Catalog.Account end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.Account ------------------------------

------------------------------ BEGIN Catalog.AcquiringTerminal ------------------------------

RAISERROR('Catalog.AcquiringTerminal start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.AcquiringTerminal.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.AcquiringTerminal.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.AcquiringTerminal.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."BankAccount"')) [BankAccount]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Counterpartie"')) [Counterpartie]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Department"')) [Department]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isActive"')), 0) [isActive]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isDefault"')), 0) [isDefault]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Code1"')), '') [Code1]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.AcquiringTerminal'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.AcquiringTerminal.v] ON [Catalog.AcquiringTerminal.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.AcquiringTerminal.v.deleted] ON [Catalog.AcquiringTerminal.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.AcquiringTerminal.v.code.f] ON [Catalog.AcquiringTerminal.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.AcquiringTerminal.v.description.f] ON [Catalog.AcquiringTerminal.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.AcquiringTerminal.v.description] ON [Catalog.AcquiringTerminal.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.AcquiringTerminal.v.code] ON [Catalog.AcquiringTerminal.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.AcquiringTerminal.v.user] ON [Catalog.AcquiringTerminal.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.AcquiringTerminal.v.company] ON [Catalog.AcquiringTerminal.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.AcquiringTerminal.v]TO jetti;
RAISERROR('Catalog.AcquiringTerminal end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.AcquiringTerminal ------------------------------

------------------------------ BEGIN Catalog.Advertising ------------------------------

RAISERROR('Catalog.Advertising start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.Advertising.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.Advertising.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.Advertising.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."kind"')), '') [kind]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."shortDescription"')), '') [shortDescription]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."fullDescription"')), '') [fullDescription]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isActive"')), 0) [isActive]
      , TRY_CONVERT(DATE, JSON_VALUE(doc,N'$."dateFrom"'),127) [dateFrom]
      , TRY_CONVERT(DATE, JSON_VALUE(doc,N'$."dateTill"'),127) [dateTill]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."availableCron"')), '') [availableCron]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."slug"')), '') [slug]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."typeAction"')), '') [typeAction]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."valueAction"')), '') [valueAction]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.Advertising'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.Advertising.v] ON [Catalog.Advertising.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Advertising.v.deleted] ON [Catalog.Advertising.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Advertising.v.code.f] ON [Catalog.Advertising.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Advertising.v.description.f] ON [Catalog.Advertising.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Advertising.v.description] ON [Catalog.Advertising.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Advertising.v.code] ON [Catalog.Advertising.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Advertising.v.user] ON [Catalog.Advertising.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Advertising.v.company] ON [Catalog.Advertising.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.Advertising.v]TO jetti;
RAISERROR('Catalog.Advertising end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.Advertising ------------------------------

------------------------------ BEGIN Catalog.BusinessRegion ------------------------------

RAISERROR('Catalog.BusinessRegion start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.BusinessRegion.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.BusinessRegion.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.BusinessRegion.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Population"')), 0) [Population]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isDevelopmentRegion"')), 0) [isDevelopmentRegion]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isActive"')), 0) [isActive]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Country"')) [Country]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Longitude"')), '') [Longitude]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Latitude"')), '') [Latitude]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Slug"')), '') [Slug]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."GeoCodeName"')), '') [GeoCodeName]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."DstOffset"')), 0) [DstOffset]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."TimeOffset"')), 0) [TimeOffset]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."TimeZoneId"')), '') [TimeZoneId]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."PriceType"')) [PriceType]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."GeocodeRadius"')), 0) [GeocodeRadius]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."CallCenterPhone"')), '') [CallCenterPhone]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."SalaryRateRegion"')), '') [SalaryRateRegion]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.BusinessRegion'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.BusinessRegion.v] ON [Catalog.BusinessRegion.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BusinessRegion.v.deleted] ON [Catalog.BusinessRegion.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BusinessRegion.v.code.f] ON [Catalog.BusinessRegion.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BusinessRegion.v.description.f] ON [Catalog.BusinessRegion.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BusinessRegion.v.description] ON [Catalog.BusinessRegion.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BusinessRegion.v.code] ON [Catalog.BusinessRegion.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BusinessRegion.v.user] ON [Catalog.BusinessRegion.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BusinessRegion.v.company] ON [Catalog.BusinessRegion.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.BusinessRegion.v]TO jetti;
RAISERROR('Catalog.BusinessRegion end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.BusinessRegion ------------------------------

------------------------------ BEGIN Catalog.Counterpartie ------------------------------

RAISERROR('Catalog.Counterpartie start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.Counterpartie.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.Counterpartie.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.Counterpartie.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."kind"')), '') [kind]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."FullName"')), '') [FullName]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Department"')) [Department]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."Client"')), 0) [Client]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."Supplier"')), 0) [Supplier]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isInternal"')), 0) [isInternal]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."AddressShipping"')), '') [AddressShipping]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."AddressBilling"')), '') [AddressBilling]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Phone"')), '') [Phone]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Code1"')), '') [Code1]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Code2"')), '') [Code2]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Code3"')), '') [Code3]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."BC"')), '') [BC]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."GLN"')), '') [GLN]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Manager"')) [Manager]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Mail"')), '') [Mail]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."ParentCounterpartie"')) [ParentCounterpartie]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.Counterpartie'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.Counterpartie.v] ON [Catalog.Counterpartie.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Counterpartie.v.deleted] ON [Catalog.Counterpartie.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Counterpartie.v.code.f] ON [Catalog.Counterpartie.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Counterpartie.v.description.f] ON [Catalog.Counterpartie.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Counterpartie.v.description] ON [Catalog.Counterpartie.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Counterpartie.v.code] ON [Catalog.Counterpartie.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Counterpartie.v.user] ON [Catalog.Counterpartie.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Counterpartie.v.company] ON [Catalog.Counterpartie.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.Counterpartie.v]TO jetti;
RAISERROR('Catalog.Counterpartie end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.Counterpartie ------------------------------

------------------------------ BEGIN Catalog.Department.Company ------------------------------

RAISERROR('Catalog.Department.Company start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.Department.Company.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.Department.Company.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.Department.Company.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."kind"')), '') [kind]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."ShortName"')), '') [ShortName]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."SecurityGroup"')), '') [SecurityGroup]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Department"')) [Department]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."StaffingPositionManager"')) [StaffingPositionManager]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."StaffingPositionAssistant"')) [StaffingPositionAssistant]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.Department.Company'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.Department.Company.v] ON [Catalog.Department.Company.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Department.Company.v.deleted] ON [Catalog.Department.Company.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Department.Company.v.code.f] ON [Catalog.Department.Company.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Department.Company.v.description.f] ON [Catalog.Department.Company.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Department.Company.v.description] ON [Catalog.Department.Company.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Department.Company.v.code] ON [Catalog.Department.Company.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Department.Company.v.user] ON [Catalog.Department.Company.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Department.Company.v.company] ON [Catalog.Department.Company.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.Department.Company.v]TO jetti;
RAISERROR('Catalog.Department.Company end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.Department.Company ------------------------------

------------------------------ BEGIN Catalog.JobTitle ------------------------------

RAISERROR('Catalog.JobTitle start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.JobTitle.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.JobTitle.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.JobTitle.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Category"')) [Category]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."TO"')), 0) [TO]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."CO"')), 0) [CO]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."FunctionalStructure"')) [FunctionalStructure]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."ShortName"')), '') [ShortName]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.JobTitle'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.JobTitle.v] ON [Catalog.JobTitle.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.v.deleted] ON [Catalog.JobTitle.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.v.code.f] ON [Catalog.JobTitle.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.v.description.f] ON [Catalog.JobTitle.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.v.description] ON [Catalog.JobTitle.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.v.code] ON [Catalog.JobTitle.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.v.user] ON [Catalog.JobTitle.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.v.company] ON [Catalog.JobTitle.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.JobTitle.v]TO jetti;
RAISERROR('Catalog.JobTitle end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.JobTitle ------------------------------

------------------------------ BEGIN Catalog.JobTitle.Functional ------------------------------

RAISERROR('Catalog.JobTitle.Functional start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.JobTitle.Functional.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.JobTitle.Functional.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.JobTitle.Functional.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."StaffingTableResponsible"')) [StaffingTableResponsible]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.JobTitle.Functional'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.JobTitle.Functional.v] ON [Catalog.JobTitle.Functional.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.Functional.v.deleted] ON [Catalog.JobTitle.Functional.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.Functional.v.code.f] ON [Catalog.JobTitle.Functional.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.Functional.v.description.f] ON [Catalog.JobTitle.Functional.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.Functional.v.description] ON [Catalog.JobTitle.Functional.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.Functional.v.code] ON [Catalog.JobTitle.Functional.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.Functional.v.user] ON [Catalog.JobTitle.Functional.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.JobTitle.Functional.v.company] ON [Catalog.JobTitle.Functional.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.JobTitle.Functional.v]TO jetti;
RAISERROR('Catalog.JobTitle.Functional end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.JobTitle.Functional ------------------------------

------------------------------ BEGIN Catalog.OrderSource ------------------------------

RAISERROR('Catalog.OrderSource start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.OrderSource.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.OrderSource.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.OrderSource.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."Kind"')), '') [Kind]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."SourceType"')), '') [SourceType]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Country"')) [Country]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Counterpartie"')) [Counterpartie]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.OrderSource'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.OrderSource.v] ON [Catalog.OrderSource.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.OrderSource.v.deleted] ON [Catalog.OrderSource.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.OrderSource.v.code.f] ON [Catalog.OrderSource.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.OrderSource.v.description.f] ON [Catalog.OrderSource.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.OrderSource.v.description] ON [Catalog.OrderSource.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.OrderSource.v.code] ON [Catalog.OrderSource.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.OrderSource.v.user] ON [Catalog.OrderSource.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.OrderSource.v.company] ON [Catalog.OrderSource.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.OrderSource.v]TO jetti;
RAISERROR('Catalog.OrderSource end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.OrderSource ------------------------------

------------------------------ BEGIN Catalog.Person.Contract ------------------------------

RAISERROR('Catalog.Person.Contract start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.Person.Contract.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.Person.Contract.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.Person.Contract.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."owner"')) [owner]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."Status"')), '') [Status]
      , TRY_CONVERT(DATE, JSON_VALUE(doc,N'$."StartDate"'),127) [StartDate]
      , TRY_CONVERT(DATE, JSON_VALUE(doc,N'$."EndDate"'),127) [EndDate]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."BankAccount"')) [BankAccount]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."Kind"')), '') [Kind]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.Person.Contract'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.Person.Contract.v] ON [Catalog.Person.Contract.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Person.Contract.v.deleted] ON [Catalog.Person.Contract.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Person.Contract.v.code.f] ON [Catalog.Person.Contract.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Person.Contract.v.description.f] ON [Catalog.Person.Contract.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Person.Contract.v.description] ON [Catalog.Person.Contract.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Person.Contract.v.code] ON [Catalog.Person.Contract.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Person.Contract.v.user] ON [Catalog.Person.Contract.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Person.Contract.v.company] ON [Catalog.Person.Contract.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.Person.Contract.v]TO jetti;
RAISERROR('Catalog.Person.Contract end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.Person.Contract ------------------------------

------------------------------ BEGIN Catalog.ReasonTypes ------------------------------

RAISERROR('Catalog.ReasonTypes start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.ReasonTypes.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.ReasonTypes.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.ReasonTypes.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."WriteOff"')), 0) [WriteOff]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Expense"')) [Expense]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."ExpenseAnalynic"')) [ExpenseAnalynic]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."Kind"')), '') [Kind]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.ReasonTypes'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.ReasonTypes.v] ON [Catalog.ReasonTypes.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.ReasonTypes.v.deleted] ON [Catalog.ReasonTypes.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.ReasonTypes.v.code.f] ON [Catalog.ReasonTypes.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.ReasonTypes.v.description.f] ON [Catalog.ReasonTypes.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.ReasonTypes.v.description] ON [Catalog.ReasonTypes.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.ReasonTypes.v.code] ON [Catalog.ReasonTypes.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.ReasonTypes.v.user] ON [Catalog.ReasonTypes.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.ReasonTypes.v.company] ON [Catalog.ReasonTypes.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.ReasonTypes.v]TO jetti;
RAISERROR('Catalog.ReasonTypes end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.ReasonTypes ------------------------------

------------------------------ BEGIN Catalog.RetailNetwork ------------------------------

RAISERROR('Catalog.RetailNetwork start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.RetailNetwork.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.RetailNetwork.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.RetailNetwork.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Brand"')) [Brand]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Country"')) [Country]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."BusinessRegion"')) [BusinessRegion]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Currency"')) [Currency]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."BonusPercent"')), 0) [BonusPercent]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."smsGateway"')), '') [smsGateway]
      , ISNULL(TRY_CONVERT(NVARCHAR(250), JSON_VALUE(doc,N'$."keyVaultURL"')), '') [keyVaultURL]
      , ISNULL(TRY_CONVERT(NVARCHAR(250), JSON_VALUE(doc,N'$."publicOfferUrl"')), '') [publicOfferUrl]
      , ISNULL(TRY_CONVERT(NVARCHAR(250), JSON_VALUE(doc,N'$."aboutCompanyUrl"')), '') [aboutCompanyUrl]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."customerSupportPhone"')), '') [customerSupportPhone]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isDeleted"')), 0) [isDeleted]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."ServiceProduct"')) [ServiceProduct]
      , ISNULL(TRY_CONVERT(NVARCHAR(250), JSON_VALUE(doc,N'$."PlaceHolder"')), '') [PlaceHolder]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."maxTotalOrder"')), 0) [maxTotalOrder]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."appAvailable"')), 0) [appAvailable]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."DefaultMapService"')), '') [DefaultMapService]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.RetailNetwork'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.RetailNetwork.v] ON [Catalog.RetailNetwork.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.RetailNetwork.v.deleted] ON [Catalog.RetailNetwork.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.RetailNetwork.v.code.f] ON [Catalog.RetailNetwork.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.RetailNetwork.v.description.f] ON [Catalog.RetailNetwork.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.RetailNetwork.v.description] ON [Catalog.RetailNetwork.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.RetailNetwork.v.code] ON [Catalog.RetailNetwork.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.RetailNetwork.v.user] ON [Catalog.RetailNetwork.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.RetailNetwork.v.company] ON [Catalog.RetailNetwork.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.RetailNetwork.v]TO jetti;
RAISERROR('Catalog.RetailNetwork end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.RetailNetwork ------------------------------

------------------------------ BEGIN Catalog.Specification ------------------------------

RAISERROR('Catalog.Specification start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.Specification.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.Specification.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.Specification.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Brand"')) [Brand]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."MainProduct"')) [MainProduct]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."Status"')), '') [Status]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."FullDescription"')), '') [FullDescription]
      , TRY_CONVERT(DATE, JSON_VALUE(doc,N'$."StartDate"'),127) [StartDate]
      , TRY_CONVERT(DATE, JSON_VALUE(doc,N'$."EndDate"'),127) [EndDate]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."ResponsiblePerson"')) [ResponsiblePerson]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."RetailNetwork"')) [RetailNetwork]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.Specification'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.Specification.v] ON [Catalog.Specification.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Specification.v.deleted] ON [Catalog.Specification.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Specification.v.code.f] ON [Catalog.Specification.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Specification.v.description.f] ON [Catalog.Specification.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Specification.v.description] ON [Catalog.Specification.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Specification.v.code] ON [Catalog.Specification.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Specification.v.user] ON [Catalog.Specification.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Specification.v.company] ON [Catalog.Specification.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.Specification.v]TO jetti;
RAISERROR('Catalog.Specification end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.Specification ------------------------------

------------------------------ BEGIN Catalog.Vehicle ------------------------------

RAISERROR('Catalog.Vehicle start', 0 ,1) WITH NOWAIT;
      DROP TABLE IF EXISTS dbo.[Catalog.Vehicle.v]
GO
DROP TRIGGER IF EXISTS dbo.[Catalog.Vehicle.t]
GO
CREATE OR ALTER VIEW dbo.[Catalog.Vehicle.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Carrier"')) [Carrier]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Model"')), '') [Model]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."RegNumber"')), '') [RegNumber]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."kind"')), '') [kind]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Carrying"')), 0) [Carrying]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Capacity"')), 0) [Capacity]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."ModelTrailer"')), '') [ModelTrailer]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."RegNumberTrailer"')), '') [RegNumberTrailer]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.Vehicle'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.Vehicle.v] ON [Catalog.Vehicle.v](id);
        
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Vehicle.v.deleted] ON [Catalog.Vehicle.v](deleted,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Vehicle.v.code.f] ON [Catalog.Vehicle.v](parent,isfolder,code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Vehicle.v.description.f] ON [Catalog.Vehicle.v](parent,isfolder,description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Vehicle.v.description] ON [Catalog.Vehicle.v](description,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Vehicle.v.code] ON [Catalog.Vehicle.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Vehicle.v.user] ON [Catalog.Vehicle.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Catalog.Vehicle.v.company] ON [Catalog.Vehicle.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.Vehicle.v]TO jetti;
RAISERROR('Catalog.Vehicle end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.Vehicle ------------------------------

    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.Amount] ON [Document.Operation.v](Amount,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.Group] ON [dbo].[Document.Operation.v]([Group],[date],[id]);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.Group.user] ON [dbo].[Document.Operation.v]([user],[Group],[date],[id]);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.Operation] ON [Document.Operation.v](Operation,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.currency] ON [Document.Operation.v](currency,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.f1] ON [Document.Operation.v](f1,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.f2] ON [Document.Operation.v](f2,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.f3] ON [Document.Operation.v](f3,id);
    CREATE NONCLUSTERED INDEX [Document.Operation.v.timestamp] ON [Document.Operation.v]([timestamp],[Operation]);

    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.Amount.rls] ON [Document.Operation.v](company,Amount,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.Group.rls] ON [dbo].[Document.Operation.v](company,[Group],[date],[id]);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.Group.user.rls] ON [dbo].[Document.Operation.v](company,[user],[Group],[date],[id]);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.Operation.rls] ON [Document.Operation.v](company,Operation,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.currency.rls] ON [Document.Operation.v](company,currency,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.f1.rls] ON [Document.Operation.v](company,f1,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.f2.rls] ON [Document.Operation.v](company,f2,id);
    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.f3.rls] ON [Document.Operation.v](company,f3,id);

    CREATE UNIQUE NONCLUSTERED INDEX [Document.Operation.v.CompanyGroup] ON [dbo].[Document.Operation.v]([company],[Group],[date],[id])INCLUDE([deleted])
    