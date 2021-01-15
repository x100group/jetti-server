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
exports.RegisterAccumulationCash = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationCash = class RegisterAccumulationCash extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.currency = null;
        this.CashRegister = null;
        this.CashFlow = null;
        this.Analytics = null;
        this.Amount = 0;
        this.AmountInBalance = 0;
        this.AmountInAccounting = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCash.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashRegister', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCash.prototype, "CashRegister", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashFlow', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCash.prototype, "CashFlow", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCash.prototype, "Analytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCash.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCash.prototype, "AmountInBalance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationCash.prototype, "AmountInAccounting", void 0);
RegisterAccumulationCash = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.Cash',
        description: 'Денежные средства наличные'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationCash);
exports.RegisterAccumulationCash = RegisterAccumulationCash;
//# sourceMappingURL=Cash.js.map