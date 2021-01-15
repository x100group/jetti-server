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
exports.CatalogContractIntercompany = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogContractIntercompany = class CatalogContractIntercompany extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.company = null;
        this.KorrCompany = null;
        this.Status = 'OPEN';
        this.StartDate = null;
        this.EndDate = null;
        this.Amount = 0;
        this.CashFlow = null;
        this.currency = null;
        this.isDefault = false;
        this.notAccounting = false;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Contract.Intercompany', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogContractIntercompany.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, hiddenInList: false }),
    __metadata("design:type", Object)
], CatalogContractIntercompany.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, order: 1 }),
    __metadata("design:type", Object)
], CatalogContractIntercompany.prototype, "KorrCompany", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['OPEN', 'CLOSE'], required: true }),
    __metadata("design:type", Object)
], CatalogContractIntercompany.prototype, "Status", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', required: true }),
    __metadata("design:type", Object)
], CatalogContractIntercompany.prototype, "StartDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', required: false }),
    __metadata("design:type", Object)
], CatalogContractIntercompany.prototype, "EndDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: false }),
    __metadata("design:type", Object)
], CatalogContractIntercompany.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashFlow', required: false }),
    __metadata("design:type", Object)
], CatalogContractIntercompany.prototype, "CashFlow", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true }),
    __metadata("design:type", Object)
], CatalogContractIntercompany.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', required: false }),
    __metadata("design:type", Object)
], CatalogContractIntercompany.prototype, "isDefault", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'Ф2' }),
    __metadata("design:type", Object)
], CatalogContractIntercompany.prototype, "notAccounting", void 0);
CatalogContractIntercompany = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Contract.Intercompany',
        description: 'Договор между организациями',
        icon: 'fa fa-list',
        menu: 'Договоры между организациями',
        prefix: 'CONTRC-'
    })
], CatalogContractIntercompany);
exports.CatalogContractIntercompany = CatalogContractIntercompany;
//# sourceMappingURL=Catalog.Contract.Intercompany.js.map