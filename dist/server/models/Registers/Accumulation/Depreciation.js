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
exports.RegisterAccumulationDepreciation = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationDepreciation = class RegisterAccumulationDepreciation extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.OperationType = null;
        this.currency = null;
        this.Department = null;
        this.ResponsiblePerson = null;
        this.OE = null;
        this.Amount = 0;
        this.AmountInBalance = 0;
        this.AmountInAccounting = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Type', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationDepreciation.prototype, "OperationType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationDepreciation.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationDepreciation.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationDepreciation.prototype, "ResponsiblePerson", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.ObjectsExploitation', required: true }),
    __metadata("design:type", Object)
], RegisterAccumulationDepreciation.prototype, "OE", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationDepreciation.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationDepreciation.prototype, "AmountInBalance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationDepreciation.prototype, "AmountInAccounting", void 0);
RegisterAccumulationDepreciation = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.Depreciation',
        description: 'Амортизация'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationDepreciation);
exports.RegisterAccumulationDepreciation = RegisterAccumulationDepreciation;
//# sourceMappingURL=Depreciation.js.map