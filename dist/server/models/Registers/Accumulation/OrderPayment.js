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
exports.RegisterAccumulationOrderPayment = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationOrderPayment = class RegisterAccumulationOrderPayment extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.PaymantKind = '';
        this.Customer = null;
        this.BankAccount = null;
        this.CashRegister = null;
        this.AcquiringTerminal = null;
        this.currency = null;
        this.Department = null;
        this.CashShift = 0;
        this.Amount = 0;
        this.AmountInBalance = 0;
        this.AmountInAccounting = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'string', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationOrderPayment.prototype, "PaymantKind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Counterpartie', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationOrderPayment.prototype, "Customer", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BankAccount', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationOrderPayment.prototype, "BankAccount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashRegister', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationOrderPayment.prototype, "CashRegister", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.AcquiringTerminal', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationOrderPayment.prototype, "AcquiringTerminal", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationOrderPayment.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationOrderPayment.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], RegisterAccumulationOrderPayment.prototype, "CashShift", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationOrderPayment.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationOrderPayment.prototype, "AmountInBalance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationOrderPayment.prototype, "AmountInAccounting", void 0);
RegisterAccumulationOrderPayment = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.OrderPayment',
        description: 'Оплата заказов'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationOrderPayment);
exports.RegisterAccumulationOrderPayment = RegisterAccumulationOrderPayment;
//# sourceMappingURL=OrderPayment.js.map