
------------------------------ BEGIN Operation.AdditionalParametersDepartment ------------------------------

      CREATE OR ALTER VIEW dbo.[Operation.AdditionalParametersDepartment] AS
      
      SELECT
        d.id, d.type, d.date, d.code, d.description "AdditionalParametersDepartment",  d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([Group.v].description, '') [Group.value], d.[Group] [Group.id], [Group.v].type [Group.type]
        , ISNULL([Operation.v].description, '') [Operation.value], d.[Operation] [Operation.id], [Operation.v].type [Operation.type]
        , d.[Amount] [Amount]
        , ISNULL([currency.v].description, '') [currency.value], d.[currency] [currency.id], [currency.v].type [currency.type]
        , ISNULL([Department.v].description, '') [Department.value], d.[Department] [Department.id], [Department.v].type [Department.type]
        , d.[FrontType] [FrontType]
        , ISNULL([MainStoreHouse.v].description, '') [MainStoreHouse.value], d.[MainStoreHouse] [MainStoreHouse.id], [MainStoreHouse.v].type [MainStoreHouse.type]
        , d.[TimeOpen] [TimeOpen]
        , d.[TimeClose] [TimeClose]
        , d.[MaxTotalOrder] [MaxTotalOrder]
        , d.[DeliveryTimeOpen] [DeliveryTimeOpen]
        , d.[DeliveryTimeClose] [DeliveryTimeClose]
        , d.[isDeliveringService] [isDeliveringService]
        , d.[PickupTimeOpen] [PickupTimeOpen]
        , d.[PickupTimeClose] [PickupTimeClose]
        , d.[isPickupService] [isPickupService]
        , d.[isComentRequired] [isComentRequired]
        , d.[isOnlinePayAccepted] [isOnlinePayAccepted]
        , d.[isCoordinatesCheck] [isCoordinatesCheck]
        , d.[isSailPlayPromocodeCheck] [isSailPlayPromocodeCheck]
        , d.[isSailPlayBonusCheck] [isSailPlayBonusCheck]
        , d.[wifiSSID] [wifiSSID]
        , d.[timeZoneOffset] [timeZoneOffset]
        , d.[addressCheck] [addressCheck]
        , d.[organisationCheck] [organisationCheck]
      FROM [Operation.AdditionalParametersDepartment.v] d WITH (NOEXPAND)
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Operation.Group.v] [Group.v] WITH (NOEXPAND) ON [Group.v].id = d.[Group]
        LEFT JOIN dbo.[Catalog.Operation.v] [Operation.v] WITH (NOEXPAND) ON [Operation.v].id = d.[Operation]
        LEFT JOIN dbo.[Catalog.Currency.v] [currency.v] WITH (NOEXPAND) ON [currency.v].id = d.[currency]
        LEFT JOIN dbo.[Catalog.Department.v] [Department.v] WITH (NOEXPAND) ON [Department.v].id = d.[Department]
        LEFT JOIN dbo.[Catalog.Storehouse.v] [MainStoreHouse.v] WITH (NOEXPAND) ON [MainStoreHouse.v].id = d.[MainStoreHouse]
    ; 
GO
GRANT SELECT ON dbo.[Operation.AdditionalParametersDepartment] TO jetti;
GO

      
------------------------------ END Operation.AdditionalParametersDepartment ------------------------------

