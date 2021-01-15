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
exports.CatalogSalaryProject = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogSalaryProject = class CatalogSalaryProject extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.company = null;
        this.bank = null;
        this.currency = null;
        this.OpenDate = new Date;
        this.BankBranch = '';
        this.BankBranchOffice = '';
        this.BankAccount = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.SalaryProject', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogSalaryProject.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, hiddenInList: false }),
    __metadata("design:type", Object)
], CatalogSalaryProject.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Bank', required: true, style: { width: '100px' } }),
    __metadata("design:type", Object)
], CatalogSalaryProject.prototype, "bank", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, style: { width: '100px' } }),
    __metadata("design:type", Object)
], CatalogSalaryProject.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', required: true, style: { width: '100px' } }),
    __metadata("design:type", Object)
], CatalogSalaryProject.prototype, "OpenDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogSalaryProject.prototype, "BankBranch", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogSalaryProject.prototype, "BankBranchOffice", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogSalaryProject.prototype, "BankAccount", void 0);
CatalogSalaryProject = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.SalaryProject',
        description: 'Зарплатный проект',
        icon: 'fa fa-list',
        menu: 'Зарплатные проекты',
    })
], CatalogSalaryProject);
exports.CatalogSalaryProject = CatalogSalaryProject;
//# sourceMappingURL=Catalog.SalaryProject.js.map