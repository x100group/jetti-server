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
exports.RegisterAccumulationInvestmentAnalytics = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationInvestmentAnalytics = class RegisterAccumulationInvestmentAnalytics extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.Department = null;
        this.SourceTransaction = 'JETTI';
        this.CreditTransaction = null;
        this.OperationType = null;
        this.Investor = null;
        this.CompanyProduct = null;
        this.Product = null;
        this.Qty = 0;
        this.CurrencyProduct = null;
        this.AmountProduct = 0;
        this.PaymentSource = null;
        this.CurrencySource = null;
        this.AmountSource = 0;
        this.CompanyLoan = null;
        this.Loan = null;
        this.CurrencyLoan = null;
        this.AmountLoan = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department' }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', dimension: true, value: ['ALLUNIC', 'JETTI', 'X100FINANCE'] }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "SourceTransaction", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Document.Operation', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "CreditTransaction", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Type', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "OperationType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.CounterpartieOrPerson', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "Investor", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "CompanyProduct", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "Product", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "Qty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "CurrencyProduct", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "AmountProduct", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "PaymentSource", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "CurrencySource", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "AmountSource", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "CompanyLoan", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Loan', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "Loan", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "CurrencyLoan", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInvestmentAnalytics.prototype, "AmountLoan", void 0);
RegisterAccumulationInvestmentAnalytics = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.Investment.Analytics',
        description: 'Аналитика инвестиций'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationInvestmentAnalytics);
exports.RegisterAccumulationInvestmentAnalytics = RegisterAccumulationInvestmentAnalytics;
//# sourceMappingURL=Investment.Analytics.js.map