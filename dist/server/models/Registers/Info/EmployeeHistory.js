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
exports.RegisterInfoEmployeeHistory = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoEmployeeHistory = class RegisterInfoEmployeeHistory extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.Employee = null;
        this.Person = null;
        this.Department = null;
        this.DepartmentCompany = null;
        this.JobTitle = null;
        this.StaffingPosition = null;
        this.OperationType = null;
        this.SalaryRate = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Employee' }),
    __metadata("design:type", Object)
], RegisterInfoEmployeeHistory.prototype, "Employee", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person' }),
    __metadata("design:type", Object)
], RegisterInfoEmployeeHistory.prototype, "Person", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department' }),
    __metadata("design:type", Object)
], RegisterInfoEmployeeHistory.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department.Company' }),
    __metadata("design:type", Object)
], RegisterInfoEmployeeHistory.prototype, "DepartmentCompany", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.JobTitle' }),
    __metadata("design:type", Object)
], RegisterInfoEmployeeHistory.prototype, "JobTitle", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.StaffingTable' }),
    __metadata("design:type", Object)
], RegisterInfoEmployeeHistory.prototype, "StaffingPosition", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Type' }),
    __metadata("design:type", Object)
], RegisterInfoEmployeeHistory.prototype, "OperationType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], RegisterInfoEmployeeHistory.prototype, "SalaryRate", void 0);
RegisterInfoEmployeeHistory = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.EmployeeHistory',
        description: 'Кадровая история'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoEmployeeHistory);
exports.RegisterInfoEmployeeHistory = RegisterInfoEmployeeHistory;
//# sourceMappingURL=EmployeeHistory.js.map