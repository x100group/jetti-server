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
exports.CatalogPerson = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogPerson = class CatalogPerson extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Gender = null;
        this.FirstName = null;
        this.LastName = null;
        this.MiddleName = null;
        this.Code1 = null;
        this.Code2 = null;
        this.Address = null;
        this.AddressResidence = '';
        this.City = '';
        this.Phone = null;
        this.Email = null;
        this.EmploymentDate = null;
        this.Department = null;
        this.JobTitle = null;
        this.Country = null;
        this.Profile = null;
        this.DocumentType = null;
        this.DocumentCode = '';
        this.DocumentNumber = '';
        this.DocumentDate = null;
        this.DocumentAuthority = '';
        this.AccountAD = '';
        this.Pincode = '';
        this.Fired = false;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['MALE', 'FEMALE', 'SELF'] }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "Gender", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "FirstName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "LastName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "MiddleName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', isIndexed: true }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "Code1", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "Code2", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "Address", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "AddressResidence", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "City", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "Phone", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "Email", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "EmploymentDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', isIndexed: true }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.JobTitle' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "JobTitle", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Country' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "Country", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', isIndexed: true }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "Profile", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.PersonIdentity' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "DocumentType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "DocumentCode", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "DocumentNumber", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "DocumentDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "DocumentAuthority", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', isAdditional: true, isIndexed: true }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "AccountAD", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Pincode', validators: [{ key: 'maxLength', value: 4 }] }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "Pincode", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', hiddenInList: false, isAdditional: true }),
    __metadata("design:type", Object)
], CatalogPerson.prototype, "Fired", void 0);
CatalogPerson = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Person',
        description: 'Физлицо',
        icon: 'fa fa-list',
        menu: 'Физлица',
        prefix: 'PERS-',
        relations: [
            { name: 'Contract', type: 'Catalog.Person.Contract', field: 'owner' },
            { name: 'BankAccount', type: 'Catalog.Person.BankAccount', field: 'owner' },
            { name: 'Employee', type: 'Catalog.Employee', field: 'Person' },
            { name: 'Loan', type: 'Catalog.Loan', field: 'owner' }
        ],
        dimensions: [
            { Department: 'Catalog.Department' },
            { JobTitle: 'Catalog.JobTitle' }
        ]
    })
], CatalogPerson);
exports.CatalogPerson = CatalogPerson;
//# sourceMappingURL=Catalog.Person.js.map