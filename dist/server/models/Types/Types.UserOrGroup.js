"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesUserOrGroup = void 0;
const documents_factory_1 = require("../documents.factory");
const TypesBase_1 = require("./TypesBase");
class TypesUserOrGroup extends TypesBase_1.TypesBase {
    getTypes() {
        return documents_factory_1.RegisteredDocumentsTypes(type => ['Catalog.User', 'Catalog.UsersGroup'].includes(type));
    }
}
exports.TypesUserOrGroup = TypesUserOrGroup;
//# sourceMappingURL=Types.UserOrGroup.js.map