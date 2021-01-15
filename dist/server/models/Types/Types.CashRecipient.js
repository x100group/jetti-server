"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesCashRecipient = void 0;
const documents_factory_1 = require("../documents.factory");
const TypesBase_1 = require("./TypesBase");
class TypesCashRecipient extends TypesBase_1.TypesBase {
    getTypes() {
        return documents_factory_1.RegisteredDocumentsTypes(type => ['Catalog.Company', 'Catalog.Counterpartie', 'Catalog.Person']
            .includes(type));
    }
}
exports.TypesCashRecipient = TypesCashRecipient;
//# sourceMappingURL=Types.CashRecipient.js.map