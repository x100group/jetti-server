"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesCounterpartieOrPerson = void 0;
const documents_factory_1 = require("../documents.factory");
const TypesBase_1 = require("./TypesBase");
class TypesCounterpartieOrPerson extends TypesBase_1.TypesBase {
    getTypes() {
        return documents_factory_1.RegisteredDocumentsTypes(type => ['Catalog.Counterpartie', 'Catalog.Person'].includes(type));
    }
}
exports.TypesCounterpartieOrPerson = TypesCounterpartieOrPerson;
//# sourceMappingURL=Types.CounterpartieOrPerson.js.map