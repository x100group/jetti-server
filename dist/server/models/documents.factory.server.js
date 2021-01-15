"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocumentServer = exports.RegisteredServerDocument = void 0;
const Catalog_Person_Contract_server_1 = require("./Catalogs/Catalog.Person.Contract.server");
const Catalog_Contract_server_1 = require("./Catalogs/Catalog.Contract.server");
const Catalog_Employee_server_1 = require("./Catalogs/Catalog.Employee.server");
const Catalog_StaffingTable_server_1 = require("./Catalogs/Catalog.StaffingTable.server");
const std_lib_1 = require("../std.lib");
const documents_factory_1 = require("./../models/documents.factory");
const Catalog_Operation_server_1 = require("./Catalogs/Catalog.Operation.server");
const jetti_middle_1 = require("jetti-middle");
const Document_ExchangeRates_server_1 = require("./Documents/Document.ExchangeRates.server");
const Document_Invoce_server_1 = require("./Documents/Document.Invoce.server");
const Document_Operation_1 = require("./Documents/Document.Operation");
const Document_Operation_server_1 = require("./Documents/Document.Operation.server");
const Document_PriceList_server_1 = require("./Documents/Document.PriceList.server");
const Document_Settings_server_1 = require("./Documents/Document.Settings.server");
const Document_UserSettings_server_1 = require("./Documents/Document.UserSettings.server");
const Document_WorkFlow_server_1 = require("./Documents/Document.WorkFlow.server");
const Document_CashRequest_server_1 = require("./Documents/Document.CashRequest.server");
const Document_CashRequestRegistry_server_1 = require("./Documents/Document.CashRequestRegistry.server");
const Catalog_Catalog_server_1 = require("./Catalogs/Catalog.Catalog.server");
const Catalog_ProductKind_server_1 = require("./Catalogs/Catalog.ProductKind.server");
const Catalog_Product_server_1 = require("./Catalogs/Catalog.Product.server");
const Catalog_ProductCategory_server_1 = require("./Catalogs/Catalog.ProductCategory.server");
const Catalog_Loan_server_1 = require("./Catalogs/Catalog.Loan.server");
exports.RegisteredServerDocument = [
    { type: 'Catalog.Contract', Class: Catalog_Contract_server_1.CatalogContractServer },
    { type: 'Catalog.Operation', Class: Catalog_Operation_server_1.CatalogOperationServer },
    { type: 'Catalog.StaffingTable', Class: Catalog_StaffingTable_server_1.CatalogStaffingTableServer },
    { type: 'Catalog.Person.Contract', Class: Catalog_Person_Contract_server_1.CatalogPersonContractServer },
    { type: 'Catalog.Catalog', Class: Catalog_Catalog_server_1.CatalogCatalogServer },
    { type: 'Catalog.Employee', Class: Catalog_Employee_server_1.CatalogEmployeeServer },
    { type: 'Catalog.Loan', Class: Catalog_Loan_server_1.CatalogLoanServer },
    { type: 'Catalog.ProductKind', Class: Catalog_ProductKind_server_1.CatalogProductKindServer },
    { type: 'Catalog.Product', Class: Catalog_Product_server_1.CatalogProductServer },
    { type: 'Catalog.ProductCategory', Class: Catalog_ProductCategory_server_1.CatalogProductCategoryServer },
    { type: 'Document.Operation', Class: Document_Operation_server_1.DocumentOperationServer },
    { type: 'Document.Invoice', Class: Document_Invoce_server_1.DocumentInvoiceServer },
    { type: 'Document.ExchangeRates', Class: Document_ExchangeRates_server_1.DocumentExchangeRatesServer },
    { type: 'Document.PriceList', Class: Document_PriceList_server_1.DocumentPriceListServer },
    { type: 'Document.Settings', Class: Document_Settings_server_1.DocumentSettingsServer },
    { type: 'Document.UserSettings', Class: Document_UserSettings_server_1.DocumentUserSettingsServer },
    { type: 'Document.CashRequest', Class: Document_CashRequest_server_1.DocumentCashRequestServer },
    { type: 'Document.WorkFlow', Class: Document_WorkFlow_server_1.DocumentWorkFlowServer },
    { type: 'Document.CashRequestRegistry', Class: Document_CashRequestRegistry_server_1.DocumentCashRequestRegistryServer }
];
async function createDocumentServer(type, document, tx) {
    let result;
    const doc = exports.RegisteredServerDocument.find(el => el.type === type);
    if (doc) {
        const serverResult = new doc.Class;
        const ArrayProps = Object.keys(serverResult).filter(k => Array.isArray(serverResult[k]));
        ArrayProps.forEach(prop => serverResult[prop].length = 0);
        if (document)
            serverResult.map(document);
        result = serverResult;
    }
    else {
        result = documents_factory_1.createDocument(type, document);
    }
    result['serverModule'] = {};
    const Props = Object.assign({}, result.Props());
    const Prop = Object.assign({}, result.Prop());
    let Operation = null;
    let Grop = null;
    if (result instanceof Document_Operation_1.DocumentOperation && document && document.id) {
        result.f1 = null;
        result.f2 = null;
        result.f3 = null;
        Prop.commands = [];
        Prop.copyTo = [];
        if (result.Operation) {
            Operation = await std_lib_1.lib.doc.byIdT(result.Operation, tx);
            if (!Operation)
                throw new Error(`Operation with id ${result.Operation} not found!`);
            Grop = await std_lib_1.lib.doc.formControlRef(Operation.Group, tx);
            result.Group = Operation.Group;
            Prop['Group'] = Grop;
            let i = 1;
            (Operation && Operation.Parameters || []).sort((a, b) => (a.order || 0) - (b.order || 0)).forEach(c => {
                if (c.type.startsWith('Catalog.'))
                    result[`f${i++}`] = result[c.parameter];
                Props[c.parameter] = (Object.assign({ label: c.label, type: c.type, required: !!c.required, change: c.change, order: (c.order || 0) + 103, [c.parameter]: c.tableDef ? JSON.parse(c.tableDef) : null }, JSON.parse(c.Props ? c.Props : '{}')));
                if (result[c.parameter] === undefined)
                    result[c.parameter] = Props[c.parameter].value;
            });
            Prop.commands = [
                ...Operation.commandsOnServer || [],
                ...(Operation.commandsOnClient || []).map(command => (Object.assign(Object.assign({}, command), { isClientCommand: true })))
            ];
            for (const o of ((Operation && Operation.CopyTo) || [])) {
                const base = await std_lib_1.lib.doc.byIdT(o.Operation, tx);
                if (base) {
                    const item = {
                        icon: '',
                        label: base.description,
                        Operation: o.Operation,
                        type: result.type,
                        order: o.order || 1
                    };
                    Prop.copyTo.push(item);
                }
            }
            if (Operation && Operation.module) {
                Prop.module = Operation.module;
                const func = new Function('tx', Operation.module);
                result['serverModule'] = func.bind(result, tx)() || {};
                const onCreate = result['serverModule']['onCreate'];
                if (typeof onCreate === 'function')
                    await onCreate(tx);
            }
        }
    }
    if (!Operation && result.onCreate)
        await result.onCreate(tx);
    // protect against mutate
    result.Props = () => Props;
    result.Prop = () => Prop;
    if (result.isDoc)
        result.description =
            jetti_middle_1.calculateDescription(result.Prop().description, result.date, result.code, Grop && Grop.value || '');
    return result;
}
exports.createDocumentServer = createDocumentServer;
//# sourceMappingURL=documents.factory.server.js.map