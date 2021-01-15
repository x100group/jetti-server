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
exports.RegisterAccumulationSalary = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationSalary = class RegisterAccumulationSalary extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.currency = null;
        this.KorrCompany = null;
        this.Department = null;
        this.Person = null;
        this.Employee = null;
        this.SalaryKind = 'INCOME';
        this.Analytics = null;
        this.PL = null;
        this.PLAnalytics = null;
        this.Status = 'APPROVED';
        this.IsPortal = false;
        this.Amount = 0;
        this.AmountInBalance = 0;
        this.AmountInAccounting = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "KorrCompany", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "Person", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "Employee", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', dimension: true, value: ['INCOME', 'EXPENSE', 'PAID'] }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "SalaryKind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Salary.Analytics', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "Analytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', required: false, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "PL", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', required: false, dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "PLAnalytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['APPROVED', 'PREPARED'], dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "Status", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "IsPortal", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "AmountInBalance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationSalary.prototype, "AmountInAccounting", void 0);
RegisterAccumulationSalary = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.Salary',
        description: 'Расчеты с сотрудниками'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationSalary);
exports.RegisterAccumulationSalary = RegisterAccumulationSalary;
//# sourceMappingURL=Salary.js.map