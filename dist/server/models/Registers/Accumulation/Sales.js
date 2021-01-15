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
exports.RegisterAccumulationSales = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationSales = class RegisterAccumulationSales extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.currency = null;
        this.Department = null;
        this.Customer = null;
        this.Product = null;
        this.Analytic = null;
        this.Manager = null;
        this.DeliveryType = '';
        this.OrderSource = '';
        this.RetailClient = null;
        this.AO = null;
        this.Storehouse = null;
        this.OpenTime = null;
        this.PrintTime = null;
        this.DeliverTime = null;
        this.BillTime = null;
        this.CloseTime = null;
        this.CashShift = 0;
        this.Cost = 0;
        this.Qty = 0;
        this.Amount = 0;
        this.Discount = 0;
        this.Tax = 0;
        this.AmountInDoc = 0;
        this.AmountInAR = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Counterpartie', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "Customer", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "Product", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "Analytic", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Manager', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "Manager", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['COURIER', 'CLIENT', 'EXTERNAL'] }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "DeliveryType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "OrderSource", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.RetailClient' }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "RetailClient", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document' }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "AO", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Storehouse', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "Storehouse", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'datetime' }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "OpenTime", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'datetime' }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "PrintTime", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'datetime' }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "DeliverTime", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'datetime' }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "BillTime", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'datetime' }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "CloseTime", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "CashShift", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "Cost", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "Qty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "Discount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "Tax", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "AmountInDoc", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSales.prototype, "AmountInAR", void 0);
RegisterAccumulationSales = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.Sales',
        description: 'Выручка и себестоимость продаж'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationSales);
exports.RegisterAccumulationSales = RegisterAccumulationSales;
//# sourceMappingURL=Sales.js.map