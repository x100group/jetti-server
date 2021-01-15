"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesCashOrBank = void 0;
const documents_factory_1 = require("../documents.factory");
const TypesBase_1 = require("./TypesBase");
class TypesCashOrBank extends TypesBase_1.TypesBase {
    getTypes() {
        return documents_factory_1.RegisteredDocumentsTypes(type => ['Catalog.BankAccount', 'Catalog.CashRegister'].includes(type));
    }
}
exports.TypesCashOrBank = TypesCashOrBank;
//# sourceMappingURL=Types.CashOrBank.js.map