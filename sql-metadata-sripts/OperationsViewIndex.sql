
------------------------------ BEGIN Operation.AdditionalParametersDepartment ------------------------------

      RAISERROR('Operation.AdditionalParametersDepartment start', 0 ,1) WITH NOWAIT;
      
      BEGIN TRY
        ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Operation.AdditionalParametersDepartment.v];
      END TRY
      BEGIN CATCH
      END CATCH
GO
CREATE OR ALTER VIEW dbo.[Operation.AdditionalParametersDepartment.v] WITH SCHEMABINDING AS 
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Group"')) [Group]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Operation"')) [Operation]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Amount"')), 0) [Amount]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Department"')) [Department]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."FrontType"')), '') [FrontType]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."MainStoreHouse"')) [MainStoreHouse]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."TimeOpen"')), '') [TimeOpen]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."TimeClose"')), '') [TimeClose]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."MaxTotalOrder"')), 0) [MaxTotalOrder]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."DeliveryTimeOpen"')), '') [DeliveryTimeOpen]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."DeliveryTimeClose"')), '') [DeliveryTimeClose]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isDeliveringService"')), 0) [isDeliveringService]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."PickupTimeOpen"')), '') [PickupTimeOpen]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."PickupTimeClose"')), '') [PickupTimeClose]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isPickupService"')), 0) [isPickupService]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isComentRequired"')), 0) [isComentRequired]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isOnlinePayAccepted"')), 0) [isOnlinePayAccepted]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isCoordinatesCheck"')), 0) [isCoordinatesCheck]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isSailPlayPromocodeCheck"')), 0) [isSailPlayPromocodeCheck]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isSailPlayBonusCheck"')), 0) [isSailPlayBonusCheck]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."wifiSSID"')), '') [wifiSSID]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."timeZoneOffset"')), '') [timeZoneOffset]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."addressCheck"')), '') [addressCheck]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."organisationCheck"')), '') [organisationCheck]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."defaultCoockingTime"')), 0) [defaultCoockingTime]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."defaultDeliveryTime"')), 0) [defaultDeliveryTime]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."iikoTerminalId"')), '') [iikoTerminalId]
      FROM dbo.[Documents]
      WHERE [operation] = 'CE62E430-3004-11E8-A0FF-732D589B1ACA'
; 
GO
CREATE UNIQUE CLUSTERED INDEX [Operation.AdditionalParametersDepartment.v] ON [Operation.AdditionalParametersDepartment.v](id);
      CREATE UNIQUE NONCLUSTERED INDEX[Operation.AdditionalParametersDepartment.v.date] ON[Operation.AdditionalParametersDepartment.v](date, id) INCLUDE([company]);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AdditionalParametersDepartment.v.parent] ON [Operation.AdditionalParametersDepartment.v](parent,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AdditionalParametersDepartment.v.deleted] ON [Operation.AdditionalParametersDepartment.v](deleted,date,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AdditionalParametersDepartment.v.code] ON [Operation.AdditionalParametersDepartment.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AdditionalParametersDepartment.v.user] ON [Operation.AdditionalParametersDepartment.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AdditionalParametersDepartment.v.company] ON [Operation.AdditionalParametersDepartment.v](company,id);
      
GO
GRANT SELECT ON dbo.[Operation.AdditionalParametersDepartment.v]TO jetti; 
GO
ALTER SECURITY POLICY[rls].[companyAccessPolicy]
      ADD FILTER PREDICATE[rls].[fn_companyAccessPredicate]([company]) ON[dbo].[Operation.AdditionalParametersDepartment.v];
      RAISERROR('Operation.AdditionalParametersDepartment finish', 0 ,1) WITH NOWAIT;
      
------------------------------ BEGIN Operation.AdditionalParametersDepartment ------------------------------

      
------------------------------ BEGIN Operation.AutoAdditionSettings ------------------------------

      RAISERROR('Operation.AutoAdditionSettings start', 0 ,1) WITH NOWAIT;
      
      BEGIN TRY
        ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Operation.AutoAdditionSettings.v];
      END TRY
      BEGIN CATCH
      END CATCH
