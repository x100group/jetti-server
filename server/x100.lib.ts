import { x100DATA_POOL } from './sql.pool.x100-DATA';
import { MSSQL } from './mssql';
import { EXCHANGE_POOL } from './sql.pool.exchange';
import { lib } from './std.lib';
import { BankStatementUnloader } from './fuctions/BankStatementUnloader';
import {
  updateOperationTaxCheck,
  getTaxCheckFromURL,
  ITaxCheck,
  IUpdateOperationTaxCheckResponse,
  findTaxCheckAttachmentsByOperationId
} from './x100/functions/taxCheck';
import { bpApiHost, TRANSFORMED_REGISTER_MOVEMENTS_TABLE } from './env/environment';
import { Ref } from 'jetti-middle';
import { DocumentCashRequestServer } from './models/Documents/Document.CashRequest.server';
import axios from 'axios';

export interface Ix100Lib {
  account: {
  };
  register: {
    getTransformedRegisterMovementsByDocId: (docId) => Promise<any>
  };
  catalog: {
    counterpartieByINNAndKPP: (INN: string, KPP: string, tx: MSSQL) => Promise<Ref | null>
  };
  doc: {
    startCashReqestAgreement: (cashRequestId: string, tx: MSSQL) => Promise<{ error: boolean, message: string, data: any }>
    ancestorsParent2: (id: Ref, tx: MSSQL, level?: number) => Promise<{ id: Ref, parent: Ref, level: number }[] | Ref | null>;
  };
  info: {
    companyByDepartment: (department: Ref, date: Date, tx: MSSQL) => Promise<Ref | null>
    company2ByDepartment: (department: Ref, date: Date, tx: MSSQL) => Promise<Ref | null>
    department2ByDepartment: (department: Ref, date: Date, tx: MSSQL) => Promise<Ref | null>
    IntercompanyByCompany: (company: Ref, date: Date, tx: MSSQL) => Promise<Ref | null>
    getCompanyParentByDepartment: (department: string, date: Date, typeFranchise: string, tx: MSSQL) => Promise<{
      company: Ref,
      companyParent: Ref,
      currencyParent: Ref
    } | null>
  };
  salary: {
    personFIFO: (date: Date, person: Ref, currency: Ref, amount: number, tx: MSSQL) => Promise<any>
  };
  util: {
    updateOperationTaxCheck: (taxCheck: ITaxCheck) => Promise<IUpdateOperationTaxCheckResponse>,
    getTaxCheckFromURL: (taxCheckURL: string) => Promise<ITaxCheck>,
    findTaxCheckAttachmentsByOperationId: (operId: string, tx: MSSQL) => Promise<any[]>,
    salaryCompanyByCompany: (company: Ref, tx: MSSQL) => Promise<string | null>
    bankStatementUnloadById: (docsID: string[], tx: MSSQL) => Promise<string>,
    closeMonthErrors: (company: Ref, date: Date, tx: MSSQL) => Promise<{ Storehouse: Ref; SKU: Ref; Cost: number }[] | null>,
    exchangeDB: () => MSSQL,
    x100DataDB: () => MSSQL
  };
}

export const x100: Ix100Lib = {
  account: {
  },
  register: {
    getTransformedRegisterMovementsByDocId
  },
  catalog: {
    counterpartieByINNAndKPP
  },
  doc: {
    startCashReqestAgreement,
    ancestorsParent2
  },
  info: {
    companyByDepartment,
    company2ByDepartment,
    department2ByDepartment,
    IntercompanyByCompany,
    getCompanyParentByDepartment
  },
  salary: {
    personFIFO
  },
  util: {
    updateOperationTaxCheck,
    getTaxCheckFromURL,
    findTaxCheckAttachmentsByOperationId,
    salaryCompanyByCompany,
    bankStatementUnloadById,
    closeMonthErrors,
    exchangeDB,
    x100DataDB
  }
};

async function ancestorsParent2(id: string, tx: MSSQL, level?: number): Promise<{ id: Ref, parent: Ref, level: number }[] | Ref | null> {
  if (!id) return null;
  const query = `SELECT id, [parent.id] parent, levelUp as N'level' FROM dbo.[Ancestors2](@p1) WHERE levelUp = @p2 or @p2 is NULL`;
  let result;
  if (level || level === 0) {
    result = await tx.oneOrNone<{ id: Ref, parent: Ref, level: number } | null>(query, [id, level]);
    if (result) result = result.id;
  } else {
    result = await tx.manyOrNone<{ id: Ref, parent: Ref, level: number } | null>(query, [id, null]);
  }
  return result;
}

