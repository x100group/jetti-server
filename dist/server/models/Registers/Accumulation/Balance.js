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
exports.RegisterAccumulationBalance = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationBalance = class RegisterAccumulationBalance extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.Department = null;
        this.Balance = null;
        this.Analytics = null;
        this.Amount = 0;
        this.Info = '';
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department' }),
    __metadata("design:type", Object)
], RegisterAccumulationBalance.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Balance', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationBalance.prototype, "Balance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationBalance.prototype, "Analytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationBalance.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], RegisterAccumulationBalance.prototype, "Info", void 0);
RegisterAccumulationBalance = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.Balance',
        description: 'Активы/Пассивы'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationBalance);
exports.RegisterAccumulationBalance = RegisterAccumulationBalance;
//# sourceMappingURL=Balance.js.map