GO
CREATE OR ALTER VIEW dbo.[Operation.AutoAdditionSettings.v] WITH SCHEMABINDING AS 
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Group"')) [Group]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Operation"')) [Operation]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Amount"')), 0) [Amount]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."RetailNetwork"')) [RetailNetwork]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."AdditionalType"')), '') [AdditionalType]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."MainSKU"')) [MainSKU]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Qty"')), 0) [Qty]
      FROM dbo.[Documents]
      WHERE [operation] = '73F98550-33E2-11EB-A7C3-274B4A063111'
; 
GO
CREATE UNIQUE CLUSTERED INDEX [Operation.AutoAdditionSettings.v] ON [Operation.AutoAdditionSettings.v](id);
      CREATE UNIQUE NONCLUSTERED INDEX[Operation.AutoAdditionSettings.v.date] ON[Operation.AutoAdditionSettings.v](date, id) INCLUDE([company]);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AutoAdditionSettings.v.parent] ON [Operation.AutoAdditionSettings.v](parent,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AutoAdditionSettings.v.deleted] ON [Operation.AutoAdditionSettings.v](deleted,date,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AutoAdditionSettings.v.code] ON [Operation.AutoAdditionSettings.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AutoAdditionSettings.v.user] ON [Operation.AutoAdditionSettings.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AutoAdditionSettings.v.company] ON [Operation.AutoAdditionSettings.v](company,id);
      
GO
GRANT SELECT ON dbo.[Operation.AutoAdditionSettings.v]TO jetti; 
GO
ALTER SECURITY POLICY[rls].[companyAccessPolicy]
      ADD FILTER PREDICATE[rls].[fn_companyAccessPredicate]([company]) ON[dbo].[Operation.AutoAdditionSettings.v];
      RAISERROR('Operation.AutoAdditionSettings finish', 0 ,1) WITH NOWAIT;
      
------------------------------ BEGIN Operation.AutoAdditionSettings ------------------------------

      
------------------------------ BEGIN Operation.AutoAdditionSettings ------------------------------

      RAISERROR('Operation.AutoAdditionSettings start', 0 ,1) WITH NOWAIT;
      
      BEGIN TRY
        ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Operation.AutoAdditionSettings.v];
      END TRY
      BEGIN CATCH
      END CATCH
GO
CREATE OR ALTER VIEW dbo.[Operation.AutoAdditionSettings.v] WITH SCHEMABINDING AS 
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Group"')) [Group]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Operation"')) [Operation]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Amount"')), 0) [Amount]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."RetailNetwork"')) [RetailNetwork]
      FROM dbo.[Documents]
      WHERE [operation] = 'E3910160-7AC1-11EB-A815-05612A0C2146'
; 
GO
CREATE UNIQUE CLUSTERED INDEX [Operation.AutoAdditionSettings.v] ON [Operation.AutoAdditionSettings.v](id);
      CREATE UNIQUE NONCLUSTERED INDEX[Operation.AutoAdditionSettings.v.date] ON[Operation.AutoAdditionSettings.v](date, id) INCLUDE([company]);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AutoAdditionSettings.v.parent] ON [Operation.AutoAdditionSettings.v](parent,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AutoAdditionSettings.v.deleted] ON [Operation.AutoAdditionSettings.v](deleted,date,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AutoAdditionSettings.v.code] ON [Operation.AutoAdditionSettings.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AutoAdditionSettings.v.user] ON [Operation.AutoAdditionSettings.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.AutoAdditionSettings.v.company] ON [Operation.AutoAdditionSettings.v](company,id);
      
GO
GRANT SELECT ON dbo.[Operation.AutoAdditionSettings.v]TO jetti; 
GO
ALTER SECURITY POLICY[rls].[companyAccessPolicy]
      ADD FILTER PREDICATE[rls].[fn_companyAccessPredicate]([company]) ON[dbo].[Operation.AutoAdditionSettings.v];
      RAISERROR('Operation.AutoAdditionSettings finish', 0 ,1) WITH NOWAIT;
      
------------------------------ BEGIN Operation.AutoAdditionSettings ------------------------------

      
------------------------------ BEGIN Operation.CashShifts ------------------------------

      RAISERROR('Operation.CashShifts start', 0 ,1) WITH NOWAIT;
      
      BEGIN TRY
        ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Operation.CashShifts.v];
      END TRY
      BEGIN CATCH
      END CATCH
