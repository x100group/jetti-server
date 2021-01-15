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
exports.CatalogCompany = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogCompany = class CatalogCompany extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.kind = 'ЮрЛицо';
        this.FullName = '';
        this.currency = null;
        this.prefix = '';
        this.Group = null;
        this.Intercompany = null;
        this.Country = null;
        this.BusinessCalendar = null;
        this.ResponsibilityCenter = null;
        this.AddressShipping = null;
        this.AddressBilling = null;
        this.Phone = null;
        this.Code1 = null;
        this.Code2 = null;
        this.Code3 = null;
        this.BC = '';
        this.timeZone = 'UTC';
        this.TaxOffice = null;
        this.GLN = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['ЮрЛицо', 'ИндПред'] }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "kind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "FullName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, label: 'default currency', style: { width: '100px' } }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "prefix", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company.Group', required: true }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "Group", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company' }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "Intercompany", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Country' }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "Country", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BusinessCalendar' }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "BusinessCalendar", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.ResponsibilityCenter', required: true, isProtected: true }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "ResponsibilityCenter", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "AddressShipping", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "AddressBilling", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "Phone", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "Code1", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "Code2", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "Code3", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }) // Код Бенефициара (для Казахастана)
    ,
    __metadata("design:type", Object)
], CatalogCompany.prototype, "BC", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', required: true, value: [
            'UTC',
            'Central European Standard Time',
            'Russian Standard Time',
            'E. Europe Standard Time',
            'US Eastern Standard Time'
        ]
    }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "timeZone", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.TaxOffice', hiddenInList: true }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "TaxOffice", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', readOnly: true, isAdditional: true }),
    __metadata("design:type", Object)
], CatalogCompany.prototype, "GLN", void 0);
CatalogCompany = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Company',
        description: 'Организация',
        icon: 'fa fa-list',
        menu: 'Организации',
        relations: [
            { name: 'Intercompany history', type: 'Register.Info.IntercompanyHistory', field: 'company.id' },
            { name: 'Departments', type: 'Catalog.Department', field: 'company' },
            { name: 'Bank accounts', type: 'Catalog.BankAccount', field: 'company' },
            { name: 'Acquiring terminals', type: 'Catalog.AcquiringTerminal', field: 'company' },
            { name: 'Cash registers', type: 'Catalog.CashRegister', field: 'company' },
            { name: 'Storehouses', type: 'Catalog.Storehouse', field: 'company' },
            { name: 'Responsible persons', type: 'Register.Info.CompanyResponsiblePersons', field: 'companyOrGroup.id' },
        ],
    })
], CatalogCompany);
exports.CatalogCompany = CatalogCompany;
//# sourceMappingURL=Catalog.Company.js.map