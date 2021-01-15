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
exports.RegisterAccumulationBudgetItemTurnover = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationBudgetItemTurnover = class RegisterAccumulationBudgetItemTurnover extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.Department = null;
        this.Scenario = null;
        this.BudgetItem = null;
        this.Anatitic1 = null;
        this.Anatitic2 = null;
        this.Anatitic3 = null;
        this.Anatitic4 = null;
        this.Anatitic5 = null;
        this.currency = null;
        this.Amount = 0;
        this.AmountInScenatio = 0;
        this.AmountInCurrency = 0;
        this.AmountInAccounting = 0;
        this.Qty = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Scenario', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "Scenario", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BudgetItem', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "BudgetItem", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog' }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "Anatitic1", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "Anatitic2", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog' }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "Anatitic3", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog' }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "Anatitic4", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog' }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "Anatitic5", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "AmountInScenatio", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "AmountInCurrency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "AmountInAccounting", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationBudgetItemTurnover.prototype, "Qty", void 0);
RegisterAccumulationBudgetItemTurnover = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.BudgetItemTurnover',
        description: 'Обороты бюджетов'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationBudgetItemTurnover);
exports.RegisterAccumulationBudgetItemTurnover = RegisterAccumulationBudgetItemTurnover;
//# sourceMappingURL=BudgetItemTurnover.js.map