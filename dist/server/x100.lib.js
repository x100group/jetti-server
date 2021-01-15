"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x100 = void 0;
const sql_pool_x100_DATA_1 = require("./sql.pool.x100-DATA");
const mssql_1 = require("./mssql");
const sql_pool_exchange_1 = require("./sql.pool.exchange");
const std_lib_1 = require("./std.lib");
const BankStatementUnloader_1 = require("./fuctions/BankStatementUnloader");
const taxCheck_1 = require("./x100/functions/taxCheck");
const environment_1 = require("./env/environment");
exports.x100 = {
    account: {},
    register: {
        getTransformedRegisterMovementsByDocId
    },
    catalog: {
        counterpartieByINNAndKPP
    },
    doc: {},
    info: {
        companyByDepartment,
        company2ByDepartment,
        IntercompanyByCompany,
    },
    salary: {
        personFIFO
    },
    util: {
        updateOperationTaxCheck: taxCheck_1.updateOperationTaxCheck,
        getTaxCheckFromURL: taxCheck_1.getTaxCheckFromURL,
        findTaxCheckAttachmentsByOperationId: taxCheck_1.findTaxCheckAttachmentsByOperationId,
        salaryCompanyByCompany,
        bankStatementUnloadById,
        closeMonthErrors,
        exchangeDB,
        x100DataDB
    }
};
async function getTransformedRegisterMovementsByDocId(docID) {
    return await x100DataDB().manyOrNone(`
  SELECT r.id, r.parent, r.date, r."kind", r.calculated,
    "company".id "company.id", "company".description "company.value", "company".code "company.code", 'Catalog.Company' "company.type"

    , [ResponsibilityCenter].id [ResponsibilityCenter.id], [ResponsibilityCenter].description [ResponsibilityCenter.value], 'Catalog.ResponsibilityCenter' [ResponsibilityCenter.type], [ResponsibilityCenter].code [ResponsibilityCenter.code]
    , [Department].id [Department.id], [Department].description [Department.value], 'Catalog.Department' [Department.type], [Department].code [Department.code]
    , [Balance].id [Balance.id], [Balance].description [Balance.value], 'Catalog.Balance' [Balance.type], [Balance].code [Balance.code]
    , [Analytics].id [Analytics.id], [Analytics].description [Analytics.value], 'Types.Catalog' [Analytics.type], [Analytics].code [Analytics.code]
    , [Analytics2].id [Analytics2.id], [Analytics2].description [Analytics2.value], 'Types.Catalog' [Analytics2.type], [Analytics2].code [Analytics2.code]
    , [Currency].id [Currency.id], [Currency].description [Currency.value], 'Catalog.Currency' [Currency.type], [Currency].code [Currency.code]
    , ISNULL(TRY_CONVERT(MONEY, r.Amount), 0) * IIF(kind = 1, 1, -1) [Amount]
    , ISNULL(TRY_CONVERT(MONEY, r.AmountRC), 0) * IIF(kind = 1, 1, -1) [AmountRC]
    , r.Info "Info"
  FROM ${environment_1.TRANSFORMED_REGISTER_MOVEMENTS_TABLE} r
    LEFT JOIN dbo.[Documents] company ON company.id = r.company
    LEFT JOIN dbo.[Documents] [ResponsibilityCenter] ON [ResponsibilityCenter].id = r.ResponsibilityCenter
    LEFT JOIN dbo.[Documents] [Department] ON [Department].id = r.Department
    LEFT JOIN dbo.[Documents] [Balance] ON [Balance].id = r.Balance
    LEFT JOIN dbo.[Documents] [Analytics] ON [Analytics].id = r.Analytics
    LEFT JOIN dbo.[Documents] [Analytics2] ON [Analytics2].id = r.Analytics2
    LEFT JOIN dbo.[Documents] [Currency] ON [Currency].id = r.Currency
  WHERE r.document = @p1`, [docID]);
}
async function counterpartieByINNAndKPP(INN, KPP, tx) {
    const query = `SELECT TOP 1 cp.id FROM [dbo].[Catalog.Counterpartie.v] cp WHERE cp.Code1 = @p1 and (cp.Code2 = @p2 or @p2 is NULL)`;
    const res = await tx.oneOrNone(query, [INN, KPP ? KPP : null]);
    return res ? res.id : null;
}
async function bankStatementUnloadById(docsID, tx) {
    return await BankStatementUnloader_1.BankStatementUnloader.getBankStatementAsString(docsID, tx);
}
async function salaryCompanyByCompany(company, tx) {
    if (!company)
        return null;
    const CompanyParentId = await std_lib_1.lib.doc.Ancestors(company, tx, 1);
    let CodeCompanySalary = '';
    switch (CompanyParentId) {
        case 'E5850830-02D2-11EA-A524-E592E08C23A5': // RUSSIA
            CodeCompanySalary = 'SALARY-RUSSIA';
            break;
        case '608F90F0-5480-11EA-8766-41CC929689CC': // RUSSIA (UKRAINE Branch)
            CodeCompanySalary = 'SALARY-UKRAINE';
            break;
        case 'FE302460-0489-11EA-941F-EBDB19162587': // UKRAINE - Украина
            CodeCompanySalary = 'SALARY-UKRAINE';
            break;
        case '7585EDB0-3626-11EA-A819-EB0BBE912314': // КРАУДИВЕСТИНГ
            CodeCompanySalary = 'SALARY-CRAUD';
            break;
        case '9C226AA0-FAFA-11E9-B75B-A35013C043AE': // KAZAKHSTAN
            CodeCompanySalary = 'SALARY-KAZAKHSTAN';
            break;
        case 'D3B08C60-3F5E-11EA-AD91-F1F1060B7833': // JETTY
            CodeCompanySalary = 'JETTI-COMPANY';
            break;
        case 'A1D8B8E0-F8FD-11E9-8CC0-4361F9AEA805': // HUNGARY
            CodeCompanySalary = 'SALARY-HUNGARY';
            break;
        case 'D5B9D1D0-F8FD-11E9-8CC0-4361F9AEA805': // POLAND
            CodeCompanySalary = 'SALARY-POLAND';
            break;
        case 'FB954970-F8FD-11E9-8CC0-4361F9AEA805': // ROMANIA
            CodeCompanySalary = 'SALARY-ROMANIA';
            break;
        default:
            return company;
    }
    return await std_lib_1.lib.doc.byCode('Catalog.Company', CodeCompanySalary, tx);
}
async function personFIFO(date, person, currency, amount, tx) {
    const queryText = `
  EXEC [dbo].[Distribution.Salary.Person.FIFO]
  @EndDate = '${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}',
  @Currency = '${currency}',
  @Person = '${person}',
  @Amount = ${amount}`;
    return await tx.manyOrNone(queryText);
}
async function companyByDepartment(department, date = new Date(), tx) {
    let result = null;
    const queryText = `
    SELECT TOP 1 company FROM [Register.Info.DepartmentCompanyHistory] WITH (NOEXPAND)
    WHERE (1=1)
      AND date <= @p1
      AND Department = @p2
    ORDER BY date DESC`;
    const res = await tx.oneOrNone(queryText, [date, department]);
    if (res)
        result = res.company;
    return result;
}
async function company2ByDepartment(department, date = new Date(), tx) {
    let result = null;
    const queryText = `
    SELECT TOP 1 company2 FROM [Register.Info.DepartmentCompanyHistory] WITH (NOEXPAND)
    WHERE (1=1)
      AND date <= @p1
      AND Department = @p2
    ORDER BY date DESC`;
    const res = await tx.oneOrNone(queryText, [date, department]);
    if (res)
        result = res.company2;
    return result;
}
async function IntercompanyByCompany(company, date = new Date(), tx) {
    let result = null;
    const queryText = `
    SELECT TOP 1 Intercompany FROM [Register.Info.IntercompanyHistory] WITH (NOEXPAND)
    WHERE (1=1)
      AND date <= @p1
      AND company = @p2
    ORDER BY date DESC`;
    const res = await tx.oneOrNone(queryText, [date, company]);
    if (res)
        result = res.Intercompany;
    return result;
}
async function closeMonthErrors(company, date, tx) {
    const result = await tx.manyOrNone(`
    SELECT q.*, Storehouse.Department Department FROM (
      SELECT Storehouse, SKU, SUM([Cost]) [Cost]
      FROM [dbo].[Register.Accumulation.Inventory] r
      WHERE date < DATEADD(DAY, 1, EOMONTH(@p1)) AND company = @p2
      GROUP BY Storehouse, SKU
      HAVING SUM([Qty]) = 0 AND SUM([Cost]) <> 0) q
    LEFT JOIN [Catalog.Storehouse.v] Storehouse WITH (NOEXPAND) ON Storehouse.id = q.Storehouse`, [date, company]);
    return result;
}
function exchangeDB() {
    return new mssql_1.MSSQL(sql_pool_exchange_1.EXCHANGE_POOL);
}
function x100DataDB() {
    return new mssql_1.MSSQL(sql_pool_x100_DATA_1.x100DATA_POOL);
}
//# sourceMappingURL=x100.lib.js.map