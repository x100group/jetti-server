CREATE OR ALTER VIEW[dbo].[Catalog.Documents] AS
    SELECT
    'https://x100-jetti.web.app/' + d.type + '/' + TRY_CONVERT(varchar(36), d.id) as link,
      d.id, d.date[date],
      d.description Presentation,
        d.info,
        d.type, CAST(JSON_VALUE(doc, N'$.DocReceived') as bit) DocReceived
    FROM dbo.[Documents] d
    GO
    GRANT SELECT ON[dbo].[Catalog.Documents] TO jetti;
    GO
      
------------------------------ BEGIN Catalog.Account ------------------------------

      
      CREATE OR ALTER VIEW dbo.[Catalog.Account] AS
        
      SELECT
        d.id, d.type, d.date, d.code, d.description "Account", d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , d.[descriptionEng] [descriptionEng]
        , d.[isActive] [isActive]
        , d.[isPassive] [isPassive]
        , d.[isForex] [isForex]
      
        , ISNULL(l5.id, d.id) [Account.Level5.id]
        , ISNULL(l4.id, ISNULL(l5.id, d.id)) [Account.Level4.id]
        , ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))) [Account.Level3.id]
        , ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id)))) [Account.Level2.id]
        , ISNULL(l1.id, ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))))) [Account.Level1.id]
        , ISNULL(l5.description, d.description) [Account.Level5]
        , ISNULL(l4.description, ISNULL(l5.description, d.description)) [Account.Level4]
        , ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))) [Account.Level3]
        , ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description)))) [Account.Level2]
        , ISNULL(l1.description, ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))))) [Account.Level1]
      FROM [Catalog.Account.v] d WITH (NOEXPAND)
        LEFT JOIN [Catalog.Account.v] l5 WITH (NOEXPAND) ON (l5.id = d.parent)
        LEFT JOIN [Catalog.Account.v] l4 WITH (NOEXPAND) ON (l4.id = l5.parent)
        LEFT JOIN [Catalog.Account.v] l3 WITH (NOEXPAND) ON (l3.id = l4.parent)
        LEFT JOIN [Catalog.Account.v] l2 WITH (NOEXPAND) ON (l2.id = l3.parent)
        LEFT JOIN [Catalog.Account.v] l1 WITH (NOEXPAND) ON (l1.id = l2.parent)
      
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
    ;
GO
GRANT SELECT ON dbo.[Catalog.Account] TO jetti;
GO

      
------------------------------ END Catalog.Account ------------------------------

      
      
------------------------------ BEGIN Catalog.Advertising ------------------------------

      
      CREATE OR ALTER VIEW dbo.[Catalog.Advertising] AS
        
      SELECT
        d.id, d.type, d.date, d.code, d.description "Advertising", d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , d.[kind] [kind]
        , d.[shortDescription] [shortDescription]
        , d.[fullDescription] [fullDescription]
        , d.[isActive] [isActive]
        , d.[dateFrom] [dateFrom]
        , d.[dateTill] [dateTill]
        , d.[availableCron] [availableCron]
        , d.[slug] [slug]
      
        , ISNULL(l5.id, d.id) [Advertising.Level5.id]
        , ISNULL(l4.id, ISNULL(l5.id, d.id)) [Advertising.Level4.id]
        , ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))) [Advertising.Level3.id]
        , ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id)))) [Advertising.Level2.id]
        , ISNULL(l1.id, ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))))) [Advertising.Level1.id]
        , ISNULL(l5.description, d.description) [Advertising.Level5]
        , ISNULL(l4.description, ISNULL(l5.description, d.description)) [Advertising.Level4]
        , ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))) [Advertising.Level3]
        , ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description)))) [Advertising.Level2]
        , ISNULL(l1.description, ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))))) [Advertising.Level1]
      FROM [Catalog.Advertising.v] d WITH (NOEXPAND)
        LEFT JOIN [Catalog.Advertising.v] l5 WITH (NOEXPAND) ON (l5.id = d.parent)
        LEFT JOIN [Catalog.Advertising.v] l4 WITH (NOEXPAND) ON (l4.id = l5.parent)
        LEFT JOIN [Catalog.Advertising.v] l3 WITH (NOEXPAND) ON (l3.id = l4.parent)
        LEFT JOIN [Catalog.Advertising.v] l2 WITH (NOEXPAND) ON (l2.id = l3.parent)
        LEFT JOIN [Catalog.Advertising.v] l1 WITH (NOEXPAND) ON (l1.id = l2.parent)
      
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
    ;