GO
CREATE OR ALTER VIEW dbo.[Operation.CashShifts.v] WITH SCHEMABINDING AS 
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Group"')) [Group]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Operation"')) [Operation]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Amount"')), 0) [Amount]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Department"')) [Department]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."UserId"')) [UserId]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."CashShiftNumber"')), '') [CashShiftNumber]
      , TRY_CONVERT(DATE, JSON_VALUE(doc,N'$."AccountingDate"'),127) [AccountingDate]
      , TRY_CONVERT(DATETIME, JSON_VALUE(doc,N'$."StartDate"'),127) [StartDate]
      , TRY_CONVERT(DATETIME, JSON_VALUE(doc,N'$."EndDate"'),127) [EndDate]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."ChecksLoaded"')), 0) [ChecksLoaded]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."ProductionCalculated"')), 0) [ProductionCalculated]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."startBalance"')), 0) [startBalance]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."endBalance"')), 0) [endBalance]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."ErrorCount"')), 0) [ErrorCount]
      FROM dbo.[Documents]
      WHERE [operation] = '72D21520-144D-11EB-B23D-A9B204614E62'
; 
GO
CREATE UNIQUE CLUSTERED INDEX [Operation.CashShifts.v] ON [Operation.CashShifts.v](id);
      CREATE UNIQUE NONCLUSTERED INDEX[Operation.CashShifts.v.date] ON[Operation.CashShifts.v](date, id) INCLUDE([company]);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.CashShifts.v.parent] ON [Operation.CashShifts.v](parent,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.CashShifts.v.deleted] ON [Operation.CashShifts.v](deleted,date,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.CashShifts.v.code] ON [Operation.CashShifts.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.CashShifts.v.user] ON [Operation.CashShifts.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.CashShifts.v.company] ON [Operation.CashShifts.v](company,id);
      
GO
GRANT SELECT ON dbo.[Operation.CashShifts.v]TO jetti; 
GO
ALTER SECURITY POLICY[rls].[companyAccessPolicy]
      ADD FILTER PREDICATE[rls].[fn_companyAccessPredicate]([company]) ON[dbo].[Operation.CashShifts.v];
      RAISERROR('Operation.CashShifts finish', 0 ,1) WITH NOWAIT;
      
------------------------------ BEGIN Operation.CashShifts ------------------------------

      
------------------------------ BEGIN Operation.CHECK_JETTI_FRONT ------------------------------

      RAISERROR('Operation.CHECK_JETTI_FRONT start', 0 ,1) WITH NOWAIT;
      
      BEGIN TRY
        ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Operation.CHECK_JETTI_FRONT.v];
      END TRY
      BEGIN CATCH
      END CATCH
GO
CREATE OR ALTER VIEW dbo.[Operation.CHECK_JETTI_FRONT.v] WITH SCHEMABINDING AS 
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Group"')) [Group]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Operation"')) [Operation]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Amount"')), 0) [Amount]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Department"')) [Department]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Customer"')) [Customer]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Manager"')) [Manager]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Storehouse"')) [Storehouse]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."DiscountDoc"')), 0) [DiscountDoc]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."NumCashShift"')), '') [NumCashShift]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."TypeDocument"')), '') [TypeDocument]
      , TRY_CONVERT(DATETIME, JSON_VALUE(doc,N'$."PrintTime"'),127) [PrintTime]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."counterpartyId"')), '') [counterpartyId]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."orderId"')), '') [orderId]
      FROM dbo.[Documents]
      WHERE [operation] = '1D5BE740-298A-11EB-87AE-6D4972EE7833'
; 
GO
CREATE UNIQUE CLUSTERED INDEX [Operation.CHECK_JETTI_FRONT.v] ON [Operation.CHECK_JETTI_FRONT.v](id);
      CREATE UNIQUE NONCLUSTERED INDEX[Operation.CHECK_JETTI_FRONT.v.date] ON[Operation.CHECK_JETTI_FRONT.v](date, id) INCLUDE([company]);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.CHECK_JETTI_FRONT.v.parent] ON [Operation.CHECK_JETTI_FRONT.v](parent,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.CHECK_JETTI_FRONT.v.deleted] ON [Operation.CHECK_JETTI_FRONT.v](deleted,date,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.CHECK_JETTI_FRONT.v.code] ON [Operation.CHECK_JETTI_FRONT.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.CHECK_JETTI_FRONT.v.user] ON [Operation.CHECK_JETTI_FRONT.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.CHECK_JETTI_FRONT.v.company] ON [Operation.CHECK_JETTI_FRONT.v](company,id);
      CREATE UNIQUE NONCLUSTERED INDEX[Operation.CHECK_JETTI_FRONT.v.Department] ON[Operation.CHECK_JETTI_FRONT.v](Department, id) INCLUDE([company]);
