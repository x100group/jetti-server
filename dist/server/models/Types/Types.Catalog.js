"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesCatalog = void 0;
const jetti_middle_1 = require("jetti-middle");
const documents_factory_1 = require("../documents.factory");
const TypesBase_1 = require("./TypesBase");
class TypesCatalog extends TypesBase_1.TypesBase {
    getTypes() {
        return documents_factory_1.RegisteredDocumentsTypes(type => jetti_middle_1.Type.isCatalog(type));
    }
}
exports.TypesCatalog = TypesCatalog;
//# sourceMappingURL=Types.Catalog.js.map