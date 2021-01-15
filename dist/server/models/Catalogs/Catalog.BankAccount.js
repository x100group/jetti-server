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
exports.CatalogBankAccount = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogBankAccount = class CatalogBankAccount extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.currency = null;
        this.Department = null;
        this.company = null;
        this.Bank = null;
        this.isDefault = false;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BankAccount', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogBankAccount.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, style: { width: '100px' }, isProtected: true }),
    __metadata("design:type", Object)
], CatalogBankAccount.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department' }),
    __metadata("design:type", Object)
], CatalogBankAccount.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, hiddenInList: false, isProtected: true }),
    __metadata("design:type", Object)
], CatalogBankAccount.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Bank', required: true }),
    __metadata("design:type", Object)
], CatalogBankAccount.prototype, "Bank", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', required: false }),
    __metadata("design:type", Object)
], CatalogBankAccount.prototype, "isDefault", void 0);
CatalogBankAccount = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.BankAccount',
        description: 'Банковский счет',
        icon: 'fa fa-list',
        menu: 'Банковкие счета',
        prefix: 'BANK-',
        dimensions: [
            { company: 'Catalog.Company' }
        ]
    })
], CatalogBankAccount);
exports.CatalogBankAccount = CatalogBankAccount;
//# sourceMappingURL=Catalog.BankAccount.js.map