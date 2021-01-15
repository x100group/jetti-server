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
exports.CatalogBudgetItem = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogBudgetItem = class CatalogBudgetItem extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.parent2 = null;
        this.isfolder = false;
        this.UnaryOperator = '';
        this.DescriptionENG = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BudgetItem', order: 10, storageType: 'all', hiddenInForm: true }),
    __metadata("design:type", Object)
], CatalogBudgetItem.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BudgetItem', order: 11, storageType: 'all', hiddenInForm: true }),
    __metadata("design:type", Object)
], CatalogBudgetItem.prototype, "parent2", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', hiddenInList: false }),
    __metadata("design:type", Object)
], CatalogBudgetItem.prototype, "isfolder", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', useIn: 'all', value: [
            '+',
            '-',
            '*',
            '/',
            '~',
        ] }),
    __metadata("design:type", Object)
], CatalogBudgetItem.prototype, "UnaryOperator", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogBudgetItem.prototype, "DescriptionENG", void 0);
CatalogBudgetItem = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.BudgetItem',
        description: 'Budget items',
        icon: 'fa fa-list',
        menu: 'Статьи бюджета',
        hierarchy: 'all',
        dimensions: [
            { parent: 'Catalog.BudgetItem' },
            { parent2: 'Catalog.BudgetItem' },
            { UnaryOperator: 'enum' },
        ]
    })
], CatalogBudgetItem);
exports.CatalogBudgetItem = CatalogBudgetItem;
//# sourceMappingURL=Catalog.BudgetItem.js.map