GO
GRANT SELECT ON dbo.[Catalog.Advertising] TO jetti;
GO

      
------------------------------ END Catalog.Advertising ------------------------------

      
      
------------------------------ BEGIN Catalog.BusinessRegion ------------------------------

      
      CREATE OR ALTER VIEW dbo.[Catalog.BusinessRegion] AS
        
      SELECT
        d.id, d.type, d.date, d.code, d.description "BusinessRegion", d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , d.[Population] [Population]
        , d.[isDevelopmentRegion] [isDevelopmentRegion]
        , d.[isActive] [isActive]
        , ISNULL([Country.v].description, '') [Country.value], d.[Country] [Country.id], [Country.v].type [Country.type]
        , d.[Longitude] [Longitude]
        , d.[Latitude] [Latitude]
        , d.[Slug] [Slug]
        , d.[GeoCodeName] [GeoCodeName]
        , d.[DstOffset] [DstOffset]
        , d.[TimeOffset] [TimeOffset]
        , d.[TimeZoneId] [TimeZoneId]
        , ISNULL([PriceType.v].description, '') [PriceType.value], d.[PriceType] [PriceType.id], [PriceType.v].type [PriceType.type]
        , d.[GeocodeRadius] [GeocodeRadius]
      
        , ISNULL(l5.id, d.id) [BusinessRegion.Level5.id]
        , ISNULL(l4.id, ISNULL(l5.id, d.id)) [BusinessRegion.Level4.id]
        , ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))) [BusinessRegion.Level3.id]
        , ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id)))) [BusinessRegion.Level2.id]
        , ISNULL(l1.id, ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))))) [BusinessRegion.Level1.id]
        , ISNULL(l5.description, d.description) [BusinessRegion.Level5]
        , ISNULL(l4.description, ISNULL(l5.description, d.description)) [BusinessRegion.Level4]
        , ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))) [BusinessRegion.Level3]
        , ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description)))) [BusinessRegion.Level2]
        , ISNULL(l1.description, ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))))) [BusinessRegion.Level1]
      FROM [Catalog.BusinessRegion.v] d WITH (NOEXPAND)
        LEFT JOIN [Catalog.BusinessRegion.v] l5 WITH (NOEXPAND) ON (l5.id = d.parent)
        LEFT JOIN [Catalog.BusinessRegion.v] l4 WITH (NOEXPAND) ON (l4.id = l5.parent)
        LEFT JOIN [Catalog.BusinessRegion.v] l3 WITH (NOEXPAND) ON (l3.id = l4.parent)
        LEFT JOIN [Catalog.BusinessRegion.v] l2 WITH (NOEXPAND) ON (l2.id = l3.parent)
        LEFT JOIN [Catalog.BusinessRegion.v] l1 WITH (NOEXPAND) ON (l1.id = l2.parent)
      
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Country.v] [Country.v] WITH (NOEXPAND) ON [Country.v].id = d.[Country]
        LEFT JOIN dbo.[Catalog.PriceType.v] [PriceType.v] WITH (NOEXPAND) ON [PriceType.v].id = d.[PriceType]
    ;
GO
GRANT SELECT ON dbo.[Catalog.BusinessRegion] TO jetti;
GO

      
------------------------------ END Catalog.BusinessRegion ------------------------------

      
      
