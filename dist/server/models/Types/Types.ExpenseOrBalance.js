"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documents_factory_1 = require("../documents.factory");
const TypesBase_1 = require("./TypesBase");
class TypesExpenseOrBalance extends TypesBase_1.TypesBase {
    getTypes() {
        return documents_factory_1.RegisteredDocument()
            .filter(d => d.type.startsWith('Catalog.Expense') || d.type.startsWith('Catalog.Balance'))
            .map(e => e.type);
    }
}
exports.TypesExpenseOrBalance = TypesExpenseOrBalance;
//# sourceMappingURL=Types.ExpenseOrBalance.js.map