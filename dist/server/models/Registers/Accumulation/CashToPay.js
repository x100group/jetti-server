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
exports.RegisterAccumulationCashToPay = void 0;
const jetti_middle_1 = require("jetti-middle");
let RegisterAccumulationCashToPay = class RegisterAccumulationCashToPay extends jetti_middle_1.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.currency = null;
        this.CashFlow = null;
        this.CashRequest = null;
        this.Contract = null;
        this.BankAccountPerson = null;
        this.Department = null;
        this.OperationType = '';
        this.Loan = null;
        this.CashOrBank = null;
        this.CashRecipient = null;
        this.ExpenseOrBalance = null;
        this.ExpenseAnalytics = null;
        this.BalanceAnalytics = null;
        this.PayDay = new Date();
        this.Amount = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashFlow', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "CashFlow", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Document.CashRequest', required: true, dimension: true, isIndexed: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "CashRequest", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.CounterpartieOrPersonContract', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "Contract", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person.BankAccount', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "BankAccountPerson", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "OperationType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Loan', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "Loan", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.CashOrBank', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "CashOrBank", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.CashRecipient', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "CashRecipient", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.ExpenseOrBalanceOrIncome', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "ExpenseOrBalance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Expense.Analytics', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "ExpenseAnalytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Balance.Analytics', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "BalanceAnalytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "PayDay", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashToPay.prototype, "Amount", void 0);
RegisterAccumulationCashToPay = __decorate([
    jetti_middle_1.JRegisterAccumulation({
        type: 'Register.Accumulation.CashToPay',
        description: 'Денежные средства к выплате'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationCashToPay);
exports.RegisterAccumulationCashToPay = RegisterAccumulationCashToPay;
//# sourceMappingURL=CashToPay.js.map