------------------------------ BEGIN Catalog.Counterpartie ------------------------------

      
      CREATE OR ALTER VIEW dbo.[Catalog.Counterpartie] AS
        
      SELECT
        d.id, d.type, d.date, d.code, d.description "Counterpartie", d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , d.[kind] [kind]
        , d.[FullName] [FullName]
        , ISNULL([Department.v].description, '') [Department.value], d.[Department] [Department.id], [Department.v].type [Department.type]
        , d.[Client] [Client]
        , d.[Supplier] [Supplier]
        , d.[isInternal] [isInternal]
        , d.[AddressShipping] [AddressShipping]
        , d.[AddressBilling] [AddressBilling]
        , d.[Phone] [Phone]
        , d.[Code1] [Code1]
        , d.[Code2] [Code2]
        , d.[Code3] [Code3]
        , d.[BC] [BC]
        , d.[GLN] [GLN]
        , ISNULL([Manager.v].description, '') [Manager.value], d.[Manager] [Manager.id], [Manager.v].type [Manager.type]
      
        , ISNULL(l5.id, d.id) [Counterpartie.Level5.id]
        , ISNULL(l4.id, ISNULL(l5.id, d.id)) [Counterpartie.Level4.id]
        , ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))) [Counterpartie.Level3.id]
        , ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id)))) [Counterpartie.Level2.id]
        , ISNULL(l1.id, ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))))) [Counterpartie.Level1.id]
        , ISNULL(l5.description, d.description) [Counterpartie.Level5]
        , ISNULL(l4.description, ISNULL(l5.description, d.description)) [Counterpartie.Level4]
        , ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))) [Counterpartie.Level3]
        , ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description)))) [Counterpartie.Level2]
        , ISNULL(l1.description, ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))))) [Counterpartie.Level1]
      FROM [Catalog.Counterpartie.v] d WITH (NOEXPAND)
        LEFT JOIN [Catalog.Counterpartie.v] l5 WITH (NOEXPAND) ON (l5.id = d.parent)
        LEFT JOIN [Catalog.Counterpartie.v] l4 WITH (NOEXPAND) ON (l4.id = l5.parent)
        LEFT JOIN [Catalog.Counterpartie.v] l3 WITH (NOEXPAND) ON (l3.id = l4.parent)
        LEFT JOIN [Catalog.Counterpartie.v] l2 WITH (NOEXPAND) ON (l2.id = l3.parent)
        LEFT JOIN [Catalog.Counterpartie.v] l1 WITH (NOEXPAND) ON (l1.id = l2.parent)
      
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Department.v] [Department.v] WITH (NOEXPAND) ON [Department.v].id = d.[Department]
        LEFT JOIN dbo.[Catalog.User.v] [Manager.v] WITH (NOEXPAND) ON [Manager.v].id = d.[Manager]
    ;
GO
GRANT SELECT ON dbo.[Catalog.Counterpartie] TO jetti;
GO

      
------------------------------ END Catalog.Counterpartie ------------------------------

      
      
------------------------------ BEGIN Catalog.JobTitle ------------------------------

      
      CREATE OR ALTER VIEW dbo.[Catalog.JobTitle] AS
        
      SELECT
        d.id, d.type, d.date, d.code, d.description "JobTitle", d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([Category.v].description, '') [Category.value], d.[Category] [Category.id], [Category.v].type [Category.type]
        , d.[TO] [TO]
        , d.[CO] [CO]
        , ISNULL([FunctionalStructure.v].description, '') [FunctionalStructure.value], d.[FunctionalStructure] [FunctionalStructure.id], [FunctionalStructure.v].type [FunctionalStructure.type]
      
        , ISNULL(l5.id, d.id) [JobTitle.Level5.id]
        , ISNULL(l4.id, ISNULL(l5.id, d.id)) [JobTitle.Level4.id]
        , ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))) [JobTitle.Level3.id]
        , ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id)))) [JobTitle.Level2.id]
        , ISNULL(l1.id, ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))))) [JobTitle.Level1.id]
        , ISNULL(l5.description, d.description) [JobTitle.Level5]
        , ISNULL(l4.description, ISNULL(l5.description, d.description)) [JobTitle.Level4]
        , ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))) [JobTitle.Level3]
        , ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description)))) [JobTitle.Level2]
        , ISNULL(l1.description, ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))))) [JobTitle.Level1]
      FROM [Catalog.JobTitle.v] d WITH (NOEXPAND)
        LEFT JOIN [Catalog.JobTitle.v] l5 WITH (NOEXPAND) ON (l5.id = d.parent)
        LEFT JOIN [Catalog.JobTitle.v] l4 WITH (NOEXPAND) ON (l4.id = l5.parent)
        LEFT JOIN [Catalog.JobTitle.v] l3 WITH (NOEXPAND) ON (l3.id = l4.parent)
        LEFT JOIN [Catalog.JobTitle.v] l2 WITH (NOEXPAND) ON (l2.id = l3.parent)
        LEFT JOIN [Catalog.JobTitle.v] l1 WITH (NOEXPAND) ON (l1.id = l2.parent)
      
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.JobTitle.Category.v] [Category.v] WITH (NOEXPAND) ON [Category.v].id = d.[Category]
        LEFT JOIN dbo.[Catalog.JobTitle.Functional.v] [FunctionalStructure.v] WITH (NOEXPAND) ON [FunctionalStructure.v].id = d.[FunctionalStructure]
    ;