async function startCashReqestAgreement(cashRequestId: string, tx: MSSQL) {

  const servDoc = await lib.doc.createDocServerById<DocumentCashRequestServer>(cashRequestId, tx);
  const res = { error: true, message: ``, data: null };

  if (!servDoc) {
    res.message = `StartCashReqestAgreement: Document ${cashRequestId} not exist`;
    return res;
  }

  if (servDoc.Operation === 'Выплата заработной платы без ведомости') {
    res.message = await servDoc!['checkTaxCheck'](tx);
    if (res.message) return res;
  }

  const userMail = servDoc.user ? (await lib.doc.byId(servDoc.user, tx))?.code : '';

  const body = {
    'CompanyDescription': (await lib.doc.byId(servDoc.company, tx))?.description,
    'CompanyID': servDoc.company,
    'CashRecipientDescription': servDoc.CashRecipient ? (await lib.doc.byId(servDoc.CashRecipient, tx))?.description : '',
    'SubdivisionID': servDoc.Department,
    'Sum': servDoc.Amount,
    'ItemID': servDoc.CashFlow,
    'OperationTypeID': servDoc.Operation,
    'AuthorID': userMail,
    'DocumentID': servDoc.id,
    'Comment': servDoc.info,
    'BaseType': 'Document.CashRequest',
    'userMail': userMail
  };

  try {
    const instance = axios.create({ baseURL: bpApiHost });
    const query = `/Processes/pwd/StartProcess/CashApplication`;
    res.data = (await instance.post(query, body)).data;
    if (!res.data) throw new Error(`StartCashReqestAgreement: Document ${cashRequestId} empty response`);
  } catch (error) {
    res.message = error.toString();
    return res;
  }

  if (res.data === 'APPROVED') {
    if (servDoc.Status !== 'APPROVED') servDoc.Status = 'APPROVED';
    else return res;
  } else {
    servDoc.Status = 'AWAITING';
    servDoc.workflowID = res.data! as string;
  }

  res.error = false;

  await lib.doc.saveDoc(servDoc, tx);
  return res;
}

