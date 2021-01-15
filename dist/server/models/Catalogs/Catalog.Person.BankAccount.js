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
exports.CatalogPersonBankAccount = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogPersonBankAccount = class CatalogPersonBankAccount extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.company = null;
        this.owner = null;
        this.Bank = null;
        this.SalaryProject = null;
        this.OpenDate = new Date;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person.BankAccount', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogPersonBankAccount.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', hiddenInForm: false }),
    __metadata("design:type", Object)
], CatalogPersonBankAccount.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person', required: true, order: 1 }),
    __metadata("design:type", Object)
], CatalogPersonBankAccount.prototype, "owner", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Bank', required: false }),
    __metadata("design:type", Object)
], CatalogPersonBankAccount.prototype, "Bank", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.SalaryProject', required: false }),
    __metadata("design:type", Object)
], CatalogPersonBankAccount.prototype, "SalaryProject", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', required: false }),
    __metadata("design:type", Object)
], CatalogPersonBankAccount.prototype, "OpenDate", void 0);
CatalogPersonBankAccount = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Person.BankAccount',
        description: 'Лицевой счет',
        icon: 'fa fa-list',
        menu: 'Лицевые счета',
        prefix: 'BANK.P-',
        dimensions: [
            { SalaryProject: 'Catalog.SalaryProject' }
        ]
    })
], CatalogPersonBankAccount);
exports.CatalogPersonBankAccount = CatalogPersonBankAccount;
//# sourceMappingURL=Catalog.Person.BankAccount.js.map