------------------------------ BEGIN Operation.AutoAdditionSettings ------------------------------

      CREATE OR ALTER VIEW dbo.[Operation.AutoAdditionSettings] AS
      
      SELECT
        d.id, d.type, d.date, d.code, d.description "AutoAdditionSettings",  d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([Group.v].description, '') [Group.value], d.[Group] [Group.id], [Group.v].type [Group.type]
        , ISNULL([Operation.v].description, '') [Operation.value], d.[Operation] [Operation.id], [Operation.v].type [Operation.type]
        , d.[Amount] [Amount]
        , ISNULL([currency.v].description, '') [currency.value], d.[currency] [currency.id], [currency.v].type [currency.type]
        , ISNULL([RetailNetwork.v].description, '') [RetailNetwork.value], d.[RetailNetwork] [RetailNetwork.id], [RetailNetwork.v].type [RetailNetwork.type]
        , d.[AdditionalType] [AdditionalType]
        , ISNULL([MainSKU.v].description, '') [MainSKU.value], d.[MainSKU] [MainSKU.id], [MainSKU.v].type [MainSKU.type]
        , d.[Qty] [Qty]
      FROM [Operation.AutoAdditionSettings.v] d WITH (NOEXPAND)
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Operation.Group.v] [Group.v] WITH (NOEXPAND) ON [Group.v].id = d.[Group]
        LEFT JOIN dbo.[Catalog.Operation.v] [Operation.v] WITH (NOEXPAND) ON [Operation.v].id = d.[Operation]
        LEFT JOIN dbo.[Catalog.Currency.v] [currency.v] WITH (NOEXPAND) ON [currency.v].id = d.[currency]
        LEFT JOIN dbo.[Catalog.RetailNetwork.v] [RetailNetwork.v] WITH (NOEXPAND) ON [RetailNetwork.v].id = d.[RetailNetwork]
        LEFT JOIN dbo.[Catalog.Product.v] [MainSKU.v] WITH (NOEXPAND) ON [MainSKU.v].id = d.[MainSKU]
    ; 
GO
GRANT SELECT ON dbo.[Operation.AutoAdditionSettings] TO jetti;
GO

      
------------------------------ END Operation.AutoAdditionSettings ------------------------------

------------------------------ BEGIN Operation.CashShifts ------------------------------

      CREATE OR ALTER VIEW dbo.[Operation.CashShifts] AS
      
      SELECT
        d.id, d.type, d.date, d.code, d.description "CashShifts",  d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([Group.v].description, '') [Group.value], d.[Group] [Group.id], [Group.v].type [Group.type]
        , ISNULL([Operation.v].description, '') [Operation.value], d.[Operation] [Operation.id], [Operation.v].type [Operation.type]
        , d.[Amount] [Amount]
        , ISNULL([currency.v].description, '') [currency.value], d.[currency] [currency.id], [currency.v].type [currency.type]
        , ISNULL([Department.v].description, '') [Department.value], d.[Department] [Department.id], [Department.v].type [Department.type]
        , ISNULL([UserId.v].description, '') [UserId.value], d.[UserId] [UserId.id], [UserId.v].type [UserId.type]
        , d.[CashShiftNumber] [CashShiftNumber]
        , d.[AccountingDate] [AccountingDate]
        , d.[StartDate] [StartDate]
        , d.[EndDate] [EndDate]
        , d.[ChecksLoaded] [ChecksLoaded]
        , d.[ProductionCalculated] [ProductionCalculated]
        , d.[startBalance] [startBalance]
        , d.[endBalance] [endBalance]
      FROM [Operation.CashShifts.v] d WITH (NOEXPAND)
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Operation.Group.v] [Group.v] WITH (NOEXPAND) ON [Group.v].id = d.[Group]
        LEFT JOIN dbo.[Catalog.Operation.v] [Operation.v] WITH (NOEXPAND) ON [Operation.v].id = d.[Operation]
        LEFT JOIN dbo.[Catalog.Currency.v] [currency.v] WITH (NOEXPAND) ON [currency.v].id = d.[currency]
        LEFT JOIN dbo.[Catalog.Department.v] [Department.v] WITH (NOEXPAND) ON [Department.v].id = d.[Department]
        LEFT JOIN dbo.[Catalog.Person.v] [UserId.v] WITH (NOEXPAND) ON [UserId.v].id = d.[UserId]
    ; 
GO
GRANT SELECT ON dbo.[Operation.CashShifts] TO jetti;
GO

      
------------------------------ END Operation.CashShifts ------------------------------

