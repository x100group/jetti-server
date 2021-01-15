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
exports.RegisterInfoCompanyResponsiblePersons = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoCompanyResponsiblePersons = class RegisterInfoCompanyResponsiblePersons extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.companyOrGroup = null;
        this.Department = null;
        this.Loan = null;
        this.User = null;
        this.isActive = false;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Types.CompanyOrCompanyGroup', dimension: true }),
    __metadata("design:type", Object)
], RegisterInfoCompanyResponsiblePersons.prototype, "companyOrGroup", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', dimension: true }),
    __metadata("design:type", Object)
], RegisterInfoCompanyResponsiblePersons.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.CounterpartieOrPerson', resource: true }),
    __metadata("design:type", Object)
], RegisterInfoCompanyResponsiblePersons.prototype, "Loan", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.User', resource: true, required: true }),
    __metadata("design:type", Object)
], RegisterInfoCompanyResponsiblePersons.prototype, "User", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', resource: true }),
    __metadata("design:type", Object)
], RegisterInfoCompanyResponsiblePersons.prototype, "isActive", void 0);
RegisterInfoCompanyResponsiblePersons = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.CompanyResponsiblePersons',
        description: 'Ответственные лица организаций',
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoCompanyResponsiblePersons);
exports.RegisterInfoCompanyResponsiblePersons = RegisterInfoCompanyResponsiblePersons;
//# sourceMappingURL=CompanyResponsiblePersons.js.map