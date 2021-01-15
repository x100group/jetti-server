"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesExpenseOrBalanceOrIncome = void 0;
const documents_factory_1 = require("../documents.factory");
const TypesBase_1 = require("./TypesBase");
class TypesExpenseOrBalanceOrIncome extends TypesBase_1.TypesBase {
    getTypes() {
        return documents_factory_1.RegisteredDocumentsTypes(type => ['Catalog.Expense', 'Catalog.Balance', 'Catalog.Income'].includes(type));
    }
}
exports.TypesExpenseOrBalanceOrIncome = TypesExpenseOrBalanceOrIncome;
//# sourceMappingURL=Types.ExpenseOrBalanceOrIncome.js.map