------------------------------ BEGIN Operation.CHECK_JETTI_FRONT ------------------------------

      CREATE OR ALTER VIEW dbo.[Operation.CHECK_JETTI_FRONT] AS
      
      SELECT
        d.id, d.type, d.date, d.code, d.description "CHECK_JETTI_FRONT",  d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([Group.v].description, '') [Group.value], d.[Group] [Group.id], [Group.v].type [Group.type]
        , ISNULL([Operation.v].description, '') [Operation.value], d.[Operation] [Operation.id], [Operation.v].type [Operation.type]
        , d.[Amount] [Amount]
        , ISNULL([currency.v].description, '') [currency.value], d.[currency] [currency.id], [currency.v].type [currency.type]
        , ISNULL([Department.v].description, '') [Department.value], d.[Department] [Department.id], [Department.v].type [Department.type]
        , ISNULL([Customer.v].description, '') [Customer.value], d.[Customer] [Customer.id], [Customer.v].type [Customer.type]
        , ISNULL([Manager.v].description, '') [Manager.value], d.[Manager] [Manager.id], [Manager.v].type [Manager.type]
        , ISNULL([Storehouse.v].description, '') [Storehouse.value], d.[Storehouse] [Storehouse.id], [Storehouse.v].type [Storehouse.type]
        , d.[DiscountDoc] [DiscountDoc]
        , d.[NumCashShift] [NumCashShift]
        , d.[TypeDocument] [TypeDocument]
        , d.[PrintTime] [PrintTime]
        , d.[counterpartyId] [counterpartyId]
        , d.[orderId] [orderId]
      FROM [Operation.CHECK_JETTI_FRONT.v] d WITH (NOEXPAND)
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Operation.Group.v] [Group.v] WITH (NOEXPAND) ON [Group.v].id = d.[Group]
        LEFT JOIN dbo.[Catalog.Operation.v] [Operation.v] WITH (NOEXPAND) ON [Operation.v].id = d.[Operation]
        LEFT JOIN dbo.[Catalog.Currency.v] [currency.v] WITH (NOEXPAND) ON [currency.v].id = d.[currency]
        LEFT JOIN dbo.[Catalog.Department.v] [Department.v] WITH (NOEXPAND) ON [Department.v].id = d.[Department]
        LEFT JOIN dbo.[Catalog.Counterpartie.v] [Customer.v] WITH (NOEXPAND) ON [Customer.v].id = d.[Customer]
        LEFT JOIN dbo.[Catalog.Person.v] [Manager.v] WITH (NOEXPAND) ON [Manager.v].id = d.[Manager]
        LEFT JOIN dbo.[Catalog.Storehouse.v] [Storehouse.v] WITH (NOEXPAND) ON [Storehouse.v].id = d.[Storehouse]
    ; 
GO
GRANT SELECT ON dbo.[Operation.CHECK_JETTI_FRONT] TO jetti;
GO

      
------------------------------ END Operation.CHECK_JETTI_FRONT ------------------------------

------------------------------ BEGIN Operation.DeliveryAreas ------------------------------

      CREATE OR ALTER VIEW dbo.[Operation.DeliveryAreas] AS
      
      SELECT
        d.id, d.type, d.date, d.code, d.description "DeliveryAreas",  d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([Group.v].description, '') [Group.value], d.[Group] [Group.id], [Group.v].type [Group.type]
        , ISNULL([Operation.v].description, '') [Operation.value], d.[Operation] [Operation.id], [Operation.v].type [Operation.type]
        , d.[Amount] [Amount]
        , ISNULL([currency.v].description, '') [currency.value], d.[currency] [currency.id], [currency.v].type [currency.type]
        , ISNULL([RetailNetwork.v].description, '') [RetailNetwork.value], d.[RetailNetwork] [RetailNetwork.id], [RetailNetwork.v].type [RetailNetwork.type]
        , d.[MapUrl] [MapUrl]
        , d.[LoadFolder] [LoadFolder]
      FROM [Operation.DeliveryAreas.v] d WITH (NOEXPAND)
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Operation.Group.v] [Group.v] WITH (NOEXPAND) ON [Group.v].id = d.[Group]
        LEFT JOIN dbo.[Catalog.Operation.v] [Operation.v] WITH (NOEXPAND) ON [Operation.v].id = d.[Operation]
        LEFT JOIN dbo.[Catalog.Currency.v] [currency.v] WITH (NOEXPAND) ON [currency.v].id = d.[currency]
        LEFT JOIN dbo.[Catalog.RetailNetwork.v] [RetailNetwork.v] WITH (NOEXPAND) ON [RetailNetwork.v].id = d.[RetailNetwork]
    ; 
