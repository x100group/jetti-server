"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisteredTypes = exports.createTypes = exports.defaultTypeValue = exports.simpleTypes = exports.documentsTypes = exports.allTypes = void 0;
const Types_CompanyOrCounterpartieOrPersonOrRetailClient_1 = require("./Types.CompanyOrCounterpartieOrPersonOrRetailClient");
const Types_CompanyOrCompanyGroup_1 = require("./Types.CompanyOrCompanyGroup");
const Types_Catalog_1 = require("./Types.Catalog");
const Types_Document_1 = require("./Types.Document");
const Types_ExpenseOrBalanceOrIncome_1 = require("./Types.ExpenseOrBalanceOrIncome");
const Types_Object_1 = require("./Types.Object");
const Types_Subcount_1 = require("./Types.Subcount");
const Types_UserOrGroup_1 = require("./Types.UserOrGroup");
const Types_CashOrBank_1 = require("./Types.CashOrBank");
const Types_CashRecipient_1 = require("./Types.CashRecipient");
const Types_CounterpartieOrPerson_1 = require("./Types.CounterpartieOrPerson");
const Types_CounterpartieOrPersonContract_1 = require("./Types.CounterpartieOrPersonContract");
const Types_PersonOrCounterpartieBankAccount_1 = require("./Types.PersonOrCounterpartieBankAccount");
const Types_CompanyOrCounterpartieOrPerson_1 = require("./Types.CompanyOrCounterpartieOrPerson");
const documents_factory_1 = require("../documents.factory");
const jetti_middle_1 = require("jetti-middle");
const Types_ExpenseOrIncome_1 = require("./Types.ExpenseOrIncome");
function allTypes() {
    return [
        ...documentsTypes(),
        ...simpleTypes(),
        ...exports.RegisteredTypes.map(e => ({ type: e.type, description: e.type }))
    ];
}
exports.allTypes = allTypes;
function documentsTypes() {
    return documents_factory_1.RegisteredDocumentsTypes()
        .map(type => ({
        type: type,
        description: (documents_factory_1.createDocument(type).Prop()).description
    }));
}
exports.documentsTypes = documentsTypes;
function simpleTypes() {
    const result = [];
    result.push({ type: 'number', description: 'number', defaultValue: 0 });
    result.push({ type: 'date', description: 'date', defaultValue: null });
    result.push({ type: 'datetime', description: 'datetime', defaultValue: null });
    result.push({ type: 'string', description: 'string', defaultValue: '' });
    result.push({ type: 'boolean', description: 'boolean', defaultValue: false });
    result.push({ type: 'table', description: 'table', defaultValue: [] });
    result.push({ type: 'javascript', description: 'javascript', defaultValue: '' });
    result.push({ type: 'enum', description: 'emum', defaultValue: '' });
    result.push({ type: 'link', description: 'link', defaultValue: '' });
    result.push({ type: 'URL', description: 'URL', defaultValue: '' });
    return result;
}
exports.simpleTypes = simpleTypes;
function defaultTypeValue(type) {
    if (jetti_middle_1.Type.isRefType(type))
        return null;
    const simple = simpleTypes().find(e => e.type === type);
    return simple ? simple.defaultValue : null;
}
exports.defaultTypeValue = defaultTypeValue;
function createTypes(type) {
    const doc = exports.RegisteredTypes.find(el => el.type === type);
    if (doc)
        return new doc.Class;
    else
        throw new Error(`type: ${type} is not defined.`);
}
exports.createTypes = createTypes;
exports.RegisteredTypes = [
    { type: 'Types.Document', Class: Types_Document_1.TypesDocument },
    { type: 'Types.Catalog', Class: Types_Catalog_1.TypesCatalog },
    { type: 'Types.Subcount', Class: Types_Subcount_1.TypesSubcount },
    { type: 'Types.Object', Class: Types_Object_1.TypesObject },
    { type: 'Types.ExpenseOrBalanceOrIncome', Class: Types_ExpenseOrBalanceOrIncome_1.TypesExpenseOrBalanceOrIncome },
    { type: 'Types.TypesExpenseOrIncome', Class: Types_ExpenseOrIncome_1.TypesExpenseOrIncome },
    { type: 'Types.CashOrBank', Class: Types_CashOrBank_1.TypesCashOrBank },
    { type: 'Types.CashRecipient', Class: Types_CashRecipient_1.TypesCashRecipient },
    { type: 'Types.UserOrGroup', Class: Types_UserOrGroup_1.TypesUserOrGroup },
    { type: 'Types.CounterpartieOrPerson', Class: Types_CounterpartieOrPerson_1.TypesCounterpartieOrPerson },
    { type: 'Types.CounterpartieOrPersonContract', Class: Types_CounterpartieOrPersonContract_1.TypesCounterpartieOrPersonContract },
    { type: 'Types.PersonOrCounterpartieBankAccount', Class: Types_PersonOrCounterpartieBankAccount_1.TypesPersonOrCounterpartieBankAccount },
    { type: 'Types.CompanyOrCounterpartieOrPerson', Class: Types_CompanyOrCounterpartieOrPerson_1.TypesCompanyOrCounterpartieOrPerson },
    { type: 'Types.CompanyOrCounterpartieOrPersonOrRetailClient', Class: Types_CompanyOrCounterpartieOrPersonOrRetailClient_1.TypesCompanyOrCounterpartieOrPersonOrRetailClient },
    { type: 'Types.CompanyOrCompanyGroup', Class: Types_CompanyOrCompanyGroup_1.TypesCompanyOrCompanyGroup },
];
//# sourceMappingURL=Types.factory.js.map