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
exports.RegisterAccumulationLoan = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationLoan = class RegisterAccumulationLoan extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.Loan = null;
        this.Counterpartie = null;
        this.CashFlow = null;
        this.currency = null;
        this.PaymentKind = 'BODY';
        this.Amount = 0;
        this.AmountInBalance = 0;
        this.AmountInAccounting = 0;
        this.AmountToPay = 0;
        this.AmountIsPaid = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Loan', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationLoan.prototype, "Loan", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.CounterpartieOrPerson', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationLoan.prototype, "Counterpartie", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashFlow', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationLoan.prototype, "CashFlow", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true, isProtected: true }),
    __metadata("design:type", Object)
], RegisterAccumulationLoan.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', required: true, value: [
            'BODY',
            'PERCENT',
            'SHARE',
            'CUSTOM1'
        ]
    }),
    __metadata("design:type", Object)
], RegisterAccumulationLoan.prototype, "PaymentKind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationLoan.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationLoan.prototype, "AmountInBalance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationLoan.prototype, "AmountInAccounting", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationLoan.prototype, "AmountToPay", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationLoan.prototype, "AmountIsPaid", void 0);
RegisterAccumulationLoan = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.Loan',
        description: 'Расчеты по кредитам и депозитам'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationLoan);
exports.RegisterAccumulationLoan = RegisterAccumulationLoan;
//# sourceMappingURL=Loan.js.map