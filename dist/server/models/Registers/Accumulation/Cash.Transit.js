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
exports.RegisterAccumulationCashTransit = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationCashTransit = class RegisterAccumulationCashTransit extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.CompanyRecipient = null;
        this.currency = null;
        this.Sender = null;
        this.Recipient = null;
        this.CashFlow = null;
        this.Amount = 0;
        this.AmountInBalance = 0;
        this.AmountInAccounting = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashTransit.prototype, "CompanyRecipient", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashTransit.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashTransit.prototype, "Sender", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashTransit.prototype, "Recipient", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashFlow', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashTransit.prototype, "CashFlow", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashTransit.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashTransit.prototype, "AmountInBalance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCashTransit.prototype, "AmountInAccounting", void 0);
RegisterAccumulationCashTransit = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.Cash.Transit',
        description: 'Денежные средства в пути'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationCashTransit);
exports.RegisterAccumulationCashTransit = RegisterAccumulationCashTransit;
//# sourceMappingURL=Cash.Transit.js.map