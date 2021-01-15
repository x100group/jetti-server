"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesCompanyOrCompanyGroup = void 0;
const documents_factory_1 = require("../documents.factory");
const TypesBase_1 = require("./TypesBase");
class TypesCompanyOrCompanyGroup extends TypesBase_1.TypesBase {
    getTypes() {
        return documents_factory_1.RegisteredDocumentsTypes(type => ['Catalog.Company', 'Catalog.Company.Group']
            .includes(type));
    }
}
exports.TypesCompanyOrCompanyGroup = TypesCompanyOrCompanyGroup;
//# sourceMappingURL=Types.CompanyOrCompanyGroup.js.map