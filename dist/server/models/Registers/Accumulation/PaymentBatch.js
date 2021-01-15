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
exports.RegisterAccumulationPaymentBatch = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationPaymentBatch = class RegisterAccumulationPaymentBatch extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.PaymentsKind = 'AR';
        this.Counterpartie = null;
        this.ProductPackage = null;
        this.Product = null;
        this.Currency = null;
        this.PayDay = null;
        this.Qty = 0;
        this.Price = 0;
        this.Amount = 0;
        this.AmountInBalance = 0;
        this.batch = null;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['AP', 'AR', 'LOAN', 'PREPAY'], dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPaymentBatch.prototype, "PaymentsKind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.CompanyOrCounterpartieOrPersonOrRetailClient', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPaymentBatch.prototype, "Counterpartie", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product.Package', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPaymentBatch.prototype, "ProductPackage", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPaymentBatch.prototype, "Product", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPaymentBatch.prototype, "Currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], RegisterAccumulationPaymentBatch.prototype, "PayDay", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPaymentBatch.prototype, "Qty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPaymentBatch.prototype, "Price", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPaymentBatch.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPaymentBatch.prototype, "AmountInBalance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPaymentBatch.prototype, "batch", void 0);
RegisterAccumulationPaymentBatch = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.PaymentBatch',
        description: 'Партии предоплат'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationPaymentBatch);
exports.RegisterAccumulationPaymentBatch = RegisterAccumulationPaymentBatch;
//# sourceMappingURL=PaymentBatch.js.map