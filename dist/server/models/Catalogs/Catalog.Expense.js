"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogExpense = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogExpense = class CatalogExpense extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Account = null;
        this.BudgetItem = null;
        this.Assign = 'FINRES';
        this.DescriptionENG = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Expense', hiddenInList: true, order: -1, storageType: 'folders' }),
    __metadata("design:type", Object)
], CatalogExpense.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Account' }),
    __metadata("design:type", Object)
], CatalogExpense.prototype, "Account", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BudgetItem' }),
    __metadata("design:type", Object)
], CatalogExpense.prototype, "BudgetItem", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['FINRES', 'INVEST', 'COST', 'NOTASSIGN'] }),
    __metadata("design:type", Object)
], CatalogExpense.prototype, "Assign", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogExpense.prototype, "DescriptionENG", void 0);
CatalogExpense = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Expense',
        description: 'Статья расходов',
        icon: 'fa fa-list',
        menu: 'Статьи расходов',
        hierarchy: 'folders',
        relations: [
            { name: 'Expense analytics', type: 'Catalog.Expense.Analytics', field: 'parent' }
        ]
    })
], CatalogExpense);
exports.CatalogExpense = CatalogExpense;
//# sourceMappingURL=Catalog.Expense.js.map