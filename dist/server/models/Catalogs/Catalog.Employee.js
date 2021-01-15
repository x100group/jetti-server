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
exports.CatalogEmployee = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogEmployee = class CatalogEmployee extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Person = null;
        this.company = null;
        this.code = '';
        this.description = '';
        this.InnerPhone = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Employee', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogEmployee.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person', isProtected: true }),
    __metadata("design:type", Object)
], CatalogEmployee.prototype, "Person", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, isProtected: true }),
    __metadata("design:type", Object)
], CatalogEmployee.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true, order: 2, style: { width: '135px' }, isUnique: true }),
    __metadata("design:type", Object)
], CatalogEmployee.prototype, "code", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Description (auto)', order: 3, required: false, style: { width: '300px' } }),
    __metadata("design:type", Object)
], CatalogEmployee.prototype, "description", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Inner phone', order: 4, required: false }),
    __metadata("design:type", Object)
], CatalogEmployee.prototype, "InnerPhone", void 0);
CatalogEmployee = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Employee',
        description: 'Сотрудник',
        icon: 'fa fa-list',
        menu: 'Сотрудники',
        prefix: 'EMP-',
        relations: [{ name: 'Employee history', type: 'Register.Info.EmployeeHistory', field: '[Employee].id' }],
        dimensions: [{ Person: 'Catalog.Person' }]
    })
], CatalogEmployee);
exports.CatalogEmployee = CatalogEmployee;
//# sourceMappingURL=Catalog.Employee.js.map