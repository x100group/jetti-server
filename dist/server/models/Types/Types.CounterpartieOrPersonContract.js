"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesCounterpartieOrPersonContract = void 0;
const documents_factory_1 = require("../documents.factory");
const TypesBase_1 = require("./TypesBase");
class TypesCounterpartieOrPersonContract extends TypesBase_1.TypesBase {
    getTypes() {
        return documents_factory_1.RegisteredDocumentsTypes(type => ['Catalog.Contract', 'Catalog.Person.Contract'].includes(type));
    }
}
exports.TypesCounterpartieOrPersonContract = TypesCounterpartieOrPersonContract;
//# sourceMappingURL=Types.CounterpartieOrPersonContract.js.map