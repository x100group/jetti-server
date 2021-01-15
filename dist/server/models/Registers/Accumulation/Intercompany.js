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
exports.RegisterAccumulationIntercompany = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationIntercompany = class RegisterAccumulationIntercompany extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.Intercompany = null;
        this.LegalCompanySender = null;
        this.LegalCompanyRecipient = null;
        this.Contract = null;
        this.OperationType = null;
        this.Analytics = null;
        this.currency = null;
        this.Amount = 0;
        this.AmountInBalance = 0;
        this.AmountInAccounting = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationIntercompany.prototype, "Intercompany", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationIntercompany.prototype, "LegalCompanySender", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationIntercompany.prototype, "LegalCompanyRecipient", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Contract.Intercompany' }),
    __metadata("design:type", Object)
], RegisterAccumulationIntercompany.prototype, "Contract", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Type' }),
    __metadata("design:type", Object)
], RegisterAccumulationIntercompany.prototype, "OperationType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog' }),
    __metadata("design:type", Object)
], RegisterAccumulationIntercompany.prototype, "Analytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency' }),
    __metadata("design:type", Object)
], RegisterAccumulationIntercompany.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationIntercompany.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationIntercompany.prototype, "AmountInBalance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationIntercompany.prototype, "AmountInAccounting", void 0);
RegisterAccumulationIntercompany = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.Intercompany',
        description: 'Интеркомпани'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationIntercompany);
exports.RegisterAccumulationIntercompany = RegisterAccumulationIntercompany;
//# sourceMappingURL=Intercompany.js.map