GO
GRANT SELECT ON dbo.[Operation.DeliveryAreas] TO jetti;
GO

      
------------------------------ END Operation.DeliveryAreas ------------------------------

------------------------------ BEGIN Operation.LOT_Sales ------------------------------

      CREATE OR ALTER VIEW dbo.[Operation.LOT_Sales] AS
      
      SELECT
        d.id, d.type, d.date, d.code, d.description "LOT_Sales",  d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([Group.v].description, '') [Group.value], d.[Group] [Group.id], [Group.v].type [Group.type]
        , ISNULL([Operation.v].description, '') [Operation.value], d.[Operation] [Operation.id], [Operation.v].type [Operation.type]
        , d.[Amount] [Amount]
        , ISNULL([currency.v].description, '') [currency.value], d.[currency] [currency.id], [currency.v].type [currency.type]
        , ISNULL([Customer.v].description, '') [Customer.value], d.[Customer] [Customer.id], [Customer.v].type [Customer.type]
        , ISNULL([Department.v].description, '') [Department.value], d.[Department] [Department.id], [Department.v].type [Department.type]
        , ISNULL([CompanySeller.v].description, '') [CompanySeller.value], d.[CompanySeller] [CompanySeller.id], [CompanySeller.v].type [CompanySeller.type]
        , ISNULL([Department_CompanySeller.v].description, '') [Department_CompanySeller.value], d.[Department_CompanySeller] [Department_CompanySeller.id], [Department_CompanySeller.v].type [Department_CompanySeller.type]
        , ISNULL([Loan_Customer.v].description, '') [Loan_Customer.value], d.[Loan_Customer] [Loan_Customer.id], [Loan_Customer.v].type [Loan_Customer.type]
        , d.[Transaction_Id] [Transaction_Id]
        , d.[Alias] [Alias]
        , d.[Title] [Title]
        , ISNULL([Income_CompanySeller.v].description, '') [Income_CompanySeller.value], d.[Income_CompanySeller] [Income_CompanySeller.id], [Income_CompanySeller.v].type [Income_CompanySeller.type]
        , ISNULL([Expense_CompanySeller.v].description, '') [Expense_CompanySeller.value], d.[Expense_CompanySeller] [Expense_CompanySeller.id], [Expense_CompanySeller.v].type [Expense_CompanySeller.type]
        , ISNULL([Income.v].description, '') [Income.value], d.[Income] [Income.id], [Income.v].type [Income.type]
        , d.[DocReceived] [DocReceived]
      FROM [Operation.LOT_Sales.v] d WITH (NOEXPAND)
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Operation.Group.v] [Group.v] WITH (NOEXPAND) ON [Group.v].id = d.[Group]
        LEFT JOIN dbo.[Catalog.Operation.v] [Operation.v] WITH (NOEXPAND) ON [Operation.v].id = d.[Operation]
        LEFT JOIN dbo.[Catalog.Currency.v] [currency.v] WITH (NOEXPAND) ON [currency.v].id = d.[currency]
        LEFT JOIN dbo.[Catalog.Person.v] [Customer.v] WITH (NOEXPAND) ON [Customer.v].id = d.[Customer]
        LEFT JOIN dbo.[Catalog.Department.v] [Department.v] WITH (NOEXPAND) ON [Department.v].id = d.[Department]
        LEFT JOIN dbo.[Catalog.Company.v] [CompanySeller.v] WITH (NOEXPAND) ON [CompanySeller.v].id = d.[CompanySeller]
        LEFT JOIN dbo.[Catalog.Department.v] [Department_CompanySeller.v] WITH (NOEXPAND) ON [Department_CompanySeller.v].id = d.[Department_CompanySeller]
        LEFT JOIN dbo.[Catalog.Loan.v] [Loan_Customer.v] WITH (NOEXPAND) ON [Loan_Customer.v].id = d.[Loan_Customer]
        LEFT JOIN dbo.[Catalog.Income.v] [Income_CompanySeller.v] WITH (NOEXPAND) ON [Income_CompanySeller.v].id = d.[Income_CompanySeller]
        LEFT JOIN dbo.[Catalog.Expense.v] [Expense_CompanySeller.v] WITH (NOEXPAND) ON [Expense_CompanySeller.v].id = d.[Expense_CompanySeller]
        LEFT JOIN dbo.[Catalog.Income.v] [Income.v] WITH (NOEXPAND) ON [Income.v].id = d.[Income]
    ; 
