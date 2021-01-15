"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesExpenseOrIncome = void 0;
const documents_factory_1 = require("../documents.factory");
const TypesBase_1 = require("./TypesBase");
class TypesExpenseOrIncome extends TypesBase_1.TypesBase {
    getTypes() {
        return documents_factory_1.RegisteredDocumentsTypes(type => ['Catalog.Expense', 'Catalog.Income'].includes(type));
    }
}
exports.TypesExpenseOrIncome = TypesExpenseOrIncome;
//# sourceMappingURL=Types.ExpenseOrIncome.js.map