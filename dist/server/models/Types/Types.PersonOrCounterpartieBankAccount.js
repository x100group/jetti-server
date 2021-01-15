"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesPersonOrCounterpartieBankAccount = void 0;
const documents_factory_1 = require("../documents.factory");
const TypesBase_1 = require("./TypesBase");
class TypesPersonOrCounterpartieBankAccount extends TypesBase_1.TypesBase {
    getTypes() {
        return documents_factory_1.RegisteredDocumentsTypes(type => ['Catalog.Counterpartie.BankAccount', 'Catalog.Person.BankAccount'].includes(type));
    }
}
exports.TypesPersonOrCounterpartieBankAccount = TypesPersonOrCounterpartieBankAccount;
//# sourceMappingURL=Types.PersonOrCounterpartieBankAccount.js.map