GO
GRANT SELECT ON dbo.[Operation.LOT_Sales] TO jetti;
GO

      
------------------------------ END Operation.LOT_Sales ------------------------------

------------------------------ BEGIN Operation.LotModelsVsDepartment ------------------------------

      CREATE OR ALTER VIEW dbo.[Operation.LotModelsVsDepartment] AS
      
      SELECT
        d.id, d.type, d.date, d.code, d.description "LotModelsVsDepartment",  d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([Group.v].description, '') [Group.value], d.[Group] [Group.id], [Group.v].type [Group.type]
        , ISNULL([Operation.v].description, '') [Operation.value], d.[Operation] [Operation.id], [Operation.v].type [Operation.type]
        , d.[Amount] [Amount]
        , ISNULL([currency.v].description, '') [currency.value], d.[currency] [currency.id], [currency.v].type [currency.type]
        , d.[Lot] [Lot]
        , d.[isProfitability] [isProfitability]
        , d.[Lot_BonusManager] [Lot_BonusManager]
        , d.[Lot_CommisionAllUnic] [Lot_CommisionAllUnic]
        , d.[Lot_ShareDistribution] [Lot_ShareDistribution]
        , d.[Lot_ShareInvestor] [Lot_ShareInvestor]
      FROM [Operation.LotModelsVsDepartment.v] d WITH (NOEXPAND)
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Operation.Group.v] [Group.v] WITH (NOEXPAND) ON [Group.v].id = d.[Group]
        LEFT JOIN dbo.[Catalog.Operation.v] [Operation.v] WITH (NOEXPAND) ON [Operation.v].id = d.[Operation]
        LEFT JOIN dbo.[Catalog.Currency.v] [currency.v] WITH (NOEXPAND) ON [currency.v].id = d.[currency]
    ; 
GO
GRANT SELECT ON dbo.[Operation.LotModelsVsDepartment] TO jetti;
GO

      
------------------------------ END Operation.LotModelsVsDepartment ------------------------------

