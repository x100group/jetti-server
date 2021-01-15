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
exports.RegisterInfoStaffingTableHistory = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoStaffingTableHistory = class RegisterInfoStaffingTableHistory extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.Department = null;
        this.DepartmentCompany = null;
        this.StaffingPosition = null;
        this.SalaryAnalytic = null;
        this.Currency = null;
        this.AccrualType = null;
        this.ActivationDate = null;
        this.CloseDate = null;
        this.Qty = 0;
        this.Cost = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department' }),
    __metadata("design:type", Object)
], RegisterInfoStaffingTableHistory.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department.Company' }),
    __metadata("design:type", Object)
], RegisterInfoStaffingTableHistory.prototype, "DepartmentCompany", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.StaffingTable' }),
    __metadata("design:type", Object)
], RegisterInfoStaffingTableHistory.prototype, "StaffingPosition", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Salary.Analytics' }),
    __metadata("design:type", Object)
], RegisterInfoStaffingTableHistory.prototype, "SalaryAnalytic", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency' }),
    __metadata("design:type", Object)
], RegisterInfoStaffingTableHistory.prototype, "Currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['FIXED', 'PER_HOURS_RATE'] }),
    __metadata("design:type", Object)
], RegisterInfoStaffingTableHistory.prototype, "AccrualType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], RegisterInfoStaffingTableHistory.prototype, "ActivationDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], RegisterInfoStaffingTableHistory.prototype, "CloseDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], RegisterInfoStaffingTableHistory.prototype, "Qty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], RegisterInfoStaffingTableHistory.prototype, "Cost", void 0);
RegisterInfoStaffingTableHistory = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.StaffingTableHistory',
        description: 'История штатного расписания'
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoStaffingTableHistory);
exports.RegisterInfoStaffingTableHistory = RegisterInfoStaffingTableHistory;
//# sourceMappingURL=StaffingTableHistory.js.map