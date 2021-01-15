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
exports.RegisterInfoEmploymentType = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoEmploymentType = class RegisterInfoEmploymentType extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.EmploymentType = null;
        this.Employee = null;
        this.Person = null;
        this.Department = null;
        this.DepartmentCompany = null;
        this.JobTitle = null;
        this.StaffingPosition = null;
        this.SalaryRate = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['MAIN', 'INTERNAL', 'EXTERNAL'] }),
    __metadata("design:type", Object)
], RegisterInfoEmploymentType.prototype, "EmploymentType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Employee' }),
    __metadata("design:type", Object)
], RegisterInfoEmploymentType.prototype, "Employee", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person' }),
    __metadata("design:type", Object)
], RegisterInfoEmploymentType.prototype, "Person", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department' }),
    __metadata("design:type", Object)
], RegisterInfoEmploymentType.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department.Company' }),
    __metadata("design:type", Object)
], RegisterInfoEmploymentType.prototype, "DepartmentCompany", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.JobTitle' }),
    __metadata("design:type", Object)
], RegisterInfoEmploymentType.prototype, "JobTitle", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.StaffingTable' }),
    __metadata("design:type", Object)
], RegisterInfoEmploymentType.prototype, "StaffingPosition", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], RegisterInfoEmploymentType.prototype, "SalaryRate", void 0);
RegisterInfoEmploymentType = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.EmploymentType',
        description: 'Виды занятости сотрудников'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoEmploymentType);
exports.RegisterInfoEmploymentType = RegisterInfoEmploymentType;
//# sourceMappingURL=EmploymentType.js.map