------------------------------ BEGIN Operation.OnlineSalesManagementSettings ------------------------------

      CREATE OR ALTER VIEW dbo.[Operation.OnlineSalesManagementSettings] AS
      
      SELECT
        d.id, d.type, d.date, d.code, d.description "OnlineSalesManagementSettings",  d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([Group.v].description, '') [Group.value], d.[Group] [Group.id], [Group.v].type [Group.type]
        , ISNULL([Operation.v].description, '') [Operation.value], d.[Operation] [Operation.id], [Operation.v].type [Operation.type]
        , d.[Amount] [Amount]
        , ISNULL([currency.v].description, '') [currency.value], d.[currency] [currency.id], [currency.v].type [currency.type]
        , ISNULL([BusinessRegion.v].description, '') [BusinessRegion.value], d.[BusinessRegion] [BusinessRegion.id], [BusinessRegion.v].type [BusinessRegion.type]
        , ISNULL([RetailNetwork.v].description, '') [RetailNetwork.value], d.[RetailNetwork] [RetailNetwork.id], [RetailNetwork.v].type [RetailNetwork.type]
        , d.[DateBegin] [DateBegin]
        , d.[DateEnd] [DateEnd]
        , d.[TypeShowcase] [TypeShowcase]
      FROM [Operation.OnlineSalesManagementSettings.v] d WITH (NOEXPAND)
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Operation.Group.v] [Group.v] WITH (NOEXPAND) ON [Group.v].id = d.[Group]
        LEFT JOIN dbo.[Catalog.Operation.v] [Operation.v] WITH (NOEXPAND) ON [Operation.v].id = d.[Operation]
        LEFT JOIN dbo.[Catalog.Currency.v] [currency.v] WITH (NOEXPAND) ON [currency.v].id = d.[currency]
        LEFT JOIN dbo.[Catalog.BusinessRegion.v] [BusinessRegion.v] WITH (NOEXPAND) ON [BusinessRegion.v].id = d.[BusinessRegion]
        LEFT JOIN dbo.[Catalog.RetailNetwork.v] [RetailNetwork.v] WITH (NOEXPAND) ON [RetailNetwork.v].id = d.[RetailNetwork]
    ; 
GO
GRANT SELECT ON dbo.[Operation.OnlineSalesManagementSettings] TO jetti;
GO

      
------------------------------ END Operation.OnlineSalesManagementSettings ------------------------------

------------------------------ BEGIN Operation.OnlineSalesManagementSettings ------------------------------

      CREATE OR ALTER VIEW dbo.[Operation.OnlineSalesManagementSettings] AS
      
      SELECT
        d.id, d.type, d.date, d.code, d.description "OnlineSalesManagementSettings",  d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([Group.v].description, '') [Group.value], d.[Group] [Group.id], [Group.v].type [Group.type]
        , ISNULL([Operation.v].description, '') [Operation.value], d.[Operation] [Operation.id], [Operation.v].type [Operation.type]
        , d.[Amount] [Amount]
        , ISNULL([currency.v].description, '') [currency.value], d.[currency] [currency.id], [currency.v].type [currency.type]
        , ISNULL([BusinessRegion.v].description, '') [BusinessRegion.value], d.[BusinessRegion] [BusinessRegion.id], [BusinessRegion.v].type [BusinessRegion.type]
        , ISNULL([RetailNetwork.v].description, '') [RetailNetwork.value], d.[RetailNetwork] [RetailNetwork.id], [RetailNetwork.v].type [RetailNetwork.type]
        , d.[DateBegin] [DateBegin]
        , d.[DateEnd] [DateEnd]
        , d.[TypeShowcase] [TypeShowcase]
      FROM [Operation.OnlineSalesManagementSettings.v] d WITH (NOEXPAND)
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Operation.Group.v] [Group.v] WITH (NOEXPAND) ON [Group.v].id = d.[Group]
        LEFT JOIN dbo.[Catalog.Operation.v] [Operation.v] WITH (NOEXPAND) ON [Operation.v].id = d.[Operation]
        LEFT JOIN dbo.[Catalog.Currency.v] [currency.v] WITH (NOEXPAND) ON [currency.v].id = d.[currency]
        LEFT JOIN dbo.[Catalog.BusinessRegion.v] [BusinessRegion.v] WITH (NOEXPAND) ON [BusinessRegion.v].id = d.[BusinessRegion]
        LEFT JOIN dbo.[Catalog.RetailNetwork.v] [RetailNetwork.v] WITH (NOEXPAND) ON [RetailNetwork.v].id = d.[RetailNetwork]
    ; 
GO
GRANT SELECT ON dbo.[Operation.OnlineSalesManagementSettings] TO jetti;
GO

      
------------------------------ END Operation.OnlineSalesManagementSettings ------------------------------