GO
GRANT SELECT ON dbo.[Catalog.JobTitle] TO jetti;
GO

      
------------------------------ END Catalog.JobTitle ------------------------------

      
      
------------------------------ BEGIN Catalog.JobTitle.Functional ------------------------------

      
      CREATE OR ALTER VIEW dbo.[Catalog.JobTitle.Functional] AS
        
      SELECT
        d.id, d.type, d.date, d.code, d.description "JobTitleFunctional", d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([StaffingTableResponsible.v].description, '') [StaffingTableResponsible.value], d.[StaffingTableResponsible] [StaffingTableResponsible.id], [StaffingTableResponsible.v].type [StaffingTableResponsible.type]
      
        , ISNULL(l5.id, d.id) [JobTitleFunctional.Level5.id]
        , ISNULL(l4.id, ISNULL(l5.id, d.id)) [JobTitleFunctional.Level4.id]
        , ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))) [JobTitleFunctional.Level3.id]
        , ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id)))) [JobTitleFunctional.Level2.id]
        , ISNULL(l1.id, ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))))) [JobTitleFunctional.Level1.id]
        , ISNULL(l5.description, d.description) [JobTitleFunctional.Level5]
        , ISNULL(l4.description, ISNULL(l5.description, d.description)) [JobTitleFunctional.Level4]
        , ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))) [JobTitleFunctional.Level3]
        , ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description)))) [JobTitleFunctional.Level2]
        , ISNULL(l1.description, ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))))) [JobTitleFunctional.Level1]
      FROM [Catalog.JobTitle.Functional.v] d WITH (NOEXPAND)
        LEFT JOIN [Catalog.JobTitle.Functional.v] l5 WITH (NOEXPAND) ON (l5.id = d.parent)
        LEFT JOIN [Catalog.JobTitle.Functional.v] l4 WITH (NOEXPAND) ON (l4.id = l5.parent)
        LEFT JOIN [Catalog.JobTitle.Functional.v] l3 WITH (NOEXPAND) ON (l3.id = l4.parent)
        LEFT JOIN [Catalog.JobTitle.Functional.v] l2 WITH (NOEXPAND) ON (l2.id = l3.parent)
        LEFT JOIN [Catalog.JobTitle.Functional.v] l1 WITH (NOEXPAND) ON (l1.id = l2.parent)
      
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.StaffingTable.v] [StaffingTableResponsible.v] WITH (NOEXPAND) ON [StaffingTableResponsible.v].id = d.[StaffingTableResponsible]
    ;
GO
GRANT SELECT ON dbo.[Catalog.JobTitle.Functional] TO jetti;
GO

      
------------------------------ END Catalog.JobTitle.Functional ------------------------------

      
      
------------------------------ BEGIN Catalog.OrderSource ------------------------------

      
      CREATE OR ALTER VIEW dbo.[Catalog.OrderSource] AS
        
      SELECT
        d.id, d.type, d.date, d.code, d.description "OrderSource", d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , d.[Kind] [Kind]
        , d.[SourceType] [SourceType]
        , ISNULL([Country.v].description, '') [Country.value], d.[Country] [Country.id], [Country.v].type [Country.type]
      
        , ISNULL(l5.id, d.id) [OrderSource.Level5.id]
        , ISNULL(l4.id, ISNULL(l5.id, d.id)) [OrderSource.Level4.id]
        , ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))) [OrderSource.Level3.id]
        , ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id)))) [OrderSource.Level2.id]
        , ISNULL(l1.id, ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))))) [OrderSource.Level1.id]
        , ISNULL(l5.description, d.description) [OrderSource.Level5]
        , ISNULL(l4.description, ISNULL(l5.description, d.description)) [OrderSource.Level4]
        , ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))) [OrderSource.Level3]
        , ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description)))) [OrderSource.Level2]
        , ISNULL(l1.description, ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))))) [OrderSource.Level1]
      FROM [Catalog.OrderSource.v] d WITH (NOEXPAND)
        LEFT JOIN [Catalog.OrderSource.v] l5 WITH (NOEXPAND) ON (l5.id = d.parent)
        LEFT JOIN [Catalog.OrderSource.v] l4 WITH (NOEXPAND) ON (l4.id = l5.parent)
        LEFT JOIN [Catalog.OrderSource.v] l3 WITH (NOEXPAND) ON (l3.id = l4.parent)
        LEFT JOIN [Catalog.OrderSource.v] l2 WITH (NOEXPAND) ON (l2.id = l3.parent)
        LEFT JOIN [Catalog.OrderSource.v] l1 WITH (NOEXPAND) ON (l1.id = l2.parent)
      
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Country.v] [Country.v] WITH (NOEXPAND) ON [Country.v].id = d.[Country]
    ;