async function getTransformedRegisterMovementsByDocId(docID: string): Promise<any> {
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
  FROM ${TRANSFORMED_REGISTER_MOVEMENTS_TABLE} r
    LEFT JOIN dbo.[Documents] company ON company.id = r.company
    LEFT JOIN dbo.[Documents] [ResponsibilityCenter] ON [ResponsibilityCenter].id = r.ResponsibilityCenter
    LEFT JOIN dbo.[Documents] [Department] ON [Department].id = r.Department
    LEFT JOIN dbo.[Documents] [Balance] ON [Balance].id = r.Balance
    LEFT JOIN dbo.[Documents] [Analytics] ON [Analytics].id = r.Analytics
    LEFT JOIN dbo.[Documents] [Analytics2] ON [Analytics2].id = r.Analytics2
    LEFT JOIN dbo.[Documents] [Currency] ON [Currency].id = r.Currency
  WHERE r.document = @p1`, [docID]);
}

async function counterpartieByINNAndKPP(INN: string, KPP: string, tx: MSSQL): Promise<Ref | null> {
  const query = `SELECT TOP 1 cp.id FROM [dbo].[Catalog.Counterpartie.v] cp WHERE cp.Code1 = @p1 and (cp.Code2 = @p2 or @p2 is NULL)`;
  const res = await tx.oneOrNone<{ id }>(query, [INN, KPP ? KPP : null]);
  return res ? res.id : null;
}

async function bankStatementUnloadById(docsID: string[], tx: MSSQL): Promise<string> {
  return await BankStatementUnloader.getBankStatementAsString(docsID, tx);
}

async function salaryCompanyByCompany(company: Ref, tx: MSSQL): Promise<string | null> {
  if (!company) return null;
  const CompanyParentId = await lib.doc.Ancestors(company, tx, 1);
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
  return await lib.doc.byCode('Catalog.Company', CodeCompanySalary, tx);
}


async function personFIFO(date: Date, person: Ref, currency: Ref, amount: number, tx: MSSQL): Promise<any> {
  const queryText = `
  EXEC [dbo].[Distribution.Salary.Person.FIFO]
  @EndDate = '${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}',
  @Currency = '${currency}',
  @Person = '${person}',
  @Amount = ${amount}`;
  return await tx.manyOrNone(queryText);
}


async function departmentCompanyHistory<T>(department: Ref, date = new Date(), column: string, tx: MSSQL): Promise<T | null> {
  const queryText = `
  SELECT TOP 1 ${column} FROM [Register.Info.DepartmentCompanyHistory] WITH (NOEXPAND)
  WHERE (1=1)
    AND date <= @p1
    AND Department = @p2
  ORDER BY date DESC`;
  const res = await tx.oneOrNone<T>(queryText, [date, department]);
  return res ? res[column] : null;
}

async function companyByDepartment(department: Ref, date = new Date(), tx: MSSQL): Promise<Ref | null> {
  return await departmentCompanyHistory(department, date, 'company', tx);
}

async function company2ByDepartment(department: Ref, date = new Date(), tx: MSSQL): Promise<Ref | null> {
  return await departmentCompanyHistory(department, date, 'company2', tx);
}

async function department2ByDepartment(department: Ref, date = new Date(), tx: MSSQL): Promise<Ref | null> {
  return await departmentCompanyHistory(department, date, 'Department2', tx);
}

async function IntercompanyByCompany(company: Ref, date = new Date(), tx: MSSQL): Promise<Ref | null> {
  let result: Ref | null = null;
  const queryText = `
    SELECT TOP 1 Intercompany FROM [Register.Info.IntercompanyHistory] WITH (NOEXPAND)
    WHERE (1=1)
      AND date <= @p1
      AND company = @p2
    ORDER BY date DESC`;
  const res = await tx.oneOrNone<{ Intercompany: string }>(queryText, [date, company]);
  if (res) result = res.Intercompany;
  return result;
}

async function closeMonthErrors(company: Ref, date: Date, tx: MSSQL) {
  const result = await tx.manyOrNone<{ Storehouse: Ref, SKU: Ref, Cost: number }>(`
    SELECT q.*, Storehouse.Department Department FROM (
      SELECT Storehouse, SKU, SUM([Cost]) [Cost]
      FROM [dbo].[Register.Accumulation.Inventory] r
      WHERE date < DATEADD(DAY, 1, EOMONTH(@p1)) AND company = @p2
      GROUP BY Storehouse, SKU
      HAVING SUM([Qty]) = 0 AND SUM([Cost]) <> 0) q
    LEFT JOIN [Catalog.Storehouse.v] Storehouse WITH (NOEXPAND) ON Storehouse.id = q.Storehouse`, [date, company]);
  return result;
}

async function getCompanyParentByDepartment(department: string, date: Date, typeFranchise: string, tx: MSSQL) {
  const result = await tx.oneOrNone<{
    company: Ref,
    companyParent: Ref,
    currencyParent: Ref
  }>(`
  SELECT TOP 1
    Res.[company] as [company]
    ,CatCom.[parent] as [companyParent]
    ,CatCom_Parent.[currency] as [currencyParent]
  FROM (
    SELECT TOP 1 RegDepCompHistory.[company]
      ,RegDepCompHistory.[Department]
      ,RegDepCompHistory.[InvestorGroup]
      ,RegDepCompHistory.[TypeFranchise]
    FROM [dbo].[Register.Info.DepartmentCompanyHistory] as RegDepCompHistory WITH (NOEXPAND)
    WHERE 1=1
      AND RegDepCompHistory.[date] <= @p1
      AND RegDepCompHistory.[Department] = @p2
      ORDER BY RegDepCompHistory.[date] DESC
      ) as Res
      LEFT JOIN [dbo].[Catalog.Company.v] as CatCom with (noexpand) on CatCom.[id] = Res.[company]
      LEFT JOIN [dbo].[Catalog.Company.v] as CatCom_Parent with (noexpand) on CatCom_Parent.[id] = CatCom.[parent]
      LEFT JOIN [dbo].[Catalog.Currency.v] as CatCur_Parent with (noexpand) on CatCur_Parent.[id] = CatCom_Parent.[currency]
      WHERE Res.[TypeFranchise] = @p3
  `, [date, department, typeFranchise]);
  return result;
}

function exchangeDB() {
  return new MSSQL(EXCHANGE_POOL);
}

function x100DataDB() {
  return new MSSQL(x100DATA_POOL);
}
