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
exports.RegisterAccumulationAcquiring = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationAcquiring = class RegisterAccumulationAcquiring extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.AcquiringTerminal = null;
        this.AcquiringTerminalCode1 = '';
        this.OperationType = null;
        this.Department = null;
        this.CashFlow = null;
        this.PaymantCard = '';
        this.PayDay = new Date();
        this.currency = null;
        this.Amount = 0;
        this.AmountInBalance = 0;
        this.AmountOperation = 0;
        this.AmountPaid = 0;
        this.DateOperation = null;
        this.DatePaid = null;
        this.AuthorizationCode = '';
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.AcquiringTerminal', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "AcquiringTerminal", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Merchant' }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "AcquiringTerminalCode1", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Type', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "OperationType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashFlow', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "CashFlow", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "PaymantCard", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "PayDay", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "AmountInBalance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "AmountOperation", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "AmountPaid", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "DateOperation", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "DatePaid", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], RegisterAccumulationAcquiring.prototype, "AuthorizationCode", void 0);
RegisterAccumulationAcquiring = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.Acquiring',
        description: 'Расчеты по эквайрингу'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationAcquiring);
exports.RegisterAccumulationAcquiring = RegisterAccumulationAcquiring;
//# sourceMappingURL=Acquiring.js.map