GO
GRANT SELECT ON dbo.[Catalog.OrderSource] TO jetti;
GO

      
------------------------------ END Catalog.OrderSource ------------------------------

      
      
------------------------------ BEGIN Catalog.RetailNetwork ------------------------------

      
      CREATE OR ALTER VIEW dbo.[Catalog.RetailNetwork] AS
        
      SELECT
        d.id, d.type, d.date, d.code, d.description "RetailNetwork", d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([Brand.v].description, '') [Brand.value], d.[Brand] [Brand.id], [Brand.v].type [Brand.type]
        , ISNULL([Country.v].description, '') [Country.value], d.[Country] [Country.id], [Country.v].type [Country.type]
        , ISNULL([BusinessRegion.v].description, '') [BusinessRegion.value], d.[BusinessRegion] [BusinessRegion.id], [BusinessRegion.v].type [BusinessRegion.type]
        , ISNULL([Currency.v].description, '') [Currency.value], d.[Currency] [Currency.id], [Currency.v].type [Currency.type]
        , d.[BonusPercent] [BonusPercent]
        , d.[smsGateway] [smsGateway]
        , d.[keyVaultURL] [keyVaultURL]
      
        , ISNULL(l5.id, d.id) [RetailNetwork.Level5.id]
        , ISNULL(l4.id, ISNULL(l5.id, d.id)) [RetailNetwork.Level4.id]
        , ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))) [RetailNetwork.Level3.id]
        , ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id)))) [RetailNetwork.Level2.id]
        , ISNULL(l1.id, ISNULL(l2.id, ISNULL(l3.id, ISNULL(l4.id, ISNULL(l5.id, d.id))))) [RetailNetwork.Level1.id]
        , ISNULL(l5.description, d.description) [RetailNetwork.Level5]
        , ISNULL(l4.description, ISNULL(l5.description, d.description)) [RetailNetwork.Level4]
        , ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))) [RetailNetwork.Level3]
        , ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description)))) [RetailNetwork.Level2]
        , ISNULL(l1.description, ISNULL(l2.description, ISNULL(l3.description, ISNULL(l4.description, ISNULL(l5.description, d.description))))) [RetailNetwork.Level1]
      FROM [Catalog.RetailNetwork.v] d WITH (NOEXPAND)
        LEFT JOIN [Catalog.RetailNetwork.v] l5 WITH (NOEXPAND) ON (l5.id = d.parent)
        LEFT JOIN [Catalog.RetailNetwork.v] l4 WITH (NOEXPAND) ON (l4.id = l5.parent)
        LEFT JOIN [Catalog.RetailNetwork.v] l3 WITH (NOEXPAND) ON (l3.id = l4.parent)
        LEFT JOIN [Catalog.RetailNetwork.v] l2 WITH (NOEXPAND) ON (l2.id = l3.parent)
        LEFT JOIN [Catalog.RetailNetwork.v] l1 WITH (NOEXPAND) ON (l1.id = l2.parent)
      
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Brand.v] [Brand.v] WITH (NOEXPAND) ON [Brand.v].id = d.[Brand]
        LEFT JOIN dbo.[Catalog.Country.v] [Country.v] WITH (NOEXPAND) ON [Country.v].id = d.[Country]
        LEFT JOIN dbo.[Catalog.BusinessRegion.v] [BusinessRegion.v] WITH (NOEXPAND) ON [BusinessRegion.v].id = d.[BusinessRegion]
        LEFT JOIN dbo.[Catalog.Currency.v] [Currency.v] WITH (NOEXPAND) ON [Currency.v].id = d.[Currency]
    ;
GO
GRANT SELECT ON dbo.[Catalog.RetailNetwork] TO jetti;
GO

      
------------------------------ END Catalog.RetailNetwork ------------------------------

      