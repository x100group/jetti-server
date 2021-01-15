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
exports.CatalogContract = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogContract = class CatalogContract extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.owner = null;
        this.company = null;
        this.Status = 'OPEN';
        this.kind = 'AR';
        this.StartDate = null;
        this.EndDate = null;
        this.Indulgence = 0;
        this.Amount = 0;
        this.BusinessDirection = null;
        this.CashFlow = null;
        this.currency = null;
        this.BankAccount = null;
        this.Manager = null;
        this.isDefault = false;
        this.notAccounting = false;
        this.RoyaltyArrangements = null;
        this.RoyaltyDelayTo = null;
        this.PaymentKC = 'NONE';
        this.RoyaltyPercent = 0;
        this.PaymentOVM = 'NONE';
        this.PaymentOKK = 'NONE';
        this.PaymentKRO = 'NONE';
        this.OtherServices = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Contract', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Counterpartie', required: true, order: 1, isProtected: true, isIndexed: true }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "owner", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', order: 4, required: true, style: { width: '250px' }, isProtected: true, onChangeServer: true }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['OPEN', 'CLOSE', 'PENDING'], required: true }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "Status", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['AR', 'AP', 'EXPORT', 'COMMISSIONER', 'COMMITENT', 'SELF_EMPLOYED'], required: true }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "kind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', required: true }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "StartDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', required: false }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "EndDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: false }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "Indulgence", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: false }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BusinessDirection', required: true }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "BusinessDirection", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashFlow', required: false }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "CashFlow", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, isProtected: true }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Counterpartie.BankAccount',
        owner: [
            { dependsOn: 'owner', filterBy: 'owner' },
            { dependsOn: 'сurrency', filterBy: 'currency' }
        ]
    }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "BankAccount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Manager', required: false }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "Manager", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', required: false }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "isDefault", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'Ф2' }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "notAccounting", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['GRID', 'FIX'], order: 777 }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "RoyaltyArrangements", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', order: 777 }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "RoyaltyDelayTo", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['INVOICE', 'ROYALTY', 'NONE'], order: 777 }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "PaymentKC", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Rotalty fix %', order: 777 }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "RoyaltyPercent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['INVOICE', 'ROYALTY', 'NONE'], order: 777 }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "PaymentOVM", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['INVOICE', 'ROYALTY', 'NONE'], order: 777 }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "PaymentOKK", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['INVOICE', 'ROYALTY', 'NONE'], order: 777 }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "PaymentKRO", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 777 }),
    __metadata("design:type", Object)
], CatalogContract.prototype, "OtherServices", void 0);
CatalogContract = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Contract',
        description: 'Договор контрагента',
        icon: 'fa fa-list',
        menu: 'Договоры контрагента',
        prefix: 'CONTR-',
        dimensions: [
            { company: 'Catalog.Company' }
        ]
    })
], CatalogContract);
exports.CatalogContract = CatalogContract;
//# sourceMappingURL=Catalog.Contract.js.map