CREATE UNIQUE NONCLUSTERED INDEX[Operation.CHECK_JETTI_FRONT.v.Customer] ON[Operation.CHECK_JETTI_FRONT.v](Customer, id) INCLUDE([company]);
CREATE UNIQUE NONCLUSTERED INDEX[Operation.CHECK_JETTI_FRONT.v.Storehouse] ON[Operation.CHECK_JETTI_FRONT.v](Storehouse, id) INCLUDE([company]);
GO
GRANT SELECT ON dbo.[Operation.CHECK_JETTI_FRONT.v]TO jetti; 
GO
ALTER SECURITY POLICY[rls].[companyAccessPolicy]
      ADD FILTER PREDICATE[rls].[fn_companyAccessPredicate]([company]) ON[dbo].[Operation.CHECK_JETTI_FRONT.v];
      RAISERROR('Operation.CHECK_JETTI_FRONT finish', 0 ,1) WITH NOWAIT;
      
------------------------------ BEGIN Operation.CHECK_JETTI_FRONT ------------------------------

      
------------------------------ BEGIN Operation.DeliveryAreas ------------------------------

      RAISERROR('Operation.DeliveryAreas start', 0 ,1) WITH NOWAIT;
      
      BEGIN TRY
        ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Operation.DeliveryAreas.v];
      END TRY
      BEGIN CATCH
      END CATCH
GO
CREATE OR ALTER VIEW dbo.[Operation.DeliveryAreas.v] WITH SCHEMABINDING AS 
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Group"')) [Group]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Operation"')) [Operation]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Amount"')), 0) [Amount]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."RetailNetwork"')) [RetailNetwork]
      , ISNULL(TRY_CONVERT(NVARCHAR(250), JSON_VALUE(doc,N'$."MapUrl"')), '') [MapUrl]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."LoadFolder"')), '') [LoadFolder]
      FROM dbo.[Documents]
      WHERE [operation] = '3C593A00-32FC-11EB-9D67-5B583D0A1D7D'
; 
GO
CREATE UNIQUE CLUSTERED INDEX [Operation.DeliveryAreas.v] ON [Operation.DeliveryAreas.v](id);
      CREATE UNIQUE NONCLUSTERED INDEX[Operation.DeliveryAreas.v.date] ON[Operation.DeliveryAreas.v](date, id) INCLUDE([company]);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.DeliveryAreas.v.parent] ON [Operation.DeliveryAreas.v](parent,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.DeliveryAreas.v.deleted] ON [Operation.DeliveryAreas.v](deleted,date,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.DeliveryAreas.v.code] ON [Operation.DeliveryAreas.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.DeliveryAreas.v.user] ON [Operation.DeliveryAreas.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.DeliveryAreas.v.company] ON [Operation.DeliveryAreas.v](company,id);
      
GO
GRANT SELECT ON dbo.[Operation.DeliveryAreas.v]TO jetti; 
GO
ALTER SECURITY POLICY[rls].[companyAccessPolicy]
      ADD FILTER PREDICATE[rls].[fn_companyAccessPredicate]([company]) ON[dbo].[Operation.DeliveryAreas.v];
      RAISERROR('Operation.DeliveryAreas finish', 0 ,1) WITH NOWAIT;
      
------------------------------ BEGIN Operation.DeliveryAreas ------------------------------

      
------------------------------ BEGIN Operation.LOT_Sales ------------------------------

      RAISERROR('Operation.LOT_Sales start', 0 ,1) WITH NOWAIT;
      
      BEGIN TRY
        ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Operation.LOT_Sales.v];
      END TRY
      BEGIN CATCH
      END CATCH
