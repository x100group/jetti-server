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
exports.RegisterInfoBudgetItemRule = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoBudgetItemRule = class RegisterInfoBudgetItemRule extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.BudgetItem = null;
        this.Scenario = null;
        this.Rule = '';
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BudgetItem', required: true }),
    __metadata("design:type", Object)
], RegisterInfoBudgetItemRule.prototype, "BudgetItem", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Scenario', required: true }),
    __metadata("design:type", Object)
], RegisterInfoBudgetItemRule.prototype, "Scenario", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'javascript' }),
    __metadata("design:type", Object)
], RegisterInfoBudgetItemRule.prototype, "Rule", void 0);
RegisterInfoBudgetItemRule = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.BudgetItemRule',
        description: 'Budget item rules history',
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoBudgetItemRule);
exports.RegisterInfoBudgetItemRule = RegisterInfoBudgetItemRule;
//# sourceMappingURL=BudgetItemRule.js.map