------------------------------ BEGIN Operation.Status_Opening_Registry ------------------------------

      CREATE OR ALTER VIEW dbo.[Operation.Status_Opening_Registry] AS
      
      SELECT
        d.id, d.type, d.date, d.code, d.description "Status_Opening_Registry",  d.posted, d.deleted, d.isfolder, d.timestamp, d.version
        , ISNULL("parent".description, '') "parent.value", d."parent" "parent.id", "parent".type "parent.type"
        , ISNULL("company".description, '') "company.value", d."company" "company.id", "company".type "company.type"
        , ISNULL("user".description, '') "user.value", d."user" "user.id", "user".type "user.type"
        , ISNULL([workflow.v].description, '') [workflow.value], d.[workflow] [workflow.id], [workflow.v].type [workflow.type]
        , ISNULL([Group.v].description, '') [Group.value], d.[Group] [Group.id], [Group.v].type [Group.type]
        , ISNULL([Operation.v].description, '') [Operation.value], d.[Operation] [Operation.id], [Operation.v].type [Operation.type]
        , d.[Amount] [Amount]
        , ISNULL([currency.v].description, '') [currency.value], d.[currency] [currency.id], [currency.v].type [currency.type]
        , ISNULL([ResponsibilityCenter.v].description, '') [ResponsibilityCenter.value], d.[ResponsibilityCenter] [ResponsibilityCenter.id], [ResponsibilityCenter.v].type [ResponsibilityCenter.type]
        , ISNULL([Department.v].description, '') [Department.value], d.[Department] [Department.id], [Department.v].type [Department.type]
        , d.[ValueString] [ValueString]
        , ISNULL([BusinessRegion.v].description, '') [BusinessRegion.value], d.[BusinessRegion] [BusinessRegion.id], [BusinessRegion.v].type [BusinessRegion.type]
        , ISNULL([Brand.v].description, '') [Brand.value], d.[Brand] [Brand.id], [Brand.v].type [Brand.type]
        , d.[OpeningDatePlanned] [OpeningDatePlanned]
      FROM [Operation.Status_Opening_Registry.v] d WITH (NOEXPAND)
        LEFT JOIN dbo.[Documents] [parent] ON [parent].id = d.[parent]
        LEFT JOIN dbo.[Catalog.User.v] [user] WITH (NOEXPAND) ON [user].id = d.[user]
        LEFT JOIN dbo.[Catalog.Company.v] [company] WITH (NOEXPAND) ON [company].id = d.company
        LEFT JOIN dbo.[Document.WorkFlow.v] [workflow.v] WITH (NOEXPAND) ON [workflow.v].id = d.[workflow]
        LEFT JOIN dbo.[Catalog.Operation.Group.v] [Group.v] WITH (NOEXPAND) ON [Group.v].id = d.[Group]
        LEFT JOIN dbo.[Catalog.Operation.v] [Operation.v] WITH (NOEXPAND) ON [Operation.v].id = d.[Operation]
        LEFT JOIN dbo.[Catalog.Currency.v] [currency.v] WITH (NOEXPAND) ON [currency.v].id = d.[currency]
        LEFT JOIN dbo.[Catalog.ResponsibilityCenter.v] [ResponsibilityCenter.v] WITH (NOEXPAND) ON [ResponsibilityCenter.v].id = d.[ResponsibilityCenter]
        LEFT JOIN dbo.[Catalog.Department.v] [Department.v] WITH (NOEXPAND) ON [Department.v].id = d.[Department]
        LEFT JOIN dbo.[Catalog.BusinessRegion.v] [BusinessRegion.v] WITH (NOEXPAND) ON [BusinessRegion.v].id = d.[BusinessRegion]
        LEFT JOIN dbo.[Catalog.Brand.v] [Brand.v] WITH (NOEXPAND) ON [Brand.v].id = d.[Brand]
    ; 
GO
GRANT SELECT ON dbo.[Operation.Status_Opening_Registry] TO jetti;
GO

      
------------------------------ END Operation.Status_Opening_Registry ------------------------------