GO
CREATE OR ALTER VIEW dbo.[Operation.LOT_Sales.v] WITH SCHEMABINDING AS 
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Group"')) [Group]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Operation"')) [Operation]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Amount"')), 0) [Amount]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Customer"')) [Customer]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Department"')) [Department]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."CompanySeller"')) [CompanySeller]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Department_CompanySeller"')) [Department_CompanySeller]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Loan_Customer"')) [Loan_Customer]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Transaction_Id"')), '') [Transaction_Id]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Alias"')), '') [Alias]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Title"')), '') [Title]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Income_CompanySeller"')) [Income_CompanySeller]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Expense_CompanySeller"')) [Expense_CompanySeller]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Income"')) [Income]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."DocReceived"')), 0) [DocReceived]
      FROM dbo.[Documents]
      WHERE [operation] = '8C711060-B1AD-11EA-B30E-316ED2102292'
; 
GO
CREATE UNIQUE CLUSTERED INDEX [Operation.LOT_Sales.v] ON [Operation.LOT_Sales.v](id);
      CREATE UNIQUE NONCLUSTERED INDEX[Operation.LOT_Sales.v.date] ON[Operation.LOT_Sales.v](date, id) INCLUDE([company]);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.LOT_Sales.v.parent] ON [Operation.LOT_Sales.v](parent,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.LOT_Sales.v.deleted] ON [Operation.LOT_Sales.v](deleted,date,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.LOT_Sales.v.code] ON [Operation.LOT_Sales.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.LOT_Sales.v.user] ON [Operation.LOT_Sales.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.LOT_Sales.v.company] ON [Operation.LOT_Sales.v](company,id);
      
GO
GRANT SELECT ON dbo.[Operation.LOT_Sales.v]TO jetti; 
GO
ALTER SECURITY POLICY[rls].[companyAccessPolicy]
      ADD FILTER PREDICATE[rls].[fn_companyAccessPredicate]([company]) ON[dbo].[Operation.LOT_Sales.v];
      RAISERROR('Operation.LOT_Sales finish', 0 ,1) WITH NOWAIT;
      
------------------------------ BEGIN Operation.LOT_Sales ------------------------------

      
------------------------------ BEGIN Operation.LotModelsVsDepartment ------------------------------

      RAISERROR('Operation.LotModelsVsDepartment start', 0 ,1) WITH NOWAIT;
      
      BEGIN TRY
        ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Operation.LotModelsVsDepartment.v];
      END TRY
      BEGIN CATCH
      END CATCH
GO
CREATE OR ALTER VIEW dbo.[Operation.LotModelsVsDepartment.v] WITH SCHEMABINDING AS 
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Group"')) [Group]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Operation"')) [Operation]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Amount"')), 0) [Amount]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , ISNULL(TRY_CONVERT(NVARCHAR(150), JSON_VALUE(doc, N'$."Lot"')), '') [Lot]
      , ISNULL(TRY_CONVERT(BIT, JSON_VALUE(doc,N'$."isProfitability"')), 0) [isProfitability]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Lot_BonusManager"')), 0) [Lot_BonusManager]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Lot_CommisionAllUnic"')), 0) [Lot_CommisionAllUnic]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Lot_ShareDistribution"')), 0) [Lot_ShareDistribution]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Lot_ShareInvestor"')), 0) [Lot_ShareInvestor]
      FROM dbo.[Documents]
      WHERE [operation] = '69FB36A0-F735-11EA-B8BB-29476D5253E2'
; 
GO
CREATE UNIQUE CLUSTERED INDEX [Operation.LotModelsVsDepartment.v] ON [Operation.LotModelsVsDepartment.v](id);
      CREATE UNIQUE NONCLUSTERED INDEX[Operation.LotModelsVsDepartment.v.date] ON[Operation.LotModelsVsDepartment.v](date, id) INCLUDE([company]);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.LotModelsVsDepartment.v.parent] ON [Operation.LotModelsVsDepartment.v](parent,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.LotModelsVsDepartment.v.deleted] ON [Operation.LotModelsVsDepartment.v](deleted,date,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.LotModelsVsDepartment.v.code] ON [Operation.LotModelsVsDepartment.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.LotModelsVsDepartment.v.user] ON [Operation.LotModelsVsDepartment.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.LotModelsVsDepartment.v.company] ON [Operation.LotModelsVsDepartment.v](company,id);
      
GO
GRANT SELECT ON dbo.[Operation.LotModelsVsDepartment.v]TO jetti; 
GO
ALTER SECURITY POLICY[rls].[companyAccessPolicy]
      ADD FILTER PREDICATE[rls].[fn_companyAccessPredicate]([company]) ON[dbo].[Operation.LotModelsVsDepartment.v];
      RAISERROR('Operation.LotModelsVsDepartment finish', 0 ,1) WITH NOWAIT;
      
