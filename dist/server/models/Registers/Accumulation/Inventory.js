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
exports.RegisterAccumulationInventory = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationInventory = class RegisterAccumulationInventory extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.OperationType = null;
        this.Expense = null;
        this.ExpenseAnalytics = null;
        this.Income = null;
        this.IncomeAnalytics = null;
        this.BalanceIn = null;
        this.BalanceInAnalytics = null;
        this.BalanceOut = null;
        this.BalanceOutAnalytics = null;
        this.Storehouse = null;
        this.SKU = null;
        this.batch = null;
        this.Department = null;
        this.Cost = 0;
        this.Qty = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Type' }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "OperationType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Expense' }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "Expense", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Expense.Analytics' }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "ExpenseAnalytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Income' }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "Income", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Income' }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "IncomeAnalytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Balance' }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "BalanceIn", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Balance.Analytics' }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "BalanceInAnalytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Balance' }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "BalanceOut", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Balance.Analytics' }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "BalanceOutAnalytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Storehouse', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "Storehouse", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "SKU", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document', required: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "batch", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', required: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "Cost", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationInventory.prototype, "Qty", void 0);
RegisterAccumulationInventory = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.Inventory',
        description: 'Товары на складах'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationInventory);
exports.RegisterAccumulationInventory = RegisterAccumulationInventory;
//# sourceMappingURL=Inventory.js.map