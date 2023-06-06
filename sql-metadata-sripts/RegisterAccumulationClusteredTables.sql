
    DROP INDEX IF EXISTS [Documents.parent] ON [dbo].[Documents];
    CREATE UNIQUE NONCLUSTERED INDEX [Documents.parent] ON [dbo].[Documents]([parent], [id]);
    
------------------------------ BEGIN Register.Accumulation.AccountablePersons ------------------------------

    RAISERROR('Register.Accumulation.AccountablePersons start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.AccountablePersons.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.AccountablePersons');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.AccountablePersons] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.AccountablePersons');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.AccountablePersons] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.AccountablePersons');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.AccountablePersons') = 0 RETURN;

      INSERT INTO [Register.Accumulation.AccountablePersons]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [currency], [Employee], [CashFlow]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
      , d.[AmountToPay] * IIF(r.kind = 1, 1, -1) [AmountToPay], d.[AmountToPay] * IIF(r.kind = 1, 1, null) [AmountToPay.In], d.[AmountToPay] * IIF(r.kind = 1, null, 1) [AmountToPay.Out]
      , d.[AmountIsPaid] * IIF(r.kind = 1, 1, -1) [AmountIsPaid], d.[AmountIsPaid] * IIF(r.kind = 1, 1, null) [AmountIsPaid.In], d.[AmountIsPaid] * IIF(r.kind = 1, null, 1) [AmountIsPaid.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Employee] UNIQUEIDENTIFIER N'$.Employee'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [AmountToPay] MONEY N'$.AmountToPay'
        , [AmountIsPaid] MONEY N'$.AmountIsPaid'
        ) AS d
        WHERE r.type = N'Register.Accumulation.AccountablePersons';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.AccountablePersons];
    DROP VIEW IF EXISTS [Register.Accumulation.AccountablePersons];
    DROP VIEW IF EXISTS [Register.Accumulation.AccountablePersons.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [currency], [Employee], [CashFlow]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
      , d.[AmountToPay] * IIF(r.kind = 1, 1, -1) [AmountToPay], d.[AmountToPay] * IIF(r.kind = 1, 1, null) [AmountToPay.In], d.[AmountToPay] * IIF(r.kind = 1, null, 1) [AmountToPay.Out]
      , d.[AmountIsPaid] * IIF(r.kind = 1, 1, -1) [AmountIsPaid], d.[AmountIsPaid] * IIF(r.kind = 1, 1, null) [AmountIsPaid.In], d.[AmountIsPaid] * IIF(r.kind = 1, null, 1) [AmountIsPaid.Out]
    INTO [Register.Accumulation.AccountablePersons]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Employee] UNIQUEIDENTIFIER N'$.Employee'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [AmountToPay] MONEY N'$.AmountToPay'
        , [AmountIsPaid] MONEY N'$.AmountIsPaid'
    ) AS d
    WHERE r.type = N'Register.Accumulation.AccountablePersons';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.AccountablePersons] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.AccountablePersons] ADD CONSTRAINT [PK_Register.Accumulation.AccountablePersons] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.AccountablePersons] ON [Register.Accumulation.AccountablePersons];
    RAISERROR('Register.Accumulation.AccountablePersons finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.AccountablePersons ------------------------------

------------------------------ BEGIN Register.Accumulation.PaymentBatch ------------------------------

    RAISERROR('Register.Accumulation.PaymentBatch start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.PaymentBatch.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.PaymentBatch');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.PaymentBatch] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.PaymentBatch');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.PaymentBatch] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.PaymentBatch');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.PaymentBatch') = 0 RETURN;

      INSERT INTO [Register.Accumulation.PaymentBatch]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [PaymentsKind], [Counterpartie], [ProductPackage], [Product], [Currency], [PayDay]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out]
      , d.[Price] * IIF(r.kind = 1, 1, -1) [Price], d.[Price] * IIF(r.kind = 1, 1, null) [Price.In], d.[Price] * IIF(r.kind = 1, null, 1) [Price.Out]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out], [batch]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [PaymentsKind] NVARCHAR(250) N'$.PaymentsKind'
        , [Counterpartie] UNIQUEIDENTIFIER N'$.Counterpartie'
        , [ProductPackage] UNIQUEIDENTIFIER N'$.ProductPackage'
        , [Product] UNIQUEIDENTIFIER N'$.Product'
        , [Currency] UNIQUEIDENTIFIER N'$.Currency'
        , [PayDay] DATE N'$.PayDay'
        , [Qty] MONEY N'$.Qty'
        , [Price] MONEY N'$.Price'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [batch] UNIQUEIDENTIFIER N'$.batch'
        ) AS d
        WHERE r.type = N'Register.Accumulation.PaymentBatch';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.PaymentBatch];
    DROP VIEW IF EXISTS [Register.Accumulation.PaymentBatch];
    DROP VIEW IF EXISTS [Register.Accumulation.PaymentBatch.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [PaymentsKind], [Counterpartie], [ProductPackage], [Product], [Currency], [PayDay]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out]
      , d.[Price] * IIF(r.kind = 1, 1, -1) [Price], d.[Price] * IIF(r.kind = 1, 1, null) [Price.In], d.[Price] * IIF(r.kind = 1, null, 1) [Price.Out]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out], [batch]
    INTO [Register.Accumulation.PaymentBatch]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [PaymentsKind] NVARCHAR(250) N'$.PaymentsKind'
        , [Counterpartie] UNIQUEIDENTIFIER N'$.Counterpartie'
        , [ProductPackage] UNIQUEIDENTIFIER N'$.ProductPackage'
        , [Product] UNIQUEIDENTIFIER N'$.Product'
        , [Currency] UNIQUEIDENTIFIER N'$.Currency'
        , [PayDay] DATE N'$.PayDay'
        , [Qty] MONEY N'$.Qty'
        , [Price] MONEY N'$.Price'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [batch] UNIQUEIDENTIFIER N'$.batch'
    ) AS d
    WHERE r.type = N'Register.Accumulation.PaymentBatch';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.PaymentBatch] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.PaymentBatch] ADD CONSTRAINT [PK_Register.Accumulation.PaymentBatch] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.PaymentBatch] ON [Register.Accumulation.PaymentBatch];
    RAISERROR('Register.Accumulation.PaymentBatch finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.PaymentBatch ------------------------------

------------------------------ BEGIN Register.Accumulation.Investment.Analytics ------------------------------

    RAISERROR('Register.Accumulation.Investment.Analytics start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Investment.Analytics.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Investment.Analytics');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Investment.Analytics] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Investment.Analytics');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Investment.Analytics] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Investment.Analytics');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Investment.Analytics') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Investment.Analytics]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [Department], [SourceTransaction], [CreditTransaction], [OperationType], [Investor], [CompanyProduct], [Product]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out], [CurrencyProduct]
      , d.[AmountProduct] * IIF(r.kind = 1, 1, -1) [AmountProduct], d.[AmountProduct] * IIF(r.kind = 1, 1, null) [AmountProduct.In], d.[AmountProduct] * IIF(r.kind = 1, null, 1) [AmountProduct.Out], [PaymentSource], [CurrencySource]
      , d.[AmountSource] * IIF(r.kind = 1, 1, -1) [AmountSource], d.[AmountSource] * IIF(r.kind = 1, 1, null) [AmountSource.In], d.[AmountSource] * IIF(r.kind = 1, null, 1) [AmountSource.Out], [CompanyLoan], [Loan], [CurrencyLoan]
      , d.[AmountLoan] * IIF(r.kind = 1, 1, -1) [AmountLoan], d.[AmountLoan] * IIF(r.kind = 1, 1, null) [AmountLoan.In], d.[AmountLoan] * IIF(r.kind = 1, null, 1) [AmountLoan.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [SourceTransaction] NVARCHAR(250) N'$.SourceTransaction'
        , [CreditTransaction] UNIQUEIDENTIFIER N'$.CreditTransaction'
        , [OperationType] UNIQUEIDENTIFIER N'$.OperationType'
        , [Investor] UNIQUEIDENTIFIER N'$.Investor'
        , [CompanyProduct] UNIQUEIDENTIFIER N'$.CompanyProduct'
        , [Product] UNIQUEIDENTIFIER N'$.Product'
        , [Qty] MONEY N'$.Qty'
        , [CurrencyProduct] UNIQUEIDENTIFIER N'$.CurrencyProduct'
        , [AmountProduct] MONEY N'$.AmountProduct'
        , [PaymentSource] UNIQUEIDENTIFIER N'$.PaymentSource'
        , [CurrencySource] UNIQUEIDENTIFIER N'$.CurrencySource'
        , [AmountSource] MONEY N'$.AmountSource'
        , [CompanyLoan] UNIQUEIDENTIFIER N'$.CompanyLoan'
        , [Loan] UNIQUEIDENTIFIER N'$.Loan'
        , [CurrencyLoan] UNIQUEIDENTIFIER N'$.CurrencyLoan'
        , [AmountLoan] MONEY N'$.AmountLoan'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Investment.Analytics';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Investment.Analytics];
    DROP VIEW IF EXISTS [Register.Accumulation.Investment.Analytics];
    DROP VIEW IF EXISTS [Register.Accumulation.Investment.Analytics.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [Department], [SourceTransaction], [CreditTransaction], [OperationType], [Investor], [CompanyProduct], [Product]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out], [CurrencyProduct]
      , d.[AmountProduct] * IIF(r.kind = 1, 1, -1) [AmountProduct], d.[AmountProduct] * IIF(r.kind = 1, 1, null) [AmountProduct.In], d.[AmountProduct] * IIF(r.kind = 1, null, 1) [AmountProduct.Out], [PaymentSource], [CurrencySource]
      , d.[AmountSource] * IIF(r.kind = 1, 1, -1) [AmountSource], d.[AmountSource] * IIF(r.kind = 1, 1, null) [AmountSource.In], d.[AmountSource] * IIF(r.kind = 1, null, 1) [AmountSource.Out], [CompanyLoan], [Loan], [CurrencyLoan]
      , d.[AmountLoan] * IIF(r.kind = 1, 1, -1) [AmountLoan], d.[AmountLoan] * IIF(r.kind = 1, 1, null) [AmountLoan.In], d.[AmountLoan] * IIF(r.kind = 1, null, 1) [AmountLoan.Out]
    INTO [Register.Accumulation.Investment.Analytics]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [SourceTransaction] NVARCHAR(250) N'$.SourceTransaction'
        , [CreditTransaction] UNIQUEIDENTIFIER N'$.CreditTransaction'
        , [OperationType] UNIQUEIDENTIFIER N'$.OperationType'
        , [Investor] UNIQUEIDENTIFIER N'$.Investor'
        , [CompanyProduct] UNIQUEIDENTIFIER N'$.CompanyProduct'
        , [Product] UNIQUEIDENTIFIER N'$.Product'
        , [Qty] MONEY N'$.Qty'
        , [CurrencyProduct] UNIQUEIDENTIFIER N'$.CurrencyProduct'
        , [AmountProduct] MONEY N'$.AmountProduct'
        , [PaymentSource] UNIQUEIDENTIFIER N'$.PaymentSource'
        , [CurrencySource] UNIQUEIDENTIFIER N'$.CurrencySource'
        , [AmountSource] MONEY N'$.AmountSource'
        , [CompanyLoan] UNIQUEIDENTIFIER N'$.CompanyLoan'
        , [Loan] UNIQUEIDENTIFIER N'$.Loan'
        , [CurrencyLoan] UNIQUEIDENTIFIER N'$.CurrencyLoan'
        , [AmountLoan] MONEY N'$.AmountLoan'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Investment.Analytics';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Investment.Analytics] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Investment.Analytics] ADD CONSTRAINT [PK_Register.Accumulation.Investment.Analytics] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Investment.Analytics] ON [Register.Accumulation.Investment.Analytics];
    RAISERROR('Register.Accumulation.Investment.Analytics finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Investment.Analytics ------------------------------

------------------------------ BEGIN Register.Accumulation.OrderPayment ------------------------------

    RAISERROR('Register.Accumulation.OrderPayment start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.OrderPayment.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.OrderPayment');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.OrderPayment] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.OrderPayment');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.OrderPayment] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.OrderPayment');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.OrderPayment') = 0 RETURN;

      INSERT INTO [Register.Accumulation.OrderPayment]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [PaymantKind], [Customer], [BankAccount], [CashRegister], [AcquiringTerminal], [currency], [Department]
      , d.[CashShift] * IIF(r.kind = 1, 1, -1) [CashShift], d.[CashShift] * IIF(r.kind = 1, 1, null) [CashShift.In], d.[CashShift] * IIF(r.kind = 1, null, 1) [CashShift.Out]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [PaymantKind] NVARCHAR(250) N'$.PaymantKind'
        , [Customer] UNIQUEIDENTIFIER N'$.Customer'
        , [BankAccount] UNIQUEIDENTIFIER N'$.BankAccount'
        , [CashRegister] UNIQUEIDENTIFIER N'$.CashRegister'
        , [AcquiringTerminal] UNIQUEIDENTIFIER N'$.AcquiringTerminal'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [CashShift] MONEY N'$.CashShift'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        ) AS d
        WHERE r.type = N'Register.Accumulation.OrderPayment';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.OrderPayment];
    DROP VIEW IF EXISTS [Register.Accumulation.OrderPayment];
    DROP VIEW IF EXISTS [Register.Accumulation.OrderPayment.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [PaymantKind], [Customer], [BankAccount], [CashRegister], [AcquiringTerminal], [currency], [Department]
      , d.[CashShift] * IIF(r.kind = 1, 1, -1) [CashShift], d.[CashShift] * IIF(r.kind = 1, 1, null) [CashShift.In], d.[CashShift] * IIF(r.kind = 1, null, 1) [CashShift.Out]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
    INTO [Register.Accumulation.OrderPayment]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [PaymantKind] NVARCHAR(250) N'$.PaymantKind'
        , [Customer] UNIQUEIDENTIFIER N'$.Customer'
        , [BankAccount] UNIQUEIDENTIFIER N'$.BankAccount'
        , [CashRegister] UNIQUEIDENTIFIER N'$.CashRegister'
        , [AcquiringTerminal] UNIQUEIDENTIFIER N'$.AcquiringTerminal'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [CashShift] MONEY N'$.CashShift'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
    ) AS d
    WHERE r.type = N'Register.Accumulation.OrderPayment';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.OrderPayment] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.OrderPayment] ADD CONSTRAINT [PK_Register.Accumulation.OrderPayment] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.OrderPayment] ON [Register.Accumulation.OrderPayment];
    RAISERROR('Register.Accumulation.OrderPayment finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.OrderPayment ------------------------------

------------------------------ BEGIN Register.Accumulation.OrderProduct ------------------------------

    RAISERROR('Register.Accumulation.OrderProduct start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.OrderProduct.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.OrderProduct');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.OrderProduct] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.OrderProduct');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.OrderProduct] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.OrderProduct');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.OrderProduct') = 0 RETURN;

      INSERT INTO [Register.Accumulation.OrderProduct]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [OrderType], [MovementType], [RetailNetwork], [Supplier], [Customer], [SenderDepartment], [SenderStorehouse], [RecipientDepartment], [RecipientStorehouse], [currency], [Product], [OrderBatch], [OrderRow]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [OrderType] UNIQUEIDENTIFIER N'$.OrderType'
        , [MovementType] UNIQUEIDENTIFIER N'$.MovementType'
        , [RetailNetwork] UNIQUEIDENTIFIER N'$.RetailNetwork'
        , [Supplier] UNIQUEIDENTIFIER N'$.Supplier'
        , [Customer] UNIQUEIDENTIFIER N'$.Customer'
        , [SenderDepartment] UNIQUEIDENTIFIER N'$.SenderDepartment'
        , [SenderStorehouse] UNIQUEIDENTIFIER N'$.SenderStorehouse'
        , [RecipientDepartment] UNIQUEIDENTIFIER N'$.RecipientDepartment'
        , [RecipientStorehouse] UNIQUEIDENTIFIER N'$.RecipientStorehouse'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Product] UNIQUEIDENTIFIER N'$.Product'
        , [OrderBatch] UNIQUEIDENTIFIER N'$.OrderBatch'
        , [OrderRow] NVARCHAR(250) N'$.OrderRow'
        , [Qty] MONEY N'$.Qty'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        ) AS d
        WHERE r.type = N'Register.Accumulation.OrderProduct';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.OrderProduct];
    DROP VIEW IF EXISTS [Register.Accumulation.OrderProduct];
    DROP VIEW IF EXISTS [Register.Accumulation.OrderProduct.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [OrderType], [MovementType], [RetailNetwork], [Supplier], [Customer], [SenderDepartment], [SenderStorehouse], [RecipientDepartment], [RecipientStorehouse], [currency], [Product], [OrderBatch], [OrderRow]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
    INTO [Register.Accumulation.OrderProduct]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [OrderType] UNIQUEIDENTIFIER N'$.OrderType'
        , [MovementType] UNIQUEIDENTIFIER N'$.MovementType'
        , [RetailNetwork] UNIQUEIDENTIFIER N'$.RetailNetwork'
        , [Supplier] UNIQUEIDENTIFIER N'$.Supplier'
        , [Customer] UNIQUEIDENTIFIER N'$.Customer'
        , [SenderDepartment] UNIQUEIDENTIFIER N'$.SenderDepartment'
        , [SenderStorehouse] UNIQUEIDENTIFIER N'$.SenderStorehouse'
        , [RecipientDepartment] UNIQUEIDENTIFIER N'$.RecipientDepartment'
        , [RecipientStorehouse] UNIQUEIDENTIFIER N'$.RecipientStorehouse'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Product] UNIQUEIDENTIFIER N'$.Product'
        , [OrderBatch] UNIQUEIDENTIFIER N'$.OrderBatch'
        , [OrderRow] NVARCHAR(250) N'$.OrderRow'
        , [Qty] MONEY N'$.Qty'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
    ) AS d
    WHERE r.type = N'Register.Accumulation.OrderProduct';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.OrderProduct] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.OrderProduct] ADD CONSTRAINT [PK_Register.Accumulation.OrderProduct] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.OrderProduct] ON [Register.Accumulation.OrderProduct];
    RAISERROR('Register.Accumulation.OrderProduct finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.OrderProduct ------------------------------

------------------------------ BEGIN Register.Accumulation.AP ------------------------------

    RAISERROR('Register.Accumulation.AP start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.AP.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.AP');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.AP] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.AP');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.AP] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.AP');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.AP') = 0 RETURN;

      INSERT INTO [Register.Accumulation.AP]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [currency], [Department], [AO], [Supplier], [PayDay]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
      , d.[AmountToPay] * IIF(r.kind = 1, 1, -1) [AmountToPay], d.[AmountToPay] * IIF(r.kind = 1, 1, null) [AmountToPay.In], d.[AmountToPay] * IIF(r.kind = 1, null, 1) [AmountToPay.Out]
      , d.[AmountIsPaid] * IIF(r.kind = 1, 1, -1) [AmountIsPaid], d.[AmountIsPaid] * IIF(r.kind = 1, 1, null) [AmountIsPaid.In], d.[AmountIsPaid] * IIF(r.kind = 1, null, 1) [AmountIsPaid.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [AO] UNIQUEIDENTIFIER N'$.AO'
        , [Supplier] UNIQUEIDENTIFIER N'$.Supplier'
        , [PayDay] DATE N'$.PayDay'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [AmountToPay] MONEY N'$.AmountToPay'
        , [AmountIsPaid] MONEY N'$.AmountIsPaid'
        ) AS d
        WHERE r.type = N'Register.Accumulation.AP';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.AP];
    DROP VIEW IF EXISTS [Register.Accumulation.AP];
    DROP VIEW IF EXISTS [Register.Accumulation.AP.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [currency], [Department], [AO], [Supplier], [PayDay]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
      , d.[AmountToPay] * IIF(r.kind = 1, 1, -1) [AmountToPay], d.[AmountToPay] * IIF(r.kind = 1, 1, null) [AmountToPay.In], d.[AmountToPay] * IIF(r.kind = 1, null, 1) [AmountToPay.Out]
      , d.[AmountIsPaid] * IIF(r.kind = 1, 1, -1) [AmountIsPaid], d.[AmountIsPaid] * IIF(r.kind = 1, 1, null) [AmountIsPaid.In], d.[AmountIsPaid] * IIF(r.kind = 1, null, 1) [AmountIsPaid.Out]
    INTO [Register.Accumulation.AP]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [AO] UNIQUEIDENTIFIER N'$.AO'
        , [Supplier] UNIQUEIDENTIFIER N'$.Supplier'
        , [PayDay] DATE N'$.PayDay'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [AmountToPay] MONEY N'$.AmountToPay'
        , [AmountIsPaid] MONEY N'$.AmountIsPaid'
    ) AS d
    WHERE r.type = N'Register.Accumulation.AP';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.AP] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.AP] ADD CONSTRAINT [PK_Register.Accumulation.AP] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.AP] ON [Register.Accumulation.AP];
    RAISERROR('Register.Accumulation.AP finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.AP ------------------------------

------------------------------ BEGIN Register.Accumulation.AR ------------------------------

    RAISERROR('Register.Accumulation.AR start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.AR.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.AR');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.AR] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.AR');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.AR] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.AR');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.AR') = 0 RETURN;

      INSERT INTO [Register.Accumulation.AR]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [currency], [Department], [AO], [Customer], [PayDay]
      , d.[AR] * IIF(r.kind = 1, 1, -1) [AR], d.[AR] * IIF(r.kind = 1, 1, null) [AR.In], d.[AR] * IIF(r.kind = 1, null, 1) [AR.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
      , d.[AmountToPay] * IIF(r.kind = 1, 1, -1) [AmountToPay], d.[AmountToPay] * IIF(r.kind = 1, 1, null) [AmountToPay.In], d.[AmountToPay] * IIF(r.kind = 1, null, 1) [AmountToPay.Out]
      , d.[AmountIsPaid] * IIF(r.kind = 1, 1, -1) [AmountIsPaid], d.[AmountIsPaid] * IIF(r.kind = 1, 1, null) [AmountIsPaid.In], d.[AmountIsPaid] * IIF(r.kind = 1, null, 1) [AmountIsPaid.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [AO] UNIQUEIDENTIFIER N'$.AO'
        , [Customer] UNIQUEIDENTIFIER N'$.Customer'
        , [PayDay] DATE N'$.PayDay'
        , [AR] MONEY N'$.AR'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [AmountToPay] MONEY N'$.AmountToPay'
        , [AmountIsPaid] MONEY N'$.AmountIsPaid'
        ) AS d
        WHERE r.type = N'Register.Accumulation.AR';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.AR];
    DROP VIEW IF EXISTS [Register.Accumulation.AR];
    DROP VIEW IF EXISTS [Register.Accumulation.AR.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [currency], [Department], [AO], [Customer], [PayDay]
      , d.[AR] * IIF(r.kind = 1, 1, -1) [AR], d.[AR] * IIF(r.kind = 1, 1, null) [AR.In], d.[AR] * IIF(r.kind = 1, null, 1) [AR.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
      , d.[AmountToPay] * IIF(r.kind = 1, 1, -1) [AmountToPay], d.[AmountToPay] * IIF(r.kind = 1, 1, null) [AmountToPay.In], d.[AmountToPay] * IIF(r.kind = 1, null, 1) [AmountToPay.Out]
      , d.[AmountIsPaid] * IIF(r.kind = 1, 1, -1) [AmountIsPaid], d.[AmountIsPaid] * IIF(r.kind = 1, 1, null) [AmountIsPaid.In], d.[AmountIsPaid] * IIF(r.kind = 1, null, 1) [AmountIsPaid.Out]
    INTO [Register.Accumulation.AR]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [AO] UNIQUEIDENTIFIER N'$.AO'
        , [Customer] UNIQUEIDENTIFIER N'$.Customer'
        , [PayDay] DATE N'$.PayDay'
        , [AR] MONEY N'$.AR'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [AmountToPay] MONEY N'$.AmountToPay'
        , [AmountIsPaid] MONEY N'$.AmountIsPaid'
    ) AS d
    WHERE r.type = N'Register.Accumulation.AR';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.AR] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.AR] ADD CONSTRAINT [PK_Register.Accumulation.AR] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.AR] ON [Register.Accumulation.AR];
    RAISERROR('Register.Accumulation.AR finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.AR ------------------------------

------------------------------ BEGIN Register.Accumulation.Bank ------------------------------

    RAISERROR('Register.Accumulation.Bank start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Bank.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Bank');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Bank] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Bank');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Bank] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Bank');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Bank') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Bank]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [currency], [BankAccount], [CashFlow], [Analytics]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [BankAccount] UNIQUEIDENTIFIER N'$.BankAccount'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Bank';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Bank];
    DROP VIEW IF EXISTS [Register.Accumulation.Bank];
    DROP VIEW IF EXISTS [Register.Accumulation.Bank.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [currency], [BankAccount], [CashFlow], [Analytics]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
    INTO [Register.Accumulation.Bank]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [BankAccount] UNIQUEIDENTIFIER N'$.BankAccount'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Bank';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Bank] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Bank] ADD CONSTRAINT [PK_Register.Accumulation.Bank] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Bank] ON [Register.Accumulation.Bank];
    RAISERROR('Register.Accumulation.Bank finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Bank ------------------------------

------------------------------ BEGIN Register.Accumulation.Balance ------------------------------

    RAISERROR('Register.Accumulation.Balance start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Balance.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Balance');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Balance] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Balance');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Balance] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Balance');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Balance') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Balance]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [Department], [Balance], [Analytics]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out], [Info]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Balance] UNIQUEIDENTIFIER N'$.Balance'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Amount] MONEY N'$.Amount'
        , [Info] NVARCHAR(250) N'$.Info'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Balance';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Balance];
    DROP VIEW IF EXISTS [Register.Accumulation.Balance];
    DROP VIEW IF EXISTS [Register.Accumulation.Balance.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [Department], [Balance], [Analytics]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out], [Info]
    INTO [Register.Accumulation.Balance]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Balance] UNIQUEIDENTIFIER N'$.Balance'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Amount] MONEY N'$.Amount'
        , [Info] NVARCHAR(250) N'$.Info'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Balance';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Balance] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Balance] ADD CONSTRAINT [PK_Register.Accumulation.Balance] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Balance] ON [Register.Accumulation.Balance];
    RAISERROR('Register.Accumulation.Balance finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Balance ------------------------------

------------------------------ BEGIN Register.Accumulation.Balance.RC ------------------------------

    RAISERROR('Register.Accumulation.Balance.RC start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Balance.RC.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Balance.RC');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Balance.RC] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Balance.RC');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Balance.RC] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Balance.RC');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Balance.RC') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Balance.RC]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [ResponsibilityCenter], [Department], [Balance], [Analytics], [Analytics2], [Currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountRC] * IIF(r.kind = 1, 1, -1) [AmountRC], d.[AmountRC] * IIF(r.kind = 1, 1, null) [AmountRC.In], d.[AmountRC] * IIF(r.kind = 1, null, 1) [AmountRC.Out], [Info]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [ResponsibilityCenter] UNIQUEIDENTIFIER N'$.ResponsibilityCenter'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Balance] UNIQUEIDENTIFIER N'$.Balance'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Analytics2] UNIQUEIDENTIFIER N'$.Analytics2'
        , [Currency] UNIQUEIDENTIFIER N'$.Currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountRC] MONEY N'$.AmountRC'
        , [Info] NVARCHAR(250) N'$.Info'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Balance.RC';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Balance.RC];
    DROP VIEW IF EXISTS [Register.Accumulation.Balance.RC];
    DROP VIEW IF EXISTS [Register.Accumulation.Balance.RC.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [ResponsibilityCenter], [Department], [Balance], [Analytics], [Analytics2], [Currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountRC] * IIF(r.kind = 1, 1, -1) [AmountRC], d.[AmountRC] * IIF(r.kind = 1, 1, null) [AmountRC.In], d.[AmountRC] * IIF(r.kind = 1, null, 1) [AmountRC.Out], [Info]
    INTO [Register.Accumulation.Balance.RC]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [ResponsibilityCenter] UNIQUEIDENTIFIER N'$.ResponsibilityCenter'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Balance] UNIQUEIDENTIFIER N'$.Balance'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Analytics2] UNIQUEIDENTIFIER N'$.Analytics2'
        , [Currency] UNIQUEIDENTIFIER N'$.Currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountRC] MONEY N'$.AmountRC'
        , [Info] NVARCHAR(250) N'$.Info'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Balance.RC';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Balance.RC] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Balance.RC] ADD CONSTRAINT [PK_Register.Accumulation.Balance.RC] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Balance.RC] ON [Register.Accumulation.Balance.RC];
    RAISERROR('Register.Accumulation.Balance.RC finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Balance.RC ------------------------------

------------------------------ BEGIN Register.Accumulation.Balance.Report ------------------------------

    RAISERROR('Register.Accumulation.Balance.Report start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Balance.Report.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Balance.Report');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Balance.Report] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Balance.Report');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Balance.Report] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Balance.Report');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Balance.Report') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Balance.Report]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [currency], [Department], [Balance], [Analytics], [Analytics2], [Analytics3], [Analytics4], [Analytics5]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out], [Info]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Balance] UNIQUEIDENTIFIER N'$.Balance'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Analytics2] UNIQUEIDENTIFIER N'$.Analytics2'
        , [Analytics3] UNIQUEIDENTIFIER N'$.Analytics3'
        , [Analytics4] UNIQUEIDENTIFIER N'$.Analytics4'
        , [Analytics5] UNIQUEIDENTIFIER N'$.Analytics5'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [Info] NVARCHAR(250) N'$.Info'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Balance.Report';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Balance.Report];
    DROP VIEW IF EXISTS [Register.Accumulation.Balance.Report];
    DROP VIEW IF EXISTS [Register.Accumulation.Balance.Report.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [currency], [Department], [Balance], [Analytics], [Analytics2], [Analytics3], [Analytics4], [Analytics5]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out], [Info]
    INTO [Register.Accumulation.Balance.Report]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Balance] UNIQUEIDENTIFIER N'$.Balance'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Analytics2] UNIQUEIDENTIFIER N'$.Analytics2'
        , [Analytics3] UNIQUEIDENTIFIER N'$.Analytics3'
        , [Analytics4] UNIQUEIDENTIFIER N'$.Analytics4'
        , [Analytics5] UNIQUEIDENTIFIER N'$.Analytics5'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [Info] NVARCHAR(250) N'$.Info'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Balance.Report';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Balance.Report] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Balance.Report] ADD CONSTRAINT [PK_Register.Accumulation.Balance.Report] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Balance.Report] ON [Register.Accumulation.Balance.Report];
    RAISERROR('Register.Accumulation.Balance.Report finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Balance.Report ------------------------------

------------------------------ BEGIN Register.Accumulation.Cash ------------------------------

    RAISERROR('Register.Accumulation.Cash start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Cash.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Cash');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Cash] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Cash');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Cash] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Cash');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Cash') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Cash]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [currency], [CashRegister], [CashFlow], [Analytics]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [CashRegister] UNIQUEIDENTIFIER N'$.CashRegister'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Cash';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Cash];
    DROP VIEW IF EXISTS [Register.Accumulation.Cash];
    DROP VIEW IF EXISTS [Register.Accumulation.Cash.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [currency], [CashRegister], [CashFlow], [Analytics]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
    INTO [Register.Accumulation.Cash]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [CashRegister] UNIQUEIDENTIFIER N'$.CashRegister'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Cash';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Cash] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Cash] ADD CONSTRAINT [PK_Register.Accumulation.Cash] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Cash] ON [Register.Accumulation.Cash];
    RAISERROR('Register.Accumulation.Cash finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Cash ------------------------------

------------------------------ BEGIN Register.Accumulation.Cash.Transit ------------------------------

    RAISERROR('Register.Accumulation.Cash.Transit start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Cash.Transit.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Cash.Transit');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Cash.Transit] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Cash.Transit');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Cash.Transit] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Cash.Transit');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Cash.Transit') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Cash.Transit]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [CompanyRecipient], [currency], [Sender], [Recipient], [CashFlow]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [CompanyRecipient] UNIQUEIDENTIFIER N'$.CompanyRecipient'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Sender] UNIQUEIDENTIFIER N'$.Sender'
        , [Recipient] UNIQUEIDENTIFIER N'$.Recipient'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Cash.Transit';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Cash.Transit];
    DROP VIEW IF EXISTS [Register.Accumulation.Cash.Transit];
    DROP VIEW IF EXISTS [Register.Accumulation.Cash.Transit.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [CompanyRecipient], [currency], [Sender], [Recipient], [CashFlow]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
    INTO [Register.Accumulation.Cash.Transit]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [CompanyRecipient] UNIQUEIDENTIFIER N'$.CompanyRecipient'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Sender] UNIQUEIDENTIFIER N'$.Sender'
        , [Recipient] UNIQUEIDENTIFIER N'$.Recipient'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Cash.Transit';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Cash.Transit] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Cash.Transit] ADD CONSTRAINT [PK_Register.Accumulation.Cash.Transit] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Cash.Transit] ON [Register.Accumulation.Cash.Transit];
    RAISERROR('Register.Accumulation.Cash.Transit finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Cash.Transit ------------------------------

------------------------------ BEGIN Register.Accumulation.EmployeeTimekeeping ------------------------------

    RAISERROR('Register.Accumulation.EmployeeTimekeeping start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.EmployeeTimekeeping.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.EmployeeTimekeeping');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.EmployeeTimekeeping] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.EmployeeTimekeeping');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.EmployeeTimekeeping] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.EmployeeTimekeeping');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.EmployeeTimekeeping') = 0 RETURN;

      INSERT INTO [Register.Accumulation.EmployeeTimekeeping]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [isActive], [PeriodMonth], [KindTimekeeping], [Employee], [Person], [StaffingTable]
      , d.[Days] * IIF(r.kind = 1, 1, -1) [Days], d.[Days] * IIF(r.kind = 1, 1, null) [Days.In], d.[Days] * IIF(r.kind = 1, null, 1) [Days.Out]
      , d.[Hours] * IIF(r.kind = 1, 1, -1) [Hours], d.[Hours] * IIF(r.kind = 1, 1, null) [Hours.In], d.[Hours] * IIF(r.kind = 1, null, 1) [Hours.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [isActive] BIT N'$.isActive'
        , [PeriodMonth] DATE N'$.PeriodMonth'
        , [KindTimekeeping] NVARCHAR(250) N'$.KindTimekeeping'
        , [Employee] UNIQUEIDENTIFIER N'$.Employee'
        , [Person] UNIQUEIDENTIFIER N'$.Person'
        , [StaffingTable] UNIQUEIDENTIFIER N'$.StaffingTable'
        , [Days] MONEY N'$.Days'
        , [Hours] MONEY N'$.Hours'
        ) AS d
        WHERE r.type = N'Register.Accumulation.EmployeeTimekeeping';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.EmployeeTimekeeping];
    DROP VIEW IF EXISTS [Register.Accumulation.EmployeeTimekeeping];
    DROP VIEW IF EXISTS [Register.Accumulation.EmployeeTimekeeping.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [isActive], [PeriodMonth], [KindTimekeeping], [Employee], [Person], [StaffingTable]
      , d.[Days] * IIF(r.kind = 1, 1, -1) [Days], d.[Days] * IIF(r.kind = 1, 1, null) [Days.In], d.[Days] * IIF(r.kind = 1, null, 1) [Days.Out]
      , d.[Hours] * IIF(r.kind = 1, 1, -1) [Hours], d.[Hours] * IIF(r.kind = 1, 1, null) [Hours.In], d.[Hours] * IIF(r.kind = 1, null, 1) [Hours.Out]
    INTO [Register.Accumulation.EmployeeTimekeeping]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [isActive] BIT N'$.isActive'
        , [PeriodMonth] DATE N'$.PeriodMonth'
        , [KindTimekeeping] NVARCHAR(250) N'$.KindTimekeeping'
        , [Employee] UNIQUEIDENTIFIER N'$.Employee'
        , [Person] UNIQUEIDENTIFIER N'$.Person'
        , [StaffingTable] UNIQUEIDENTIFIER N'$.StaffingTable'
        , [Days] MONEY N'$.Days'
        , [Hours] MONEY N'$.Hours'
    ) AS d
    WHERE r.type = N'Register.Accumulation.EmployeeTimekeeping';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.EmployeeTimekeeping] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.EmployeeTimekeeping] ADD CONSTRAINT [PK_Register.Accumulation.EmployeeTimekeeping] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.EmployeeTimekeeping] ON [Register.Accumulation.EmployeeTimekeeping];
    RAISERROR('Register.Accumulation.EmployeeTimekeeping finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.EmployeeTimekeeping ------------------------------

------------------------------ BEGIN Register.Accumulation.Inventory ------------------------------

    RAISERROR('Register.Accumulation.Inventory start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Inventory.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Inventory');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Inventory] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Inventory');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Inventory] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Inventory');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Inventory') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Inventory]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [OperationType], [Expense], [ExpenseAnalytics], [ExpenseAnalytics2], [Income], [IncomeAnalytics], [IncomeAnalytics2], [BalanceIn], [BalanceInAnalytics], [BalanceOut], [BalanceOutAnalytics], [Storehouse], [SKU], [batch], [Department]
      , d.[Cost] * IIF(r.kind = 1, 1, -1) [Cost], d.[Cost] * IIF(r.kind = 1, 1, null) [Cost.In], d.[Cost] * IIF(r.kind = 1, null, 1) [Cost.Out]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [OperationType] UNIQUEIDENTIFIER N'$.OperationType'
        , [Expense] UNIQUEIDENTIFIER N'$.Expense'
        , [ExpenseAnalytics] UNIQUEIDENTIFIER N'$.ExpenseAnalytics'
        , [ExpenseAnalytics2] UNIQUEIDENTIFIER N'$.ExpenseAnalytics2'
        , [Income] UNIQUEIDENTIFIER N'$.Income'
        , [IncomeAnalytics] UNIQUEIDENTIFIER N'$.IncomeAnalytics'
        , [IncomeAnalytics2] UNIQUEIDENTIFIER N'$.IncomeAnalytics2'
        , [BalanceIn] UNIQUEIDENTIFIER N'$.BalanceIn'
        , [BalanceInAnalytics] UNIQUEIDENTIFIER N'$.BalanceInAnalytics'
        , [BalanceOut] UNIQUEIDENTIFIER N'$.BalanceOut'
        , [BalanceOutAnalytics] UNIQUEIDENTIFIER N'$.BalanceOutAnalytics'
        , [Storehouse] UNIQUEIDENTIFIER N'$.Storehouse'
        , [SKU] UNIQUEIDENTIFIER N'$.SKU'
        , [batch] UNIQUEIDENTIFIER N'$.batch'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Cost] MONEY N'$.Cost'
        , [Qty] MONEY N'$.Qty'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Inventory';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Inventory];
    DROP VIEW IF EXISTS [Register.Accumulation.Inventory];
    DROP VIEW IF EXISTS [Register.Accumulation.Inventory.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [OperationType], [Expense], [ExpenseAnalytics], [ExpenseAnalytics2], [Income], [IncomeAnalytics], [IncomeAnalytics2], [BalanceIn], [BalanceInAnalytics], [BalanceOut], [BalanceOutAnalytics], [Storehouse], [SKU], [batch], [Department]
      , d.[Cost] * IIF(r.kind = 1, 1, -1) [Cost], d.[Cost] * IIF(r.kind = 1, 1, null) [Cost.In], d.[Cost] * IIF(r.kind = 1, null, 1) [Cost.Out]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out]
    INTO [Register.Accumulation.Inventory]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [OperationType] UNIQUEIDENTIFIER N'$.OperationType'
        , [Expense] UNIQUEIDENTIFIER N'$.Expense'
        , [ExpenseAnalytics] UNIQUEIDENTIFIER N'$.ExpenseAnalytics'
        , [ExpenseAnalytics2] UNIQUEIDENTIFIER N'$.ExpenseAnalytics2'
        , [Income] UNIQUEIDENTIFIER N'$.Income'
        , [IncomeAnalytics] UNIQUEIDENTIFIER N'$.IncomeAnalytics'
        , [IncomeAnalytics2] UNIQUEIDENTIFIER N'$.IncomeAnalytics2'
        , [BalanceIn] UNIQUEIDENTIFIER N'$.BalanceIn'
        , [BalanceInAnalytics] UNIQUEIDENTIFIER N'$.BalanceInAnalytics'
        , [BalanceOut] UNIQUEIDENTIFIER N'$.BalanceOut'
        , [BalanceOutAnalytics] UNIQUEIDENTIFIER N'$.BalanceOutAnalytics'
        , [Storehouse] UNIQUEIDENTIFIER N'$.Storehouse'
        , [SKU] UNIQUEIDENTIFIER N'$.SKU'
        , [batch] UNIQUEIDENTIFIER N'$.batch'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Cost] MONEY N'$.Cost'
        , [Qty] MONEY N'$.Qty'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Inventory';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Inventory] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Inventory] ADD CONSTRAINT [PK_Register.Accumulation.Inventory] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Inventory] ON [Register.Accumulation.Inventory];
    RAISERROR('Register.Accumulation.Inventory finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Inventory ------------------------------

------------------------------ BEGIN Register.Accumulation.Loan ------------------------------

    RAISERROR('Register.Accumulation.Loan start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Loan.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Loan');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Loan] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Loan');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Loan] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Loan');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Loan') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Loan]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [Loan], [Counterpartie], [CashFlow], [currency], [PaymentKind]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
      , d.[AmountToPay] * IIF(r.kind = 1, 1, -1) [AmountToPay], d.[AmountToPay] * IIF(r.kind = 1, 1, null) [AmountToPay.In], d.[AmountToPay] * IIF(r.kind = 1, null, 1) [AmountToPay.Out]
      , d.[AmountIsPaid] * IIF(r.kind = 1, 1, -1) [AmountIsPaid], d.[AmountIsPaid] * IIF(r.kind = 1, 1, null) [AmountIsPaid.In], d.[AmountIsPaid] * IIF(r.kind = 1, null, 1) [AmountIsPaid.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Loan] UNIQUEIDENTIFIER N'$.Loan'
        , [Counterpartie] UNIQUEIDENTIFIER N'$.Counterpartie'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [PaymentKind] NVARCHAR(250) N'$.PaymentKind'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [AmountToPay] MONEY N'$.AmountToPay'
        , [AmountIsPaid] MONEY N'$.AmountIsPaid'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Loan';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Loan];
    DROP VIEW IF EXISTS [Register.Accumulation.Loan];
    DROP VIEW IF EXISTS [Register.Accumulation.Loan.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [Loan], [Counterpartie], [CashFlow], [currency], [PaymentKind]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
      , d.[AmountToPay] * IIF(r.kind = 1, 1, -1) [AmountToPay], d.[AmountToPay] * IIF(r.kind = 1, 1, null) [AmountToPay.In], d.[AmountToPay] * IIF(r.kind = 1, null, 1) [AmountToPay.Out]
      , d.[AmountIsPaid] * IIF(r.kind = 1, 1, -1) [AmountIsPaid], d.[AmountIsPaid] * IIF(r.kind = 1, 1, null) [AmountIsPaid.In], d.[AmountIsPaid] * IIF(r.kind = 1, null, 1) [AmountIsPaid.Out]
    INTO [Register.Accumulation.Loan]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Loan] UNIQUEIDENTIFIER N'$.Loan'
        , [Counterpartie] UNIQUEIDENTIFIER N'$.Counterpartie'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [PaymentKind] NVARCHAR(250) N'$.PaymentKind'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [AmountToPay] MONEY N'$.AmountToPay'
        , [AmountIsPaid] MONEY N'$.AmountIsPaid'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Loan';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Loan] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Loan] ADD CONSTRAINT [PK_Register.Accumulation.Loan] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Loan] ON [Register.Accumulation.Loan];
    RAISERROR('Register.Accumulation.Loan finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Loan ------------------------------

------------------------------ BEGIN Register.Accumulation.PL ------------------------------

    RAISERROR('Register.Accumulation.PL start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.PL.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.PL');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.PL] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.PL');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.PL] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.PL');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.PL') = 0 RETURN;

      INSERT INTO [Register.Accumulation.PL]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [RetailNetwork], [Department], [PL], [Analytics], [Analytics2]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out], [Info]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [RetailNetwork] UNIQUEIDENTIFIER N'$.RetailNetwork'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [PL] UNIQUEIDENTIFIER N'$.PL'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Analytics2] UNIQUEIDENTIFIER N'$.Analytics2'
        , [Amount] MONEY N'$.Amount'
        , [Info] NVARCHAR(250) N'$.Info'
        ) AS d
        WHERE r.type = N'Register.Accumulation.PL';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.PL];
    DROP VIEW IF EXISTS [Register.Accumulation.PL];
    DROP VIEW IF EXISTS [Register.Accumulation.PL.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [RetailNetwork], [Department], [PL], [Analytics], [Analytics2]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out], [Info]
    INTO [Register.Accumulation.PL]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [RetailNetwork] UNIQUEIDENTIFIER N'$.RetailNetwork'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [PL] UNIQUEIDENTIFIER N'$.PL'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Analytics2] UNIQUEIDENTIFIER N'$.Analytics2'
        , [Amount] MONEY N'$.Amount'
        , [Info] NVARCHAR(250) N'$.Info'
    ) AS d
    WHERE r.type = N'Register.Accumulation.PL';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.PL] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.PL] ADD CONSTRAINT [PK_Register.Accumulation.PL] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.PL] ON [Register.Accumulation.PL];
    RAISERROR('Register.Accumulation.PL finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.PL ------------------------------

------------------------------ BEGIN Register.Accumulation.PL.RC ------------------------------

    RAISERROR('Register.Accumulation.PL.RC start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.PL.RC.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.PL.RC');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.PL.RC] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.PL.RC');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.PL.RC] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.PL.RC');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.PL.RC') = 0 RETURN;

      INSERT INTO [Register.Accumulation.PL.RC]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [ResponsibilityCenter], [Department], [PL], [Analytics], [Analytics2], [Currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountRC] * IIF(r.kind = 1, 1, -1) [AmountRC], d.[AmountRC] * IIF(r.kind = 1, 1, null) [AmountRC.In], d.[AmountRC] * IIF(r.kind = 1, null, 1) [AmountRC.Out], [Info]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [ResponsibilityCenter] UNIQUEIDENTIFIER N'$.ResponsibilityCenter'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [PL] UNIQUEIDENTIFIER N'$.PL'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Analytics2] UNIQUEIDENTIFIER N'$.Analytics2'
        , [Currency] UNIQUEIDENTIFIER N'$.Currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountRC] MONEY N'$.AmountRC'
        , [Info] NVARCHAR(250) N'$.Info'
        ) AS d
        WHERE r.type = N'Register.Accumulation.PL.RC';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.PL.RC];
    DROP VIEW IF EXISTS [Register.Accumulation.PL.RC];
    DROP VIEW IF EXISTS [Register.Accumulation.PL.RC.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [ResponsibilityCenter], [Department], [PL], [Analytics], [Analytics2], [Currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountRC] * IIF(r.kind = 1, 1, -1) [AmountRC], d.[AmountRC] * IIF(r.kind = 1, 1, null) [AmountRC.In], d.[AmountRC] * IIF(r.kind = 1, null, 1) [AmountRC.Out], [Info]
    INTO [Register.Accumulation.PL.RC]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [ResponsibilityCenter] UNIQUEIDENTIFIER N'$.ResponsibilityCenter'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [PL] UNIQUEIDENTIFIER N'$.PL'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [Analytics2] UNIQUEIDENTIFIER N'$.Analytics2'
        , [Currency] UNIQUEIDENTIFIER N'$.Currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountRC] MONEY N'$.AmountRC'
        , [Info] NVARCHAR(250) N'$.Info'
    ) AS d
    WHERE r.type = N'Register.Accumulation.PL.RC';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.PL.RC] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.PL.RC] ADD CONSTRAINT [PK_Register.Accumulation.PL.RC] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.PL.RC] ON [Register.Accumulation.PL.RC];
    RAISERROR('Register.Accumulation.PL.RC finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.PL.RC ------------------------------

------------------------------ BEGIN Register.Accumulation.Sales ------------------------------

    RAISERROR('Register.Accumulation.Sales start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Sales.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Sales');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Sales] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Sales');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Sales] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Sales');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Sales') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Sales]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [currency], [RetailNetwork], [Department], [Customer], [Aggregator], [Product], [Analytic], [Manager], [DeliveryType], [OrderSource], [ParentOrderSource], [RetailClient], [AO], [Storehouse]
      , d.[DeliverArea] * IIF(r.kind = 1, 1, -1) [DeliverArea], d.[DeliverArea] * IIF(r.kind = 1, 1, null) [DeliverArea.In], d.[DeliverArea] * IIF(r.kind = 1, null, 1) [DeliverArea.Out], [Courier], [OpenTime], [PrintTime], [DeliverTime], [BillTime], [CloseTime]
      , d.[CashShift] * IIF(r.kind = 1, 1, -1) [CashShift], d.[CashShift] * IIF(r.kind = 1, 1, null) [CashShift.In], d.[CashShift] * IIF(r.kind = 1, null, 1) [CashShift.Out]
      , d.[Cost] * IIF(r.kind = 1, 1, -1) [Cost], d.[Cost] * IIF(r.kind = 1, 1, null) [Cost.In], d.[Cost] * IIF(r.kind = 1, null, 1) [Cost.Out]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[Discount] * IIF(r.kind = 1, 1, -1) [Discount], d.[Discount] * IIF(r.kind = 1, 1, null) [Discount.In], d.[Discount] * IIF(r.kind = 1, null, 1) [Discount.Out]
      , d.[Tax] * IIF(r.kind = 1, 1, -1) [Tax], d.[Tax] * IIF(r.kind = 1, 1, null) [Tax.In], d.[Tax] * IIF(r.kind = 1, null, 1) [Tax.Out]
      , d.[AmountInDoc] * IIF(r.kind = 1, 1, -1) [AmountInDoc], d.[AmountInDoc] * IIF(r.kind = 1, 1, null) [AmountInDoc.In], d.[AmountInDoc] * IIF(r.kind = 1, null, 1) [AmountInDoc.Out]
      , d.[AmountInAR] * IIF(r.kind = 1, 1, -1) [AmountInAR], d.[AmountInAR] * IIF(r.kind = 1, 1, null) [AmountInAR.In], d.[AmountInAR] * IIF(r.kind = 1, null, 1) [AmountInAR.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [RetailNetwork] UNIQUEIDENTIFIER N'$.RetailNetwork'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Customer] UNIQUEIDENTIFIER N'$.Customer'
        , [Aggregator] UNIQUEIDENTIFIER N'$.Aggregator'
        , [Product] UNIQUEIDENTIFIER N'$.Product'
        , [Analytic] UNIQUEIDENTIFIER N'$.Analytic'
        , [Manager] UNIQUEIDENTIFIER N'$.Manager'
        , [DeliveryType] NVARCHAR(250) N'$.DeliveryType'
        , [OrderSource] NVARCHAR(250) N'$.OrderSource'
        , [ParentOrderSource] UNIQUEIDENTIFIER N'$.ParentOrderSource'
        , [RetailClient] UNIQUEIDENTIFIER N'$.RetailClient'
        , [AO] UNIQUEIDENTIFIER N'$.AO'
        , [Storehouse] UNIQUEIDENTIFIER N'$.Storehouse'
        , [DeliverArea] MONEY N'$.DeliverArea'
        , [Courier] UNIQUEIDENTIFIER N'$.Courier'
        , [OpenTime] DATETIME N'$.OpenTime'
        , [PrintTime] DATETIME N'$.PrintTime'
        , [DeliverTime] DATETIME N'$.DeliverTime'
        , [BillTime] DATETIME N'$.BillTime'
        , [CloseTime] DATETIME N'$.CloseTime'
        , [CashShift] MONEY N'$.CashShift'
        , [Cost] MONEY N'$.Cost'
        , [Qty] MONEY N'$.Qty'
        , [Amount] MONEY N'$.Amount'
        , [Discount] MONEY N'$.Discount'
        , [Tax] MONEY N'$.Tax'
        , [AmountInDoc] MONEY N'$.AmountInDoc'
        , [AmountInAR] MONEY N'$.AmountInAR'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Sales';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Sales];
    DROP VIEW IF EXISTS [Register.Accumulation.Sales];
    DROP VIEW IF EXISTS [Register.Accumulation.Sales.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [currency], [RetailNetwork], [Department], [Customer], [Aggregator], [Product], [Analytic], [Manager], [DeliveryType], [OrderSource], [ParentOrderSource], [RetailClient], [AO], [Storehouse]
      , d.[DeliverArea] * IIF(r.kind = 1, 1, -1) [DeliverArea], d.[DeliverArea] * IIF(r.kind = 1, 1, null) [DeliverArea.In], d.[DeliverArea] * IIF(r.kind = 1, null, 1) [DeliverArea.Out], [Courier], [OpenTime], [PrintTime], [DeliverTime], [BillTime], [CloseTime]
      , d.[CashShift] * IIF(r.kind = 1, 1, -1) [CashShift], d.[CashShift] * IIF(r.kind = 1, 1, null) [CashShift.In], d.[CashShift] * IIF(r.kind = 1, null, 1) [CashShift.Out]
      , d.[Cost] * IIF(r.kind = 1, 1, -1) [Cost], d.[Cost] * IIF(r.kind = 1, 1, null) [Cost.In], d.[Cost] * IIF(r.kind = 1, null, 1) [Cost.Out]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[Discount] * IIF(r.kind = 1, 1, -1) [Discount], d.[Discount] * IIF(r.kind = 1, 1, null) [Discount.In], d.[Discount] * IIF(r.kind = 1, null, 1) [Discount.Out]
      , d.[Tax] * IIF(r.kind = 1, 1, -1) [Tax], d.[Tax] * IIF(r.kind = 1, 1, null) [Tax.In], d.[Tax] * IIF(r.kind = 1, null, 1) [Tax.Out]
      , d.[AmountInDoc] * IIF(r.kind = 1, 1, -1) [AmountInDoc], d.[AmountInDoc] * IIF(r.kind = 1, 1, null) [AmountInDoc.In], d.[AmountInDoc] * IIF(r.kind = 1, null, 1) [AmountInDoc.Out]
      , d.[AmountInAR] * IIF(r.kind = 1, 1, -1) [AmountInAR], d.[AmountInAR] * IIF(r.kind = 1, 1, null) [AmountInAR.In], d.[AmountInAR] * IIF(r.kind = 1, null, 1) [AmountInAR.Out]
    INTO [Register.Accumulation.Sales]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [RetailNetwork] UNIQUEIDENTIFIER N'$.RetailNetwork'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Customer] UNIQUEIDENTIFIER N'$.Customer'
        , [Aggregator] UNIQUEIDENTIFIER N'$.Aggregator'
        , [Product] UNIQUEIDENTIFIER N'$.Product'
        , [Analytic] UNIQUEIDENTIFIER N'$.Analytic'
        , [Manager] UNIQUEIDENTIFIER N'$.Manager'
        , [DeliveryType] NVARCHAR(250) N'$.DeliveryType'
        , [OrderSource] NVARCHAR(250) N'$.OrderSource'
        , [ParentOrderSource] UNIQUEIDENTIFIER N'$.ParentOrderSource'
        , [RetailClient] UNIQUEIDENTIFIER N'$.RetailClient'
        , [AO] UNIQUEIDENTIFIER N'$.AO'
        , [Storehouse] UNIQUEIDENTIFIER N'$.Storehouse'
        , [DeliverArea] MONEY N'$.DeliverArea'
        , [Courier] UNIQUEIDENTIFIER N'$.Courier'
        , [OpenTime] DATETIME N'$.OpenTime'
        , [PrintTime] DATETIME N'$.PrintTime'
        , [DeliverTime] DATETIME N'$.DeliverTime'
        , [BillTime] DATETIME N'$.BillTime'
        , [CloseTime] DATETIME N'$.CloseTime'
        , [CashShift] MONEY N'$.CashShift'
        , [Cost] MONEY N'$.Cost'
        , [Qty] MONEY N'$.Qty'
        , [Amount] MONEY N'$.Amount'
        , [Discount] MONEY N'$.Discount'
        , [Tax] MONEY N'$.Tax'
        , [AmountInDoc] MONEY N'$.AmountInDoc'
        , [AmountInAR] MONEY N'$.AmountInAR'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Sales';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Sales] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Sales] ADD CONSTRAINT [PK_Register.Accumulation.Sales] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Sales] ON [Register.Accumulation.Sales];
    RAISERROR('Register.Accumulation.Sales finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Sales ------------------------------

------------------------------ BEGIN Register.Accumulation.Salary ------------------------------

    RAISERROR('Register.Accumulation.Salary start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Salary.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Salary');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Salary] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Salary');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Salary] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Salary');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Salary') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Salary]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [currency], [KorrCompany], [Department], [Person], [Employee], [SalaryKind], [Analytics], [PL], [PLAnalytics], [Status], [IsPortal]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [KorrCompany] UNIQUEIDENTIFIER N'$.KorrCompany'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Person] UNIQUEIDENTIFIER N'$.Person'
        , [Employee] UNIQUEIDENTIFIER N'$.Employee'
        , [SalaryKind] NVARCHAR(250) N'$.SalaryKind'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [PL] UNIQUEIDENTIFIER N'$.PL'
        , [PLAnalytics] UNIQUEIDENTIFIER N'$.PLAnalytics'
        , [Status] NVARCHAR(250) N'$.Status'
        , [IsPortal] BIT N'$.IsPortal'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Salary';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Salary];
    DROP VIEW IF EXISTS [Register.Accumulation.Salary];
    DROP VIEW IF EXISTS [Register.Accumulation.Salary.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [currency], [KorrCompany], [Department], [Person], [Employee], [SalaryKind], [Analytics], [PL], [PLAnalytics], [Status], [IsPortal]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
    INTO [Register.Accumulation.Salary]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [KorrCompany] UNIQUEIDENTIFIER N'$.KorrCompany'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Person] UNIQUEIDENTIFIER N'$.Person'
        , [Employee] UNIQUEIDENTIFIER N'$.Employee'
        , [SalaryKind] NVARCHAR(250) N'$.SalaryKind'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [PL] UNIQUEIDENTIFIER N'$.PL'
        , [PLAnalytics] UNIQUEIDENTIFIER N'$.PLAnalytics'
        , [Status] NVARCHAR(250) N'$.Status'
        , [IsPortal] BIT N'$.IsPortal'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Salary';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Salary] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Salary] ADD CONSTRAINT [PK_Register.Accumulation.Salary] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Salary] ON [Register.Accumulation.Salary];
    RAISERROR('Register.Accumulation.Salary finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Salary ------------------------------

------------------------------ BEGIN Register.Accumulation.Depreciation ------------------------------

    RAISERROR('Register.Accumulation.Depreciation start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Depreciation.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Depreciation');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Depreciation] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Depreciation');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Depreciation] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Depreciation');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Depreciation') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Depreciation]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [OperationType], [currency], [Department], [ResponsiblePerson], [OE]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [OperationType] UNIQUEIDENTIFIER N'$.OperationType'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [ResponsiblePerson] UNIQUEIDENTIFIER N'$.ResponsiblePerson'
        , [OE] UNIQUEIDENTIFIER N'$.OE'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Depreciation';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Depreciation];
    DROP VIEW IF EXISTS [Register.Accumulation.Depreciation];
    DROP VIEW IF EXISTS [Register.Accumulation.Depreciation.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [OperationType], [currency], [Department], [ResponsiblePerson], [OE]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
    INTO [Register.Accumulation.Depreciation]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [OperationType] UNIQUEIDENTIFIER N'$.OperationType'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [ResponsiblePerson] UNIQUEIDENTIFIER N'$.ResponsiblePerson'
        , [OE] UNIQUEIDENTIFIER N'$.OE'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Depreciation';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Depreciation] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Depreciation] ADD CONSTRAINT [PK_Register.Accumulation.Depreciation] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Depreciation] ON [Register.Accumulation.Depreciation];
    RAISERROR('Register.Accumulation.Depreciation finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Depreciation ------------------------------

------------------------------ BEGIN Register.Accumulation.CashToPay ------------------------------

    RAISERROR('Register.Accumulation.CashToPay start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.CashToPay.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.CashToPay');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.CashToPay] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.CashToPay');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.CashToPay] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.CashToPay');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.CashToPay') = 0 RETURN;

      INSERT INTO [Register.Accumulation.CashToPay]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [currency], [CashFlow], [Status], [CashRequest], [Contract], [BankAccountPerson], [Department], [OperationType], [Loan], [CashOrBank], [CashRecipient], [ExpenseOrBalance], [ExpenseAnalytics], [BalanceAnalytics], [PayDay]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [Status] NVARCHAR(250) N'$.Status'
        , [CashRequest] UNIQUEIDENTIFIER N'$.CashRequest'
        , [Contract] UNIQUEIDENTIFIER N'$.Contract'
        , [BankAccountPerson] UNIQUEIDENTIFIER N'$.BankAccountPerson'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [OperationType] NVARCHAR(250) N'$.OperationType'
        , [Loan] UNIQUEIDENTIFIER N'$.Loan'
        , [CashOrBank] UNIQUEIDENTIFIER N'$.CashOrBank'
        , [CashRecipient] UNIQUEIDENTIFIER N'$.CashRecipient'
        , [ExpenseOrBalance] UNIQUEIDENTIFIER N'$.ExpenseOrBalance'
        , [ExpenseAnalytics] UNIQUEIDENTIFIER N'$.ExpenseAnalytics'
        , [BalanceAnalytics] UNIQUEIDENTIFIER N'$.BalanceAnalytics'
        , [PayDay] DATE N'$.PayDay'
        , [Amount] MONEY N'$.Amount'
        ) AS d
        WHERE r.type = N'Register.Accumulation.CashToPay';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.CashToPay];
    DROP VIEW IF EXISTS [Register.Accumulation.CashToPay];
    DROP VIEW IF EXISTS [Register.Accumulation.CashToPay.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [currency], [CashFlow], [Status], [CashRequest], [Contract], [BankAccountPerson], [Department], [OperationType], [Loan], [CashOrBank], [CashRecipient], [ExpenseOrBalance], [ExpenseAnalytics], [BalanceAnalytics], [PayDay]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
    INTO [Register.Accumulation.CashToPay]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [Status] NVARCHAR(250) N'$.Status'
        , [CashRequest] UNIQUEIDENTIFIER N'$.CashRequest'
        , [Contract] UNIQUEIDENTIFIER N'$.Contract'
        , [BankAccountPerson] UNIQUEIDENTIFIER N'$.BankAccountPerson'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [OperationType] NVARCHAR(250) N'$.OperationType'
        , [Loan] UNIQUEIDENTIFIER N'$.Loan'
        , [CashOrBank] UNIQUEIDENTIFIER N'$.CashOrBank'
        , [CashRecipient] UNIQUEIDENTIFIER N'$.CashRecipient'
        , [ExpenseOrBalance] UNIQUEIDENTIFIER N'$.ExpenseOrBalance'
        , [ExpenseAnalytics] UNIQUEIDENTIFIER N'$.ExpenseAnalytics'
        , [BalanceAnalytics] UNIQUEIDENTIFIER N'$.BalanceAnalytics'
        , [PayDay] DATE N'$.PayDay'
        , [Amount] MONEY N'$.Amount'
    ) AS d
    WHERE r.type = N'Register.Accumulation.CashToPay';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.CashToPay] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.CashToPay] ADD CONSTRAINT [PK_Register.Accumulation.CashToPay] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.CashToPay] ON [Register.Accumulation.CashToPay];
    RAISERROR('Register.Accumulation.CashToPay finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.CashToPay ------------------------------

------------------------------ BEGIN Register.Accumulation.CharityAnalytic ------------------------------

    RAISERROR('Register.Accumulation.CharityAnalytic start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.CharityAnalytic.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.CharityAnalytic');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.CharityAnalytic] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.CharityAnalytic');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.CharityAnalytic] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.CharityAnalytic');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.CharityAnalytic') = 0 RETURN;

      INSERT INTO [Register.Accumulation.CharityAnalytic]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [Analytics], [MovementType], [Creator], [CreatorContract], [Recipient], [RecipientContract], [Batch], [Source], [currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out], [Info]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [MovementType] UNIQUEIDENTIFIER N'$.MovementType'
        , [Creator] UNIQUEIDENTIFIER N'$.Creator'
        , [CreatorContract] UNIQUEIDENTIFIER N'$.CreatorContract'
        , [Recipient] UNIQUEIDENTIFIER N'$.Recipient'
        , [RecipientContract] UNIQUEIDENTIFIER N'$.RecipientContract'
        , [Batch] UNIQUEIDENTIFIER N'$.Batch'
        , [Source] UNIQUEIDENTIFIER N'$.Source'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [Info] NVARCHAR(250) N'$.Info'
        ) AS d
        WHERE r.type = N'Register.Accumulation.CharityAnalytic';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.CharityAnalytic];
    DROP VIEW IF EXISTS [Register.Accumulation.CharityAnalytic];
    DROP VIEW IF EXISTS [Register.Accumulation.CharityAnalytic.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [Analytics], [MovementType], [Creator], [CreatorContract], [Recipient], [RecipientContract], [Batch], [Source], [currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out], [Info]
    INTO [Register.Accumulation.CharityAnalytic]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [MovementType] UNIQUEIDENTIFIER N'$.MovementType'
        , [Creator] UNIQUEIDENTIFIER N'$.Creator'
        , [CreatorContract] UNIQUEIDENTIFIER N'$.CreatorContract'
        , [Recipient] UNIQUEIDENTIFIER N'$.Recipient'
        , [RecipientContract] UNIQUEIDENTIFIER N'$.RecipientContract'
        , [Batch] UNIQUEIDENTIFIER N'$.Batch'
        , [Source] UNIQUEIDENTIFIER N'$.Source'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [Info] NVARCHAR(250) N'$.Info'
    ) AS d
    WHERE r.type = N'Register.Accumulation.CharityAnalytic';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.CharityAnalytic] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.CharityAnalytic] ADD CONSTRAINT [PK_Register.Accumulation.CharityAnalytic] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.CharityAnalytic] ON [Register.Accumulation.CharityAnalytic];
    RAISERROR('Register.Accumulation.CharityAnalytic finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.CharityAnalytic ------------------------------

------------------------------ BEGIN Register.Accumulation.BudgetItemTurnover ------------------------------

    RAISERROR('Register.Accumulation.BudgetItemTurnover start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.BudgetItemTurnover.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.BudgetItemTurnover');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.BudgetItemTurnover] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.BudgetItemTurnover');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.BudgetItemTurnover] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.BudgetItemTurnover');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.BudgetItemTurnover') = 0 RETURN;

      INSERT INTO [Register.Accumulation.BudgetItemTurnover]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [Department], [Scenario], [BudgetItem], [Anatitic1], [Anatitic2], [Anatitic3], [Anatitic4], [Anatitic5], [currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInScenatio] * IIF(r.kind = 1, 1, -1) [AmountInScenatio], d.[AmountInScenatio] * IIF(r.kind = 1, 1, null) [AmountInScenatio.In], d.[AmountInScenatio] * IIF(r.kind = 1, null, 1) [AmountInScenatio.Out]
      , d.[AmountInCurrency] * IIF(r.kind = 1, 1, -1) [AmountInCurrency], d.[AmountInCurrency] * IIF(r.kind = 1, 1, null) [AmountInCurrency.In], d.[AmountInCurrency] * IIF(r.kind = 1, null, 1) [AmountInCurrency.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Scenario] UNIQUEIDENTIFIER N'$.Scenario'
        , [BudgetItem] UNIQUEIDENTIFIER N'$.BudgetItem'
        , [Anatitic1] UNIQUEIDENTIFIER N'$.Anatitic1'
        , [Anatitic2] UNIQUEIDENTIFIER N'$.Anatitic2'
        , [Anatitic3] UNIQUEIDENTIFIER N'$.Anatitic3'
        , [Anatitic4] UNIQUEIDENTIFIER N'$.Anatitic4'
        , [Anatitic5] UNIQUEIDENTIFIER N'$.Anatitic5'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountInScenatio] MONEY N'$.AmountInScenatio'
        , [AmountInCurrency] MONEY N'$.AmountInCurrency'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [Qty] MONEY N'$.Qty'
        ) AS d
        WHERE r.type = N'Register.Accumulation.BudgetItemTurnover';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.BudgetItemTurnover];
    DROP VIEW IF EXISTS [Register.Accumulation.BudgetItemTurnover];
    DROP VIEW IF EXISTS [Register.Accumulation.BudgetItemTurnover.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [Department], [Scenario], [BudgetItem], [Anatitic1], [Anatitic2], [Anatitic3], [Anatitic4], [Anatitic5], [currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInScenatio] * IIF(r.kind = 1, 1, -1) [AmountInScenatio], d.[AmountInScenatio] * IIF(r.kind = 1, 1, null) [AmountInScenatio.In], d.[AmountInScenatio] * IIF(r.kind = 1, null, 1) [AmountInScenatio.Out]
      , d.[AmountInCurrency] * IIF(r.kind = 1, 1, -1) [AmountInCurrency], d.[AmountInCurrency] * IIF(r.kind = 1, 1, null) [AmountInCurrency.In], d.[AmountInCurrency] * IIF(r.kind = 1, null, 1) [AmountInCurrency.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out]
    INTO [Register.Accumulation.BudgetItemTurnover]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [Scenario] UNIQUEIDENTIFIER N'$.Scenario'
        , [BudgetItem] UNIQUEIDENTIFIER N'$.BudgetItem'
        , [Anatitic1] UNIQUEIDENTIFIER N'$.Anatitic1'
        , [Anatitic2] UNIQUEIDENTIFIER N'$.Anatitic2'
        , [Anatitic3] UNIQUEIDENTIFIER N'$.Anatitic3'
        , [Anatitic4] UNIQUEIDENTIFIER N'$.Anatitic4'
        , [Anatitic5] UNIQUEIDENTIFIER N'$.Anatitic5'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountInScenatio] MONEY N'$.AmountInScenatio'
        , [AmountInCurrency] MONEY N'$.AmountInCurrency'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        , [Qty] MONEY N'$.Qty'
    ) AS d
    WHERE r.type = N'Register.Accumulation.BudgetItemTurnover';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.BudgetItemTurnover] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.BudgetItemTurnover] ADD CONSTRAINT [PK_Register.Accumulation.BudgetItemTurnover] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.BudgetItemTurnover] ON [Register.Accumulation.BudgetItemTurnover];
    RAISERROR('Register.Accumulation.BudgetItemTurnover finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.BudgetItemTurnover ------------------------------

------------------------------ BEGIN Register.Accumulation.Intercompany ------------------------------

    RAISERROR('Register.Accumulation.Intercompany start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Intercompany.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Intercompany');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Intercompany] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Intercompany');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Intercompany] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Intercompany');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Intercompany') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Intercompany]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [Intercompany], [LegalCompanySender], [LegalCompanyRecipient], [Contract], [OperationType], [Analytics], [currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Intercompany] UNIQUEIDENTIFIER N'$.Intercompany'
        , [LegalCompanySender] UNIQUEIDENTIFIER N'$.LegalCompanySender'
        , [LegalCompanyRecipient] UNIQUEIDENTIFIER N'$.LegalCompanyRecipient'
        , [Contract] UNIQUEIDENTIFIER N'$.Contract'
        , [OperationType] UNIQUEIDENTIFIER N'$.OperationType'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Intercompany';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Intercompany];
    DROP VIEW IF EXISTS [Register.Accumulation.Intercompany];
    DROP VIEW IF EXISTS [Register.Accumulation.Intercompany.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [Intercompany], [LegalCompanySender], [LegalCompanyRecipient], [Contract], [OperationType], [Analytics], [currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
    INTO [Register.Accumulation.Intercompany]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Intercompany] UNIQUEIDENTIFIER N'$.Intercompany'
        , [LegalCompanySender] UNIQUEIDENTIFIER N'$.LegalCompanySender'
        , [LegalCompanyRecipient] UNIQUEIDENTIFIER N'$.LegalCompanyRecipient'
        , [Contract] UNIQUEIDENTIFIER N'$.Contract'
        , [OperationType] UNIQUEIDENTIFIER N'$.OperationType'
        , [Analytics] UNIQUEIDENTIFIER N'$.Analytics'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Intercompany';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Intercompany] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Intercompany] ADD CONSTRAINT [PK_Register.Accumulation.Intercompany] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Intercompany] ON [Register.Accumulation.Intercompany];
    RAISERROR('Register.Accumulation.Intercompany finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Intercompany ------------------------------

------------------------------ BEGIN Register.Accumulation.Acquiring ------------------------------

    RAISERROR('Register.Accumulation.Acquiring start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.Acquiring.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.Acquiring');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.Acquiring] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Acquiring');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.Acquiring] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.Acquiring');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.Acquiring') = 0 RETURN;

      INSERT INTO [Register.Accumulation.Acquiring]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [AcquiringTerminal], [AcquiringTerminalCode1], [OperationType], [Department], [CashFlow], [PaymantCard], [PayDay], [currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountOperation] * IIF(r.kind = 1, 1, -1) [AmountOperation], d.[AmountOperation] * IIF(r.kind = 1, 1, null) [AmountOperation.In], d.[AmountOperation] * IIF(r.kind = 1, null, 1) [AmountOperation.Out]
      , d.[AmountPaid] * IIF(r.kind = 1, 1, -1) [AmountPaid], d.[AmountPaid] * IIF(r.kind = 1, 1, null) [AmountPaid.In], d.[AmountPaid] * IIF(r.kind = 1, null, 1) [AmountPaid.Out], [DateOperation], [DatePaid], [AuthorizationCode]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [AcquiringTerminal] UNIQUEIDENTIFIER N'$.AcquiringTerminal'
        , [AcquiringTerminalCode1] NVARCHAR(250) N'$.AcquiringTerminalCode1'
        , [OperationType] UNIQUEIDENTIFIER N'$.OperationType'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [PaymantCard] NVARCHAR(250) N'$.PaymantCard'
        , [PayDay] DATE N'$.PayDay'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountOperation] MONEY N'$.AmountOperation'
        , [AmountPaid] MONEY N'$.AmountPaid'
        , [DateOperation] DATE N'$.DateOperation'
        , [DatePaid] DATE N'$.DatePaid'
        , [AuthorizationCode] NVARCHAR(250) N'$.AuthorizationCode'
        ) AS d
        WHERE r.type = N'Register.Accumulation.Acquiring';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.Acquiring];
    DROP VIEW IF EXISTS [Register.Accumulation.Acquiring];
    DROP VIEW IF EXISTS [Register.Accumulation.Acquiring.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [AcquiringTerminal], [AcquiringTerminalCode1], [OperationType], [Department], [CashFlow], [PaymantCard], [PayDay], [currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountOperation] * IIF(r.kind = 1, 1, -1) [AmountOperation], d.[AmountOperation] * IIF(r.kind = 1, 1, null) [AmountOperation.In], d.[AmountOperation] * IIF(r.kind = 1, null, 1) [AmountOperation.Out]
      , d.[AmountPaid] * IIF(r.kind = 1, 1, -1) [AmountPaid], d.[AmountPaid] * IIF(r.kind = 1, 1, null) [AmountPaid.In], d.[AmountPaid] * IIF(r.kind = 1, null, 1) [AmountPaid.Out], [DateOperation], [DatePaid], [AuthorizationCode]
    INTO [Register.Accumulation.Acquiring]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [AcquiringTerminal] UNIQUEIDENTIFIER N'$.AcquiringTerminal'
        , [AcquiringTerminalCode1] NVARCHAR(250) N'$.AcquiringTerminalCode1'
        , [OperationType] UNIQUEIDENTIFIER N'$.OperationType'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [CashFlow] UNIQUEIDENTIFIER N'$.CashFlow'
        , [PaymantCard] NVARCHAR(250) N'$.PaymantCard'
        , [PayDay] DATE N'$.PayDay'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountOperation] MONEY N'$.AmountOperation'
        , [AmountPaid] MONEY N'$.AmountPaid'
        , [DateOperation] DATE N'$.DateOperation'
        , [DatePaid] DATE N'$.DatePaid'
        , [AuthorizationCode] NVARCHAR(250) N'$.AuthorizationCode'
    ) AS d
    WHERE r.type = N'Register.Accumulation.Acquiring';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.Acquiring] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.Acquiring] ADD CONSTRAINT [PK_Register.Accumulation.Acquiring] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.Acquiring] ON [Register.Accumulation.Acquiring];
    RAISERROR('Register.Accumulation.Acquiring finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.Acquiring ------------------------------

------------------------------ BEGIN Register.Accumulation.PromotionPoints ------------------------------

    RAISERROR('Register.Accumulation.PromotionPoints start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.PromotionPoints.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.PromotionPoints');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.PromotionPoints] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.PromotionPoints');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.PromotionPoints] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.PromotionPoints');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.PromotionPoints') = 0 RETURN;

      INSERT INTO [Register.Accumulation.PromotionPoints]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [RetailNetwork], [Department], [OrderId], [OwnerInner], [OwnerExternal], [PromotionChannel], [currency], [batch], [ExpiredAt]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [RetailNetwork] UNIQUEIDENTIFIER N'$.RetailNetwork'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [OrderId] NVARCHAR(250) N'$.OrderId'
        , [OwnerInner] UNIQUEIDENTIFIER N'$.OwnerInner'
        , [OwnerExternal] NVARCHAR(250) N'$.OwnerExternal'
        , [PromotionChannel] UNIQUEIDENTIFIER N'$.PromotionChannel'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [batch] UNIQUEIDENTIFIER N'$.batch'
        , [ExpiredAt] DATE N'$.ExpiredAt'
        , [Qty] MONEY N'$.Qty'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        ) AS d
        WHERE r.type = N'Register.Accumulation.PromotionPoints';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.PromotionPoints];
    DROP VIEW IF EXISTS [Register.Accumulation.PromotionPoints];
    DROP VIEW IF EXISTS [Register.Accumulation.PromotionPoints.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [RetailNetwork], [Department], [OrderId], [OwnerInner], [OwnerExternal], [PromotionChannel], [currency], [batch], [ExpiredAt]
      , d.[Qty] * IIF(r.kind = 1, 1, -1) [Qty], d.[Qty] * IIF(r.kind = 1, 1, null) [Qty.In], d.[Qty] * IIF(r.kind = 1, null, 1) [Qty.Out]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
    INTO [Register.Accumulation.PromotionPoints]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [RetailNetwork] UNIQUEIDENTIFIER N'$.RetailNetwork'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [OrderId] NVARCHAR(250) N'$.OrderId'
        , [OwnerInner] UNIQUEIDENTIFIER N'$.OwnerInner'
        , [OwnerExternal] NVARCHAR(250) N'$.OwnerExternal'
        , [PromotionChannel] UNIQUEIDENTIFIER N'$.PromotionChannel'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [batch] UNIQUEIDENTIFIER N'$.batch'
        , [ExpiredAt] DATE N'$.ExpiredAt'
        , [Qty] MONEY N'$.Qty'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
    ) AS d
    WHERE r.type = N'Register.Accumulation.PromotionPoints';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.PromotionPoints] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.PromotionPoints] ADD CONSTRAINT [PK_Register.Accumulation.PromotionPoints] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.PromotionPoints] ON [Register.Accumulation.PromotionPoints];
    RAISERROR('Register.Accumulation.PromotionPoints finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.PromotionPoints ------------------------------

------------------------------ BEGIN Register.Accumulation.StaffingTable ------------------------------

    RAISERROR('Register.Accumulation.StaffingTable start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.StaffingTable.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.StaffingTable');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.StaffingTable] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.StaffingTable');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.StaffingTable] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.StaffingTable');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.StaffingTable') = 0 RETURN;

      INSERT INTO [Register.Accumulation.StaffingTable]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [Department], [DepartmentCompany], [StaffingType], [StaffingTablePosition], [Employee], [Person]
      , d.[SalaryRate] * IIF(r.kind = 1, 1, -1) [SalaryRate], d.[SalaryRate] * IIF(r.kind = 1, 1, null) [SalaryRate.In], d.[SalaryRate] * IIF(r.kind = 1, null, 1) [SalaryRate.Out], [SalaryAnalytic], [currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountPrepay] * IIF(r.kind = 1, 1, -1) [AmountPrepay], d.[AmountPrepay] * IIF(r.kind = 1, 1, null) [AmountPrepay.In], d.[AmountPrepay] * IIF(r.kind = 1, null, 1) [AmountPrepay.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [DepartmentCompany] UNIQUEIDENTIFIER N'$.DepartmentCompany'
        , [StaffingType] NVARCHAR(250) N'$.StaffingType'
        , [StaffingTablePosition] UNIQUEIDENTIFIER N'$.StaffingTablePosition'
        , [Employee] UNIQUEIDENTIFIER N'$.Employee'
        , [Person] UNIQUEIDENTIFIER N'$.Person'
        , [SalaryRate] MONEY N'$.SalaryRate'
        , [SalaryAnalytic] UNIQUEIDENTIFIER N'$.SalaryAnalytic'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountPrepay] MONEY N'$.AmountPrepay'
        ) AS d
        WHERE r.type = N'Register.Accumulation.StaffingTable';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.StaffingTable];
    DROP VIEW IF EXISTS [Register.Accumulation.StaffingTable];
    DROP VIEW IF EXISTS [Register.Accumulation.StaffingTable.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [Department], [DepartmentCompany], [StaffingType], [StaffingTablePosition], [Employee], [Person]
      , d.[SalaryRate] * IIF(r.kind = 1, 1, -1) [SalaryRate], d.[SalaryRate] * IIF(r.kind = 1, 1, null) [SalaryRate.In], d.[SalaryRate] * IIF(r.kind = 1, null, 1) [SalaryRate.Out], [SalaryAnalytic], [currency]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountPrepay] * IIF(r.kind = 1, 1, -1) [AmountPrepay], d.[AmountPrepay] * IIF(r.kind = 1, 1, null) [AmountPrepay.In], d.[AmountPrepay] * IIF(r.kind = 1, null, 1) [AmountPrepay.Out]
    INTO [Register.Accumulation.StaffingTable]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [DepartmentCompany] UNIQUEIDENTIFIER N'$.DepartmentCompany'
        , [StaffingType] NVARCHAR(250) N'$.StaffingType'
        , [StaffingTablePosition] UNIQUEIDENTIFIER N'$.StaffingTablePosition'
        , [Employee] UNIQUEIDENTIFIER N'$.Employee'
        , [Person] UNIQUEIDENTIFIER N'$.Person'
        , [SalaryRate] MONEY N'$.SalaryRate'
        , [SalaryAnalytic] UNIQUEIDENTIFIER N'$.SalaryAnalytic'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Amount] MONEY N'$.Amount'
        , [AmountPrepay] MONEY N'$.AmountPrepay'
    ) AS d
    WHERE r.type = N'Register.Accumulation.StaffingTable';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.StaffingTable] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.StaffingTable] ADD CONSTRAINT [PK_Register.Accumulation.StaffingTable] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.StaffingTable] ON [Register.Accumulation.StaffingTable];
    RAISERROR('Register.Accumulation.StaffingTable finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.StaffingTable ------------------------------

------------------------------ BEGIN Register.Accumulation.MoneyDocuments ------------------------------

    RAISERROR('Register.Accumulation.MoneyDocuments start', 0 ,1) WITH NOWAIT;
    GO
    CREATE OR ALTER TRIGGER [Register.Accumulation.MoneyDocuments.t] ON [Accumulation] AFTER INSERT, UPDATE, DELETE
    AS
    BEGIN
      SET NOCOUNT ON;
      DECLARE @COUNT_D BIGINT = (SELECT COUNT(*) FROM deleted WHERE type = N'Register.Accumulation.MoneyDocuments');
      IF (@COUNT_D) > 1 DELETE FROM [Register.Accumulation.MoneyDocuments] WHERE id IN (SELECT id FROM deleted WHERE type = N'Register.Accumulation.MoneyDocuments');
      IF (@COUNT_D) = 1 DELETE FROM [Register.Accumulation.MoneyDocuments] WHERE id = (SELECT id FROM deleted WHERE type = N'Register.Accumulation.MoneyDocuments');
      IF (SELECT COUNT(*) FROM inserted WHERE type = N'Register.Accumulation.MoneyDocuments') = 0 RETURN;

      INSERT INTO [Register.Accumulation.MoneyDocuments]
      SELECT
        r.id, r.parent, r.date, r.document, r.company, r.kind, r.calculated,
        d.exchangeRate, [currency], [Department], [MoneyDocument], [OwnedBy], [Sourse], [ExpiredAt]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
        FROM inserted r
        CROSS APPLY OPENJSON (data, N'$')
        WITH (
          exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [MoneyDocument] UNIQUEIDENTIFIER N'$.MoneyDocument'
        , [OwnedBy] UNIQUEIDENTIFIER N'$.OwnedBy'
        , [Sourse] UNIQUEIDENTIFIER N'$.Sourse'
        , [ExpiredAt] DATE N'$.ExpiredAt'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
        ) AS d
        WHERE r.type = N'Register.Accumulation.MoneyDocuments';
    END
    GO
    DROP TABLE IF EXISTS [Register.Accumulation.MoneyDocuments];
    DROP VIEW IF EXISTS [Register.Accumulation.MoneyDocuments];
    DROP VIEW IF EXISTS [Register.Accumulation.MoneyDocuments.v];
    SELECT
      r.id, r.parent,  ISNULL(CAST(r.date AS DATE), '1800-01-01') [date], r.document, r.company, r.kind, r.calculated,
      d.exchangeRate, [currency], [Department], [MoneyDocument], [OwnedBy], [Sourse], [ExpiredAt]
      , d.[Amount] * IIF(r.kind = 1, 1, -1) [Amount], d.[Amount] * IIF(r.kind = 1, 1, null) [Amount.In], d.[Amount] * IIF(r.kind = 1, null, 1) [Amount.Out]
      , d.[AmountInBalance] * IIF(r.kind = 1, 1, -1) [AmountInBalance], d.[AmountInBalance] * IIF(r.kind = 1, 1, null) [AmountInBalance.In], d.[AmountInBalance] * IIF(r.kind = 1, null, 1) [AmountInBalance.Out]
      , d.[AmountInAccounting] * IIF(r.kind = 1, 1, -1) [AmountInAccounting], d.[AmountInAccounting] * IIF(r.kind = 1, 1, null) [AmountInAccounting.In], d.[AmountInAccounting] * IIF(r.kind = 1, null, 1) [AmountInAccounting.Out]
    INTO [Register.Accumulation.MoneyDocuments]
    FROM [Accumulation] r
    CROSS APPLY OPENJSON (data, N'$')
    WITH (
      exchangeRate NUMERIC(15,10) N'$.exchangeRate'
        , [currency] UNIQUEIDENTIFIER N'$.currency'
        , [Department] UNIQUEIDENTIFIER N'$.Department'
        , [MoneyDocument] UNIQUEIDENTIFIER N'$.MoneyDocument'
        , [OwnedBy] UNIQUEIDENTIFIER N'$.OwnedBy'
        , [Sourse] UNIQUEIDENTIFIER N'$.Sourse'
        , [ExpiredAt] DATE N'$.ExpiredAt'
        , [Amount] MONEY N'$.Amount'
        , [AmountInBalance] MONEY N'$.AmountInBalance'
        , [AmountInAccounting] MONEY N'$.AmountInAccounting'
    ) AS d
    WHERE r.type = N'Register.Accumulation.MoneyDocuments';
    GO
    GRANT SELECT,INSERT,DELETE ON [Register.Accumulation.MoneyDocuments] TO JETTI;
    GO
    ALTER TABLE [Register.Accumulation.MoneyDocuments] ADD CONSTRAINT [PK_Register.Accumulation.MoneyDocuments] PRIMARY KEY NONCLUSTERED ([id]);
    CREATE CLUSTERED COLUMNSTORE INDEX [Register.Accumulation.MoneyDocuments] ON [Register.Accumulation.MoneyDocuments];
    RAISERROR('Register.Accumulation.MoneyDocuments finish', 0 ,1) WITH NOWAIT;
    GO
    
------------------------------ END Register.Accumulation.MoneyDocuments ------------------------------

    