------------------------------ BEGIN Operation.LotModelsVsDepartment ------------------------------

      
------------------------------ BEGIN Operation.OnlineSalesManagementSettings ------------------------------

      RAISERROR('Operation.OnlineSalesManagementSettings start', 0 ,1) WITH NOWAIT;
      
      BEGIN TRY
        ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Operation.OnlineSalesManagementSettings.v];
      END TRY
      BEGIN CATCH
      END CATCH
GO
CREATE OR ALTER VIEW dbo.[Operation.OnlineSalesManagementSettings.v] WITH SCHEMABINDING AS 
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Group"')) [Group]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Operation"')) [Operation]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Amount"')), 0) [Amount]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."BusinessRegion"')) [BusinessRegion]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."RetailNetwork"')) [RetailNetwork]
      , TRY_CONVERT(DATETIME, JSON_VALUE(doc,N'$."DateBegin"'),127) [DateBegin]
      , TRY_CONVERT(DATETIME, JSON_VALUE(doc,N'$."DateEnd"'),127) [DateEnd]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."TypeShowcase"')), '') [TypeShowcase]
      FROM dbo.[Documents]
      WHERE [operation] = '12917090-5CCB-11EB-AAD1-616C53FDF9AB'
; 
GO
CREATE UNIQUE CLUSTERED INDEX [Operation.OnlineSalesManagementSettings.v] ON [Operation.OnlineSalesManagementSettings.v](id);
      CREATE UNIQUE NONCLUSTERED INDEX[Operation.OnlineSalesManagementSettings.v.date] ON[Operation.OnlineSalesManagementSettings.v](date, id) INCLUDE([company]);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.OnlineSalesManagementSettings.v.parent] ON [Operation.OnlineSalesManagementSettings.v](parent,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.OnlineSalesManagementSettings.v.deleted] ON [Operation.OnlineSalesManagementSettings.v](deleted,date,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.OnlineSalesManagementSettings.v.code] ON [Operation.OnlineSalesManagementSettings.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.OnlineSalesManagementSettings.v.user] ON [Operation.OnlineSalesManagementSettings.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.OnlineSalesManagementSettings.v.company] ON [Operation.OnlineSalesManagementSettings.v](company,id);
      
GO
GRANT SELECT ON dbo.[Operation.OnlineSalesManagementSettings.v]TO jetti; 
GO
ALTER SECURITY POLICY[rls].[companyAccessPolicy]
      ADD FILTER PREDICATE[rls].[fn_companyAccessPredicate]([company]) ON[dbo].[Operation.OnlineSalesManagementSettings.v];
      RAISERROR('Operation.OnlineSalesManagementSettings finish', 0 ,1) WITH NOWAIT;
      
------------------------------ BEGIN Operation.OnlineSalesManagementSettings ------------------------------

      
------------------------------ BEGIN Operation.OnlineSalesManagementSettings ------------------------------

      RAISERROR('Operation.OnlineSalesManagementSettings start', 0 ,1) WITH NOWAIT;
      
      BEGIN TRY
        ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Operation.OnlineSalesManagementSettings.v];
      END TRY
      BEGIN CATCH
      END CATCH
GO
CREATE OR ALTER VIEW dbo.[Operation.OnlineSalesManagementSettings.v] WITH SCHEMABINDING AS 
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Group"')) [Group]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Operation"')) [Operation]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Amount"')), 0) [Amount]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."BusinessRegion"')) [BusinessRegion]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."RetailNetwork"')) [RetailNetwork]
      , TRY_CONVERT(DATETIME, JSON_VALUE(doc,N'$."DateBegin"'),127) [DateBegin]
      , TRY_CONVERT(DATETIME, JSON_VALUE(doc,N'$."DateEnd"'),127) [DateEnd]
      FROM dbo.[Documents]
      WHERE [operation] = '296FB8C0-5F42-11EB-84E9-D19E3732913C'
