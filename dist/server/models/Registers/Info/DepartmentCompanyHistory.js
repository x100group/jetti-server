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
exports.DepartmentCompanyHistory = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let DepartmentCompanyHistory = class DepartmentCompanyHistory extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.Department = null;
        this.company = null;
        this.company2 = null;
        this.InvestorGroup = null;
        this.TypeFranchise = 'Own organization';
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', required: true, unique: true, order: 1 }),
    __metadata("design:type", Object)
], DepartmentCompanyHistory.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, unique: true, order: 2 }),
    __metadata("design:type", Object)
], DepartmentCompanyHistory.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', unique: true, order: 3 }),
    __metadata("design:type", Object)
], DepartmentCompanyHistory.prototype, "company2", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.InvestorGroup', unique: true, order: 4 }),
    __metadata("design:type", Object)
], DepartmentCompanyHistory.prototype, "InvestorGroup", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['Own organization', 'Classic franchise', 'Management franchise'], order: 4 }),
    __metadata("design:type", Object)
], DepartmentCompanyHistory.prototype, "TypeFranchise", void 0);
DepartmentCompanyHistory = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.DepartmentCompanyHistory',
        description: 'История изменения организации в подразделении',
    }),
    __metadata("design:paramtypes", [Object])
], DepartmentCompanyHistory);
exports.DepartmentCompanyHistory = DepartmentCompanyHistory;
//# sourceMappingURL=DepartmentCompanyHistory.js.map