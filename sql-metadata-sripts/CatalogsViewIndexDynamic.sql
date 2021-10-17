
------------------------------ BEGIN Catalog.Account ------------------------------

RAISERROR('Catalog.Account start', 0 ,1) WITH NOWAIT;
      
BEGIN TRY
  ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Catalog.Account.v];
END TRY
BEGIN CATCH
END CATCH;
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
GO

ALTER SECURITY POLICY [rls].[companyAccessPolicy] ADD FILTER PREDICATE [rls].[fn_companyAccessPredicate]([company]) ON [dbo].[Catalog.Account.v];
RAISERROR('Catalog.Account end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.Account ------------------------------

------------------------------ BEGIN Catalog.Advertising ------------------------------

RAISERROR('Catalog.Advertising start', 0 ,1) WITH NOWAIT;
      
BEGIN TRY
  ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Catalog.Advertising.v];
END TRY
BEGIN CATCH
END CATCH;
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
GO

ALTER SECURITY POLICY [rls].[companyAccessPolicy] ADD FILTER PREDICATE [rls].[fn_companyAccessPredicate]([company]) ON [dbo].[Catalog.Advertising.v];
RAISERROR('Catalog.Advertising end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.Advertising ------------------------------

------------------------------ BEGIN Catalog.BRMRules ------------------------------

RAISERROR('Catalog.BRMRules start', 0 ,1) WITH NOWAIT;
      
BEGIN TRY
  ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Catalog.BRMRules.v];
END TRY
BEGIN CATCH
END CATCH;
GO
CREATE OR ALTER VIEW dbo.[Catalog.BRMRules.v] WITH SCHEMABINDING AS
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."functionName"')), '') [functionName]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."weight"')), 0) [weight]
      FROM dbo.[Documents]
      WHERE [type] = N'Catalog.BRMRules'
;
GO
CREATE UNIQUE CLUSTERED INDEX [Catalog.BRMRules.v] ON [Catalog.BRMRules.v](id);
        
CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.deleted] ON [Catalog.BRMRules.v](deleted,description,id);
CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.code.f] ON [Catalog.BRMRules.v](parent,isfolder,code,id);
CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.description.f] ON [Catalog.BRMRules.v](parent,isfolder,description,id);
CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.description] ON [Catalog.BRMRules.v](description,id);
CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.code] ON [Catalog.BRMRules.v](code,id);
CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.user] ON [Catalog.BRMRules.v]([user],id);
CREATE UNIQUE NONCLUSTERED INDEX [Catalog.BRMRules.v.company] ON [Catalog.BRMRules.v](company,id);
GO
GRANT SELECT ON dbo.[Catalog.BRMRules.v]TO jetti;
GO

ALTER SECURITY POLICY [rls].[companyAccessPolicy] ADD FILTER PREDICATE [rls].[fn_companyAccessPredicate]([company]) ON [dbo].[Catalog.BRMRules.v];
RAISERROR('Catalog.BRMRules end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.BRMRules ------------------------------

------------------------------ BEGIN Catalog.BusinessRegion ------------------------------

RAISERROR('Catalog.BusinessRegion start', 0 ,1) WITH NOWAIT;
      
BEGIN TRY
  ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Catalog.BusinessRegion.v];
END TRY
BEGIN CATCH
END CATCH;
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
GO

ALTER SECURITY POLICY [rls].[companyAccessPolicy] ADD FILTER PREDICATE [rls].[fn_companyAccessPredicate]([company]) ON [dbo].[Catalog.BusinessRegion.v];
RAISERROR('Catalog.BusinessRegion end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.BusinessRegion ------------------------------

------------------------------ BEGIN Catalog.Counterpartie ------------------------------

RAISERROR('Catalog.Counterpartie start', 0 ,1) WITH NOWAIT;
      
BEGIN TRY
  ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Catalog.Counterpartie.v];
END TRY
BEGIN CATCH
END CATCH;
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
GO

ALTER SECURITY POLICY [rls].[companyAccessPolicy] ADD FILTER PREDICATE [rls].[fn_companyAccessPredicate]([company]) ON [dbo].[Catalog.Counterpartie.v];
RAISERROR('Catalog.Counterpartie end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.Counterpartie ------------------------------

------------------------------ BEGIN Catalog.JobTitle ------------------------------

RAISERROR('Catalog.JobTitle start', 0 ,1) WITH NOWAIT;
      
BEGIN TRY
  ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Catalog.JobTitle.v];
END TRY
BEGIN CATCH
END CATCH;
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
GO

ALTER SECURITY POLICY [rls].[companyAccessPolicy] ADD FILTER PREDICATE [rls].[fn_companyAccessPredicate]([company]) ON [dbo].[Catalog.JobTitle.v];
RAISERROR('Catalog.JobTitle end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.JobTitle ------------------------------

------------------------------ BEGIN Catalog.JobTitle.Functional ------------------------------

RAISERROR('Catalog.JobTitle.Functional start', 0 ,1) WITH NOWAIT;
      
BEGIN TRY
  ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Catalog.JobTitle.Functional.v];
END TRY
BEGIN CATCH
END CATCH;
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
GO

ALTER SECURITY POLICY [rls].[companyAccessPolicy] ADD FILTER PREDICATE [rls].[fn_companyAccessPredicate]([company]) ON [dbo].[Catalog.JobTitle.Functional.v];
RAISERROR('Catalog.JobTitle.Functional end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.JobTitle.Functional ------------------------------

------------------------------ BEGIN Catalog.OrderSource ------------------------------

RAISERROR('Catalog.OrderSource start', 0 ,1) WITH NOWAIT;
      
BEGIN TRY
  ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Catalog.OrderSource.v];
END TRY
BEGIN CATCH
END CATCH;
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
GO

ALTER SECURITY POLICY [rls].[companyAccessPolicy] ADD FILTER PREDICATE [rls].[fn_companyAccessPredicate]([company]) ON [dbo].[Catalog.OrderSource.v];
RAISERROR('Catalog.OrderSource end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.OrderSource ------------------------------

------------------------------ BEGIN Catalog.RetailNetwork ------------------------------

RAISERROR('Catalog.RetailNetwork start', 0 ,1) WITH NOWAIT;
      
BEGIN TRY
  ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Catalog.RetailNetwork.v];
END TRY
BEGIN CATCH
END CATCH;
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
GO

ALTER SECURITY POLICY [rls].[companyAccessPolicy] ADD FILTER PREDICATE [rls].[fn_companyAccessPredicate]([company]) ON [dbo].[Catalog.RetailNetwork.v];
RAISERROR('Catalog.RetailNetwork end', 0 ,1) WITH NOWAIT;
      
------------------------------ END Catalog.RetailNetwork ------------------------------

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
    