; 
GO
CREATE UNIQUE CLUSTERED INDEX [Operation.OnlineSalesManagementSettings.v] ON [Operation.OnlineSalesManagementSettings.v](id);
      CREATE UNIQUE NONCLUSTERED INDEX[Operation.OnlineSalesManagementSettings.v.date] ON[Operation.OnlineSalesManagementSettings.v](date, id) INCLUDE([company]);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.OnlineSalesManagementSettings.v.parent] ON [Operation.OnlineSalesManagementSettings.v](parent,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.OnlineSalesManagementSettings.v.deleted] ON [Operation.OnlineSalesManagementSettings.v](deleted,date,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.OnlineSalesManagementSettings.v.code] ON [Operation.OnlineSalesManagementSettings.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.OnlineSalesManagementSettings.v.user] ON [Operation.OnlineSalesManagementSettings.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.OnlineSalesManagementSettings.v.company] ON [Operation.OnlineSalesManagementSettings.v](company,id);
      
GO
GRANT SELECT ON dbo.[Operation.OnlineSalesManagementSettings.v]TO jetti; 
GO
ALTER SECURITY POLICY[rls].[companyAccessPolicy]
      ADD FILTER PREDICATE[rls].[fn_companyAccessPredicate]([company]) ON[dbo].[Operation.OnlineSalesManagementSettings.v];
      RAISERROR('Operation.OnlineSalesManagementSettings finish', 0 ,1) WITH NOWAIT;
      
------------------------------ BEGIN Operation.OnlineSalesManagementSettings ------------------------------

      
------------------------------ BEGIN Operation.Status_Opening_Registry ------------------------------

      RAISERROR('Operation.Status_Opening_Registry start', 0 ,1) WITH NOWAIT;
      
      BEGIN TRY
        ALTER SECURITY POLICY[rls].[companyAccessPolicy] DROP FILTER PREDICATE ON[dbo].[Operation.Status_Opening_Registry.v];
      END TRY
      BEGIN CATCH
      END CATCH
GO
CREATE OR ALTER VIEW dbo.[Operation.Status_Opening_Registry.v] WITH SCHEMABINDING AS 
      SELECT id, type, date, code, description, posted, deleted, isfolder, timestamp, parent, company, [user], [version]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."workflow"')) [workflow]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Group"')) [Group]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Operation"')) [Operation]
      , ISNULL(TRY_CONVERT(MONEY, JSON_VALUE(doc,N'$."Amount"')), 0) [Amount]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."currency"')) [currency]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."ResponsibilityCenter"')) [ResponsibilityCenter]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Department"')) [Department]
      , ISNULL(TRY_CONVERT(NVARCHAR(36), JSON_VALUE(doc,N'$."ValueString"')), '') [ValueString]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."BusinessRegion"')) [BusinessRegion]
      , TRY_CONVERT(UNIQUEIDENTIFIER, JSON_VALUE(doc, N'$."Brand"')) [Brand]
      , TRY_CONVERT(DATE, JSON_VALUE(doc,N'$."OpeningDatePlanned"'),127) [OpeningDatePlanned]
      FROM dbo.[Documents]
      WHERE [operation] = 'D7804240-741E-11EB-B750-45F122470B78'
; 
GO
CREATE UNIQUE CLUSTERED INDEX [Operation.Status_Opening_Registry.v] ON [Operation.Status_Opening_Registry.v](id);
      CREATE UNIQUE NONCLUSTERED INDEX[Operation.Status_Opening_Registry.v.date] ON[Operation.Status_Opening_Registry.v](date, id) INCLUDE([company]);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.Status_Opening_Registry.v.parent] ON [Operation.Status_Opening_Registry.v](parent,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.Status_Opening_Registry.v.deleted] ON [Operation.Status_Opening_Registry.v](deleted,date,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.Status_Opening_Registry.v.code] ON [Operation.Status_Opening_Registry.v](code,id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.Status_Opening_Registry.v.user] ON [Operation.Status_Opening_Registry.v]([user],id);
      CREATE UNIQUE NONCLUSTERED INDEX [Operation.Status_Opening_Registry.v.company] ON [Operation.Status_Opening_Registry.v](company,id);
      
GO
GRANT SELECT ON dbo.[Operation.Status_Opening_Registry.v]TO jetti; 
GO
ALTER SECURITY POLICY[rls].[companyAccessPolicy]
      ADD FILTER PREDICATE[rls].[fn_companyAccessPredicate]([company]) ON[dbo].[Operation.Status_Opening_Registry.v];
      RAISERROR('Operation.Status_Opening_Registry finish', 0 ,1) WITH NOWAIT;
      
------------------------------ BEGIN Operation.Status_Opening_Registry ------------------------------

      