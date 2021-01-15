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
exports.CatalogCounterpartieBankAccount = void 0;
const jetti_middle_1 = require("jetti-middle");
const Catalog_BankAccount_1 = require("./Catalog.BankAccount");
let CatalogCounterpartieBankAccount = class CatalogCounterpartieBankAccount extends Catalog_BankAccount_1.CatalogBankAccount {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.owner = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Counterpartie.BankAccount', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogCounterpartieBankAccount.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.CounterpartieOrPerson', required: true, order: 1 }),
    __metadata("design:type", Object)
], CatalogCounterpartieBankAccount.prototype, "owner", void 0);
CatalogCounterpartieBankAccount = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Counterpartie.BankAccount',
        description: 'Банковский счет контрагента',
        icon: 'fa fa-list',
        menu: 'Банк. счета контрагента',
        prefix: 'BANK.С-'
    })
], CatalogCounterpartieBankAccount);
exports.CatalogCounterpartieBankAccount = CatalogCounterpartieBankAccount;
//# sourceMappingURL=Catalog.Counterpartie.BankAccount.js.map