"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesCompanyOrCounterpartieOrPersonOrRetailClient = void 0;
const documents_factory_1 = require("../documents.factory");
const TypesBase_1 = require("./TypesBase");
class TypesCompanyOrCounterpartieOrPersonOrRetailClient extends TypesBase_1.TypesBase {
    getTypes() {
        return documents_factory_1.RegisteredDocumentsTypes(type => ['Catalog.Company', 'Catalog.Counterpartie', 'Catalog.RetailClient', 'Catalog.Person']
            .includes(type));
    }
}
exports.TypesCompanyOrCounterpartieOrPersonOrRetailClient = TypesCompanyOrCounterpartieOrPersonOrRetailClient;
//# sourceMappingURL=Types.CompanyOrCounterpartieOrPersonOrRetailClient.js.map