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
exports.CatalogStaffingTable = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogStaffingTable = class CatalogStaffingTable extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.code = '';
        this.isfolder = false;
        this.description = '';
        this.JobTitle = null;
        this.Department = null;
        this.DepartmentCompany = null;
        this.Currency = null;
        this.ActivationDate = null;
        this.CloseDate = null;
        this.Qty = 0;
        this.Cost = 0;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.StaffingTable', hiddenInList: false }),
    __metadata("design:type", Object)
], CatalogStaffingTable.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true, order: 2, style: { width: '135px' }, isUnique: true }),
    __metadata("design:type", Object)
], CatalogStaffingTable.prototype, "code", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', hidden: false, hiddenInList: true, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogStaffingTable.prototype, "isfolder", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 3, label: 'description (auto)' }),
    __metadata("design:type", Object)
], CatalogStaffingTable.prototype, "description", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.JobTitle', required: true, isProtected: true }),
    __metadata("design:type", Object)
], CatalogStaffingTable.prototype, "JobTitle", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', required: true, isProtected: true, label: 'Подразделение (фин. структура)' }),
    __metadata("design:type", Object)
], CatalogStaffingTable.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department.Company', required: true, isProtected: true, label: 'Подразделение (орг. структура)', storageType: 'all' }),
    __metadata("design:type", Object)
], CatalogStaffingTable.prototype, "DepartmentCompany", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, isProtected: true }),
    __metadata("design:type", Object)
], CatalogStaffingTable.prototype, "Currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], CatalogStaffingTable.prototype, "ActivationDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], CatalogStaffingTable.prototype, "CloseDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], CatalogStaffingTable.prototype, "Qty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], CatalogStaffingTable.prototype, "Cost", void 0);
CatalogStaffingTable = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.StaffingTable',
        description: 'Позиция штатного расписания',
        icon: 'fa fa-list',
        menu: 'Штатное расписание',
        prefix: 'ST-',
        hierarchy: 'folders',
        dimensions: [{ JobTitle: 'Catalog.JobTitle' }, { Department: 'Catalog.Department' }],
        relations: [{ name: 'Employee history', type: 'Register.Info.EmployeeHistory', field: '[StaffingPosition].id' }]
    })
], CatalogStaffingTable);
exports.CatalogStaffingTable = CatalogStaffingTable;
//# sourceMappingURL=Catalog.StaffingTable.js.map