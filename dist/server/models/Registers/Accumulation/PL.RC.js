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
exports.RegisterAccumulationPLRC = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationPLRC = class RegisterAccumulationPLRC extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.ResponsibilityCenter = null;
        this.Department = null;
        this.PL = null;
        this.Analytics = null;
        this.Analytics2 = null;
        this.Currency = null;
        this.Amount = 0;
        this.AmountRC = 0;
        this.Info = '';
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.ResponsibilityCenter', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPLRC.prototype, "ResponsibilityCenter", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPLRC.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPLRC.prototype, "PL", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPLRC.prototype, "Analytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPLRC.prototype, "Analytics2", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPLRC.prototype, "Currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPLRC.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationPLRC.prototype, "AmountRC", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], RegisterAccumulationPLRC.prototype, "Info", void 0);
RegisterAccumulationPLRC = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.PL.RC',
        description: 'Доходы/Расходы (ЦФО)'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationPLRC);
exports.RegisterAccumulationPLRC = RegisterAccumulationPLRC;
//# sourceMappingURL=PL.RC.js.map