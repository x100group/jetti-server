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
exports.RegisterAccumulationAP = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationAP = class RegisterAccumulationAP extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.currency = null;
        this.Department = null;
        this.AO = null;
        this.Supplier = null;
        this.PayDay = new Date();
        this.Amount = 0;
        this.AmountInBalance = 0;
        this.AmountInAccounting = 0;
        this.AmountToPay = 0;
        this.AmountIsPaid = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAP.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department' }),
    __metadata("design:type", Object)
], RegisterAccumulationAP.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAP.prototype, "AO", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Counterpartie', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAP.prototype, "Supplier", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], RegisterAccumulationAP.prototype, "PayDay", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAP.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAP.prototype, "AmountInBalance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAP.prototype, "AmountInAccounting", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAP.prototype, "AmountToPay", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationAP.prototype, "AmountIsPaid", void 0);
RegisterAccumulationAP = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.AP',
        description: 'Расчеты с поставщиками'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationAP);
exports.RegisterAccumulationAP = RegisterAccumulationAP;
//# sourceMappingURL=AP.js.map