"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisteredDocumentStatic = exports.RegisteredDocuments = exports.RegisteredDocumentsTypes = exports.createDocument = void 0;
const Catalog_Product_Package_1 = require("./Catalogs/Catalog.Product.Package");
const Catalog_Employee_1 = require("./Catalogs/Catalog.Employee");
const Catalog_Attachment_Type_1 = require("./Catalogs/Catalog.Attachment.Type");
const Catalog_ReasonTypes_1 = require("./Catalogs/Catalog.ReasonTypes");
const Catalog_JobTitle_Category_1 = require("./Catalogs/Catalog.JobTitle.Category");
const Catalog_Product_Report_1 = require("./Catalogs/Catalog.Product.Report");
const Catalog_Department_StatusReason_1 = require("./Catalogs/Catalog.Department.StatusReason");
const Catalog_Department_Kind_1 = require("./Catalogs/Catalog.Department.Kind");
const Catalog_Contract_Intercompany_1 = require("./Catalogs/Catalog.Contract.Intercompany");
const Catalog_PersonIdentity_1 = require("./Catalogs/Catalog.PersonIdentity");
const Catalog_LoanRepaymentProcedure_1 = require("./Catalogs/Catalog.LoanRepaymentProcedure");
const Catalog_Country_1 = require("./Catalogs/Catalog.Country");
const Catalog_TaxAssignmentCode_1 = require("./Catalogs/Catalog.TaxAssignmentCode");
const Catalog_Account_1 = require("./Catalogs/Catalog.Account");
const Catalog_Balance_1 = require("./Catalogs/Catalog.Balance");
const Catalog_Balance_Analytics_1 = require("./Catalogs/Catalog.Balance.Analytics");
const Catalog_BankAccount_1 = require("./Catalogs/Catalog.BankAccount");
const Catalog_Brand_1 = require("./Catalogs/Catalog.Brand");
const Catalog_CashFlow_1 = require("./Catalogs/Catalog.CashFlow");
const Catalog_CashRegister_1 = require("./Catalogs/Catalog.CashRegister");
const Catalog_Catalog_1 = require("./Catalogs/Catalog.Catalog");
const Catalog_Catalogs_1 = require("./Catalogs/Catalog.Catalogs");
const Catalog_Company_1 = require("./Catalogs/Catalog.Company");
const Catalog_Counterpartie_1 = require("./Catalogs/Catalog.Counterpartie");
const Catalog_Currency_1 = require("./Catalogs/Catalog.Currency");
const Catalog_Department_1 = require("./Catalogs/Catalog.Department");
const Catalog_Documents_1 = require("./Catalogs/Catalog.Documents");
const Catalog_Expense_1 = require("./Catalogs/Catalog.Expense");
const Catalog_Expense_Analytics_1 = require("./Catalogs/Catalog.Expense.Analytics");
const Catalog_GroupObjectsExploitation_1 = require("./Catalogs/Catalog.GroupObjectsExploitation");
const Catalog_Income_1 = require("./Catalogs/Catalog.Income");
const Catalog_Loan_1 = require("./Catalogs/Catalog.Loan");
const Catalog_Manager_1 = require("./Catalogs/Catalog.Manager");
const Catalog_Objects_1 = require("./Catalogs/Catalog.Objects");
const Catalog_ObjectsExploitation_1 = require("./Catalogs/Catalog.ObjectsExploitation");
const Catalog_Operation_1 = require("./Catalogs/Catalog.Operation");
const Catalog_Operation_Group_1 = require("./Catalogs/Catalog.Operation.Group");
const Catalog_Person_1 = require("./Catalogs/Catalog.Person");
const Catalog_PriceType_1 = require("./Catalogs/Catalog.PriceType");
const Catalog_PromotionChannel_1 = require("./Catalogs/Catalog.PromotionChannel");
const Catalog_Product_1 = require("./Catalogs/Catalog.Product");
const Catalog_ProductCategory_1 = require("./Catalogs/Catalog.ProductCategory");
const Catalog_ProductKind_1 = require("./Catalogs/Catalog.ProductKind");
const Catalog_Role_1 = require("./Catalogs/Catalog.Role");
const Catalog_Storehouse_1 = require("./Catalogs/Catalog.Storehouse");
const Catalog_Subcount_1 = require("./Catalogs/Catalog.Subcount");
const Catalog_SubSystem_1 = require("./Catalogs/Catalog.SubSystem");
const Catalog_Unit_1 = require("./Catalogs/Catalog.Unit");
const Catalog_User_1 = require("./Catalogs/Catalog.User");
const Document_ExchangeRates_1 = require("./Documents/Document.ExchangeRates");
const Document_Invoice_1 = require("./Documents/Document.Invoice");
const Document_Operation_1 = require("./Documents/Document.Operation");
const Document_PriceList_1 = require("./Documents/Document.PriceList");
const Document_Settings_1 = require("./Documents/Document.Settings");
const Document_UserSettings_1 = require("./Documents/Document.UserSettings");
const Catalog_Operation_Type_1 = require("./Catalogs/Catalog.Operation.Type");
const Catalog_BudgetItem_1 = require("./Catalogs/Catalog.BudgetItem");
const Catalog_Scenario_1 = require("./Catalogs/Catalog.Scenario");
const Catalog_AcquiringTerminal_1 = require("./Catalogs/Catalog.AcquiringTerminal");
const Catalog_Bank_1 = require("./Catalogs/Catalog.Bank");
const Catalog_Forms_1 = require("./Catalogs/Catalog.Forms");
const Catalog_UsersGroup_1 = require("./Catalogs/Catalog.UsersGroup");
const Catalog_Counterpartie_BankAccount_1 = require("./Catalogs/Catalog.Counterpartie.BankAccount");
const Catalog_Contract_1 = require("./Catalogs/Catalog.Contract");
const Catalog_BusinessDirection_1 = require("./Catalogs/Catalog.BusinessDirection");
const Document_WokrFlow_1 = require("./Documents/Document.WokrFlow");
const Document_CashRequest_1 = require("./Documents/Document.CashRequest");
const Catalog_LoanTypes_1 = require("./Catalogs/Catalog.LoanTypes");
const Document_CashRequestRegistry_1 = require("./Documents/Document.CashRequestRegistry");
const Catalog_JobTitle_1 = require("./Catalogs/Catalog.JobTitle");
const Catalog_BusinessRegion_1 = require("./Catalogs/Catalog.BusinessRegion");
const Catalog_TaxRates_1 = require("./Catalogs/Catalog.TaxRates");
const Catalog_TaxPaymentCode_1 = require("./Catalogs/Catalog.TaxPaymentCode");
const Catalog_TaxPaymentPeriod_1 = require("./Catalogs/Catalog.TaxPaymentPeriod");
const Catalog_TaxPayerStatus_1 = require("./Catalogs/Catalog.TaxPayerStatus");
const Catalog_RetailClient_1 = require("./Catalogs/Catalog.RetailClient");
const Catalog_TaxOffice_1 = require("./Catalogs/Catalog.TaxOffice");
const Catalog_Person_BankAccount_1 = require("./Catalogs/Catalog.Person.BankAccount");
const Catalog_Person_Contract_1 = require("./Catalogs/Catalog.Person.Contract");
const Catalog_SalaryProject_1 = require("./Catalogs/Catalog.SalaryProject");
const Catalog_TaxBasisPayment_1 = require("./Catalogs/Catalog.TaxBasisPayment");
const Catalog_Salary_Analytics_1 = require("./Catalogs/Catalog.Salary.Analytics");
const Catalog_Company_Group_1 = require("./Catalogs/Catalog.Company.Group");
const Catalog_PlanningScenario_1 = require("./Catalogs/Catalog.PlanningScenario");
const Catalog_Specification_1 = require("./Catalogs/Catalog.Specification");
const Catalog_OrderSource_1 = require("./Catalogs/Catalog.OrderSource");
const Catalog_InvestorGroup_1 = require("./Catalogs/Catalog.InvestorGroup");
const Catalog_Attachment_1 = require("./Catalogs/Catalog.Attachment");
const Catalog_StaffingTable_1 = require("./Catalogs/Catalog.StaffingTable");
const Catalog_AllUnic_Lot_1 = require("./Catalogs/Catalog.AllUnic.Lot");
const Catalog_ManufactureLocation_1 = require("./Catalogs/Catalog.ManufactureLocation");
const Catalog_Product_Analytic_1 = require("./Catalogs/Catalog.Product.Analytic");
const Catalog_Department_Company_1 = require("./Catalogs/Catalog.Department.Company");
const dynamic_prototype_1 = require("./Dynamic/dynamic.prototype");
const Catalog_ResponsibilityCenter_1 = require("./Catalogs/Catalog.ResponsibilityCenter");
const global_1 = require("./global");
const Types_factory_1 = require("./Types/Types.factory");
const Catalog_Configuration_1 = require("./Catalogs/Catalog.Configuration");
const Catalog_RetailNetwork_1 = require("./Catalogs/Catalog.RetailNetwork");
const Catalog_BusinessCalendar_1 = require("./Catalogs/Catalog.BusinessCalendar");
function createDocument(type, document) {
    let result;
    const doc = RegisteredDocuments().get(type);
    if (!doc)
        throw new Error(`createDocument: can't create '${type}' type! '${type}' is not registered`);
    result = new doc.Class;
    if (doc.dynamic) {
        const docMeta = global_1.Global.dynamicMeta().Metadata.find(e => e.type === type);
        const Props = docMeta.Props();
        Object.keys(Props)
            .forEach(propName => {
            const defVal = Object.keys(Props[propName]).find(propOpts => propOpts === 'value');
            result[propName] = defVal || Types_factory_1.defaultTypeValue(Props[propName].type);
        });
        result.Props = () => (Object.assign({}, Props));
        result.Prop = () => (Object.assign({}, docMeta.Prop()));
        result.type = type;
        if (!document && !result.date)
            result.date = new Date;
    }
    else {
        const ArrayProps = Object.keys(result).filter(k => Array.isArray(result[k]));
        ArrayProps.forEach(prop => result[prop].length = 0);
    }
    if (document)
        result.map(document);
    return result;
}
exports.createDocument = createDocument;
function RegisteredDocumentsTypes(filter) {
    if (filter)
        return [...RegisteredDocuments().keys()].filter(filter);
    return [...RegisteredDocuments().keys()];
}
exports.RegisteredDocumentsTypes = RegisteredDocumentsTypes;
function RegisteredDocuments() {
    return global_1.Global.RegisteredDocuments();
}
exports.RegisteredDocuments = RegisteredDocuments;
exports.RegisteredDocumentStatic = [
    { type: 'Catalog.ResponsibilityCenter', Class: Catalog_ResponsibilityCenter_1.CatalogResponsibilityCenter },
    { type: 'Catalog.Dynamic', Class: dynamic_prototype_1.CatalogDynamic },
    { type: 'Catalog.Attachment', Class: Catalog_Attachment_1.CatalogAttachment },
    { type: 'Catalog.Attachment.Type', Class: Catalog_Attachment_Type_1.CatalogAttachmentType },
    { type: 'Catalog.AllUnic.Lot', Class: Catalog_AllUnic_Lot_1.CatalogAllUnicLot },
    { type: 'Catalog.Account', Class: Catalog_Account_1.CatalogAccount },
    { type: 'Catalog.Balance', Class: Catalog_Balance_1.CatalogBalance },
    { type: 'Catalog.BusinessCalendar', Class: Catalog_BusinessCalendar_1.CatalogBusinessCalendar },
    { type: 'Catalog.Balance.Analytics', Class: Catalog_Balance_Analytics_1.CatalogBalanceAnalytics },
    { type: 'Catalog.BankAccount', Class: Catalog_BankAccount_1.CatalogBankAccount },
    { type: 'Catalog.CashFlow', Class: Catalog_CashFlow_1.CatalogCashFlow },
    { type: 'Catalog.CashRegister', Class: Catalog_CashRegister_1.CatalogCashRegister },
    { type: 'Catalog.Currency', Class: Catalog_Currency_1.CatalogCurrency },
    { type: 'Catalog.Configuration', Class: Catalog_Configuration_1.CatalogConfiguration },
    { type: 'Catalog.Company', Class: Catalog_Company_1.CatalogCompany },
    { type: 'Catalog.Company.Group', Class: Catalog_Company_Group_1.CatalogCompanyGroup },
    { type: 'Catalog.Country', Class: Catalog_Country_1.CatalogCountry },
    { type: 'Catalog.Counterpartie', Class: Catalog_Counterpartie_1.CatalogCounterpartie },
    { type: 'Catalog.Counterpartie.BankAccount', Class: Catalog_Counterpartie_BankAccount_1.CatalogCounterpartieBankAccount },
    { type: 'Catalog.Contract', Class: Catalog_Contract_1.CatalogContract },
    { type: 'Catalog.Contract.Intercompany', Class: Catalog_Contract_Intercompany_1.CatalogContractIntercompany },
    { type: 'Catalog.BusinessDirection', Class: Catalog_BusinessDirection_1.CatalogBusinessDirection },
    { type: 'Catalog.Salary.Analytics', Class: Catalog_Salary_Analytics_1.CatalogSalaryAnalytics },
    { type: 'Catalog.Department', Class: Catalog_Department_1.CatalogDepartment },
    { type: 'Catalog.Department.Kind', Class: Catalog_Department_Kind_1.CatalogDepartmentKind },
    { type: 'Catalog.Department.Company', Class: Catalog_Department_Company_1.CatalogDepartmentCompany },
    { type: 'Catalog.Department.StatusReason', Class: Catalog_Department_StatusReason_1.CatalogDepartmentStatusReason },
    { type: 'Catalog.Expense', Class: Catalog_Expense_1.CatalogExpense },
    { type: 'Catalog.Expense.Analytics', Class: Catalog_Expense_Analytics_1.CatalogExpenseAnalytics },
    { type: 'Catalog.Income', Class: Catalog_Income_1.CatalogIncome },
    { type: 'Catalog.Loan', Class: Catalog_Loan_1.CatalogLoan },
    { type: 'Catalog.LoanRepaymentProcedure', Class: Catalog_LoanRepaymentProcedure_1.CatalogLoanRepaymentProcedure },
    { type: 'Catalog.LoanTypes', Class: Catalog_LoanTypes_1.CatalogLoanTypes },
    { type: 'Catalog.Manager', Class: Catalog_Manager_1.CatalogManager },
    { type: 'Catalog.Person', Class: Catalog_Person_1.CatalogPerson },
    { type: 'Catalog.PriceType', Class: Catalog_PriceType_1.CatalogPriceType },
    { type: 'Catalog.Product', Class: Catalog_Product_1.CatalogProduct },
    { type: 'Catalog.PlanningScenario', Class: Catalog_PlanningScenario_1.CatalogPlanningScenario },
    { type: 'Catalog.ProductCategory', Class: Catalog_ProductCategory_1.CatalogProductCategory },
    { type: 'Catalog.ProductKind', Class: Catalog_ProductKind_1.CatalogProductKind },
    { type: 'Catalog.Product.Report', Class: Catalog_Product_Report_1.CatalogProductReport },
    { type: 'Catalog.PromotionChannel', Class: Catalog_PromotionChannel_1.CatalogPromotionChannel },
    { type: 'Catalog.Storehouse', Class: Catalog_Storehouse_1.CatalogStorehouse },
    { type: 'Catalog.Operation', Class: Catalog_Operation_1.CatalogOperation },
    { type: 'Catalog.Operation.Group', Class: Catalog_Operation_Group_1.CatalogOperationGroup },
    { type: 'Catalog.Operation.Type', Class: Catalog_Operation_Type_1.CatalogOperationType },
    { type: 'Catalog.OrderSource', Class: Catalog_OrderSource_1.CatalogOrderSource },
    { type: 'Catalog.Unit', Class: Catalog_Unit_1.CatalogUnit },
    { type: 'Catalog.User', Class: Catalog_User_1.CatalogUser },
    { type: 'Catalog.UsersGroup', Class: Catalog_UsersGroup_1.CatalogUsersGroup },
    { type: 'Catalog.Role', Class: Catalog_Role_1.CatalogRole },
    { type: 'Catalog.SubSystem', Class: Catalog_SubSystem_1.CatalogSubSystem },
    { type: 'Catalog.JobTitle', Class: Catalog_JobTitle_1.CatalogJobTitle },
    { type: 'Catalog.JobTitle.Category', Class: Catalog_JobTitle_Category_1.CatalogJobTitleCategory },
    { type: 'Catalog.PersonIdentity', Class: Catalog_PersonIdentity_1.CatalogPersonIdentity },
    { type: 'Catalog.ReasonTypes', Class: Catalog_ReasonTypes_1.CatalogReasonTypes },
    { type: 'Catalog.Product.Package', Class: Catalog_Product_Package_1.CatalogProductPackage },
    { type: 'Catalog.Product.Analytic', Class: Catalog_Product_Analytic_1.CatalogProductAnalytic },
    { type: 'Catalog.Documents', Class: Catalog_Documents_1.CatalogDocuments },
    { type: 'Catalog.Catalogs', Class: Catalog_Catalogs_1.CatalogCatalogs },
    { type: 'Catalog.Forms', Class: Catalog_Forms_1.CatalogForms },
    { type: 'Catalog.Objects', Class: Catalog_Objects_1.CatalogObjects },
    { type: 'Catalog.Subcount', Class: Catalog_Subcount_1.CatalogSubcount },
    { type: 'Catalog.StaffingTable', Class: Catalog_StaffingTable_1.CatalogStaffingTable },
    { type: 'Catalog.Brand', Class: Catalog_Brand_1.CatalogBrand },
    { type: 'Catalog.GroupObjectsExploitation', Class: Catalog_GroupObjectsExploitation_1.CatalogGroupObjectsExploitation },
    { type: 'Catalog.ObjectsExploitation', Class: Catalog_ObjectsExploitation_1.CatalogObjectsExploitation },
    { type: 'Catalog.Catalog', Class: Catalog_Catalog_1.CatalogCatalog },
    { type: 'Catalog.BudgetItem', Class: Catalog_BudgetItem_1.CatalogBudgetItem },
    { type: 'Catalog.Scenario', Class: Catalog_Scenario_1.CatalogScenario },
    { type: 'Catalog.ManufactureLocation', Class: Catalog_ManufactureLocation_1.CatalogManufactureLocation },
    { type: 'Catalog.AcquiringTerminal', Class: Catalog_AcquiringTerminal_1.CatalogAcquiringTerminal },
    { type: 'Catalog.Bank', Class: Catalog_Bank_1.CatalogBank },
    { type: 'Catalog.Person.BankAccount', Class: Catalog_Person_BankAccount_1.CatalogPersonBankAccount },
    { type: 'Catalog.Person.Contract', Class: Catalog_Person_Contract_1.CatalogPersonContract },
    { type: 'Catalog.BusinessRegion', Class: Catalog_BusinessRegion_1.CatalogBusinessRegion },
    { type: 'Catalog.TaxRate', Class: Catalog_TaxRates_1.CatalogTaxRate },
    { type: 'Catalog.TaxAssignmentCode', Class: Catalog_TaxAssignmentCode_1.CatalogTaxAssignmentCode },
    { type: 'Catalog.TaxPaymentCode', Class: Catalog_TaxPaymentCode_1.CatalogTaxPaymentCode },
    { type: 'Catalog.TaxBasisPayment', Class: Catalog_TaxBasisPayment_1.CatalogTaxBasisPayment },
    { type: 'Catalog.TaxPaymentPeriod', Class: Catalog_TaxPaymentPeriod_1.CatalogTaxPaymentPeriod },
    { type: 'Catalog.TaxPayerStatus', Class: Catalog_TaxPayerStatus_1.CatalogTaxPayerStatus },
    { type: 'Catalog.TaxOffice', Class: Catalog_TaxOffice_1.CatalogTaxOffice },
    { type: 'Catalog.RetailClient', Class: Catalog_RetailClient_1.CatalogRetailClient },
    { type: 'Catalog.RetailNetwork', Class: Catalog_RetailNetwork_1.CatalogRetailNetwork },
    { type: 'Catalog.SalaryProject', Class: Catalog_SalaryProject_1.CatalogSalaryProject },
    { type: 'Catalog.Specification', Class: Catalog_Specification_1.CatalogSpecification },
    { type: 'Catalog.InvestorGroup', Class: Catalog_InvestorGroup_1.CatalogInvestorGroup },
    { type: 'Catalog.Employee', Class: Catalog_Employee_1.CatalogEmployee },
    { type: 'Document.ExchangeRates', Class: Document_ExchangeRates_1.DocumentExchangeRates },
    { type: 'Document.Invoice', Class: Document_Invoice_1.DocumentInvoice },
    { type: 'Document.Operation', Class: Document_Operation_1.DocumentOperation },
    { type: 'Document.PriceList', Class: Document_PriceList_1.DocumentPriceList },
    { type: 'Document.Settings', Class: Document_Settings_1.DocumentSettings },
    { type: 'Document.UserSettings', Class: Document_UserSettings_1.DocumentUserSettings },
    { type: 'Document.WorkFlow', Class: Document_WokrFlow_1.DocumentWorkFlow },
    { type: 'Document.CashRequest', Class: Document_CashRequest_1.DocumentCashRequest },
    { type: 'Document.CashRequestRegistry', Class: Document_CashRequestRegistry_1.DocumentCashRequestRegistry },
];
//# sourceMappingURL=documents.factory.js.map