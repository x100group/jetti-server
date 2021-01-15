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
exports.CatalogDepartmentCompany = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogDepartmentCompany = class CatalogDepartmentCompany extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.isfolder = false;
        this.kind = 'NONE';
        this.ShortName = '';
        this.SecurityGroup = '';
        this.StaffingPositionManager = null;
        this.StaffingPositionAssistant = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department.Company', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogDepartmentCompany.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', hidden: false, hiddenInList: true, order: 6, isIndexed: true }),
    __metadata("design:type", Object)
], CatalogDepartmentCompany.prototype, "isfolder", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['COMPANY', 'DEPARTMENT', 'NETWORK', 'REGION', 'BRANCH', 'SALEPOINT', 'NONE'], useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogDepartmentCompany.prototype, "kind", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'string', required: false, hiddenInList: false,
        label: 'Short name (max 30 symbols)', order: 4, validators: [{ key: 'maxLength', value: 30 }]
    }),
    __metadata("design:type", Object)
], CatalogDepartmentCompany.prototype, "ShortName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false, hiddenInList: false, label: 'Security group', order: 4, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogDepartmentCompany.prototype, "SecurityGroup", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.StaffingTable', label: 'Должность руководителя', useIn: 'all', order: 5 }),
    __metadata("design:type", Object)
], CatalogDepartmentCompany.prototype, "StaffingPositionManager", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.StaffingTable', label: 'Должность помощника руководителя', useIn: 'all', order: 6 }),
    __metadata("design:type", Object)
], CatalogDepartmentCompany.prototype, "StaffingPositionAssistant", void 0);
CatalogDepartmentCompany = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Department.Company',
        description: 'Подразделение организации',
        icon: 'fa fa-list',
        menu: 'Подразделения организаций',
        prefix: 'DEPC-',
        hierarchy: 'folders',
        relations: [
            { name: 'Employee history', type: 'Register.Info.EmployeeHistory', field: 'DepartmentCompany.id' },
        ],
        dimensions: [
            { company: 'Catalog.Company' }
        ]
    })
], CatalogDepartmentCompany);
exports.CatalogDepartmentCompany = CatalogDepartmentCompany;
//# sourceMappingURL=Catalog.Department.Company.js.map