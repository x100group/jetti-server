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
exports.RegisterAccumulationStaffingTable = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterAccumulationStaffingTable = class RegisterAccumulationStaffingTable extends jetti_middle_2.RegisterAccumulation {
    constructor(init) {
        super(init);
        this.Department = null;
        this.DepartmentCompany = null;
        this.StaffingTablePosition = null;
        this.Employee = null;
        this.Person = null;
        this.SalaryRate = 0;
        this.SalaryAnalytic = null;
        this.currency = null;
        this.Amount = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationStaffingTable.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department.Company', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationStaffingTable.prototype, "DepartmentCompany", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.StaffingTable', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationStaffingTable.prototype, "StaffingTablePosition", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Employee', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationStaffingTable.prototype, "Employee", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationStaffingTable.prototype, "Person", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationStaffingTable.prototype, "SalaryRate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Salary.Analytics', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationStaffingTable.prototype, "SalaryAnalytic", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', dimension: true }),
    __metadata("design:type", Object)
], RegisterAccumulationStaffingTable.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterAccumulationStaffingTable.prototype, "Amount", void 0);
RegisterAccumulationStaffingTable = __decorate([
    jetti_middle_2.JRegisterAccumulation({
        type: 'Register.Accumulation.StaffingTable',
        description: 'Занятые позиции штатного расписания'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterAccumulationStaffingTable);
exports.RegisterAccumulationStaffingTable = RegisterAccumulationStaffingTable;
//# sourceMappingURL=StaffingTable.js.map