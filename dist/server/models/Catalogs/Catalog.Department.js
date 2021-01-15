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
exports.CatalogDepartment = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogDepartment = class CatalogDepartment extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.ShortName = '';
        this.BusinessRegion = null;
        this.BusinessCalendar = null;
        this.ResponsibilityCenter = null;
        this.OpeningDate = new Date();
        this.ClosingDate = new Date();
        this.TaxOffice = null;
        this.Manager = null;
        this.Brand = null;
        this.RetailNetwork = null;
        this.kind = null;
        this.Mail = '';
        this.Phone = '';
        this.Address = '';
        this.AddressLegal = '';
        this.Longitude = '';
        this.Latitude = '';
        this.AreaTotal = '';
        this.AreaTrade = '';
        this.IntegrationType = '';
        this.timeZone = 'UTC';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'string', required: false, hiddenInList: false,
        label: 'Short name (max 15 symbols)', order: 16, validators: [{ key: 'maxLength', value: 15 }]
    }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "ShortName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BusinessRegion' }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "BusinessRegion", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BusinessCalendar' }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "BusinessCalendar", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.ResponsibilityCenter', required: true, isProtected: true }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "ResponsibilityCenter", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', label: 'Opening date' }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "OpeningDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', label: 'Closing date' }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "ClosingDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.TaxOffice', hiddenInList: true }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "TaxOffice", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person' }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "Manager", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Brand' }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "Brand", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.RetailNetwork' }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "RetailNetwork", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department.Kind', required: true, isProtected: true }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "kind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "Mail", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "Phone", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "Address", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "AddressLegal", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false, isAdditional: true, label: 'Долгота' }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "Longitude", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false, isAdditional: true, label: 'Широта' }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "Latitude", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: false, isAdditional: true, label: 'Площадь (общая) кв.м.' }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "AreaTotal", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: false, isAdditional: true, label: 'Площадь (торговая) кв.м.' }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "AreaTrade", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['ANALYTICS', 'SYNTHETICS', 'NONE'] }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "IntegrationType", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', required: true, value: [
            'Dateline Standard Time',
            'UTC-11',
            'Aleutian Standard Time',
            'Hawaiian Standard Time',
            'Marquesas Standard Time',
            'Alaskan Standard Time',
            'UTC-09',
            'UTC-08',
            'Pacific Standard Time (Mexico)',
            'Pacific Standard Time',
            'US Mountain Standard Time',
            'Mountain Standard Time',
            'Mountain Standard Time (Mexico)',
            'Central Standard Time (Mexico)',
            'Canada Central Standard Time',
            'Central America Standard Time',
            'Central Standard Time',
            'Easter Island Standard Time',
            'SA Pacific Standard Time',
            'Eastern Standard Time',
            'Cuba Standard Time',
            'Haiti Standard Time',
            'US Eastern Standard Time',
            'Eastern Standard Time (Mexico)',
            'Paraguay Standard Time',
            'Atlantic Standard Time',
            'SA Western Standard Time',
            'Venezuela Standard Time',
            'Central Brazilian Standard Time',
            'Turks And Caicos Standard Time',
            'Pacific SA Standard Time',
            'Newfoundland Standard Time',
            'Tocantins Standard Time',
            'E. South America Standard Time',
            'Argentina Standard Time',
            'Greenland Standard Time',
            'SA Eastern Standard Time',
            'Montevideo Standard Time',
            'Bahia Standard Time',
            'Saint Pierre Standard Time',
            'UTC-02',
            'Mid-Atlantic Standard Time',
            'Azores Standard Time',
            'Cape Verde Standard Time',
            'UTC',
            'GMT Standard Time',
            'Morocco Standard Time',
            'Greenwich Standard Time',
            'W. Europe Standard Time',
            'Central Europe Standard Time',
            'Romance Standard Time',
            'Central European Standard Time',
            'Namibia Standard Time',
            'W. Central Africa Standard Time',
            'Jordan Standard Time',
            'GTB Standard Time',
            'Middle East Standard Time',
            'FLE Standard Time',
            'Syria Standard Time',
            'Israel Standard Time',
            'Egypt Standard Time',
            'Kaliningrad Standard Time',
            'E. Europe Standard Time',
            'West Bank Standard Time',
            'Libya Standard Time',
            'South Africa Standard Time',
            'Arabic Standard Time',
            'Arab Standard Time',
            'Belarus Standard Time',
            'Russian Standard Time',
            'E. Africa Standard Time',
            'Turkey Standard Time',
            'Iran Standard Time',
            'Arabian Standard Time',
            'Astrakhan Standard Time',
            'Azerbaijan Standard Time',
            'Caucasus Standard Time',
            'Russia Time Zone 3',
            'Mauritius Standard Time',
            'Georgian Standard Time',
            'Afghanistan Standard Time',
            'West Asia Standard Time',
            'Ekaterinburg Standard Time',
            'Pakistan Standard Time',
            'India Standard Time',
            'Sri Lanka Standard Time',
            'Nepal Standard Time',
            'Central Asia Standard Time',
            'Bangladesh Standard Time',
            'Omsk Standard Time',
            'Myanmar Standard Time',
            'SE Asia Standard Time',
            'Altai Standard Time',
            'North Asia Standard Time',
            'N. Central Asia Standard Time',
            'Tomsk Standard Time',
            'W. Mongolia Standard Time',
            'China Standard Time',
            'North Asia East Standard Time',
            'Singapore Standard Time',
            'W. Australia Standard Time',
            'Taipei Standard Time',
            'Ulaanbaatar Standard Time',
            'North Korea Standard Time',
            'Aus Central W. Standard Time',
            'Tokyo Standard Time',
            'Korea Standard Time',
            'Transbaikal Standard Time',
            'Yakutsk Standard Time',
            'Cen. Australia Standard Time',
            'AUS Central Standard Time',
            'E. Australia Standard Time',
            'Vladivostok Standard Time',
            'West Pacific Standard Time',
            'AUS Eastern Standard Time',
            'Tasmania Standard Time',
            'Lord Howe Standard Time',
            'Magadan Standard Time',
            'Bougainville Standard Time',
            'Norfolk Standard Time',
            'Sakhalin Standard Time',
            'Central Pacific Standard Time',
            'Russia Time Zone 10',
            'Russia Time Zone 11',
            'New Zealand Standard Time',
            'UTC+12',
            'Kamchatka Standard Time',
            'Fiji Standard Time',
            'Chatham Islands Standard Time',
            'Tonga Standard Time',
            'Samoa Standard Time',
            'Line Islands Standard Time'
        ]
    }),
    __metadata("design:type", Object)
], CatalogDepartment.prototype, "timeZone", void 0);
CatalogDepartment = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Department',
        description: 'Подразделение',
        icon: 'fa fa-list',
        menu: 'Подразделения',
        prefix: 'DEP-',
        hierarchy: 'folders',
        relations: [
            { name: 'Cash registers', type: 'Catalog.CashRegister', field: 'Department' },
            { name: 'Acquiring terminals', type: 'Catalog.AcquiringTerminal', field: 'Department' },
            { name: 'Storehouses', type: 'Catalog.Storehouse', field: 'Department' },
            { name: 'Staffing table', type: 'Catalog.StaffingTable', field: 'Department' },
            { name: 'Company & Investors groups history', type: 'Register.Info.DepartmentCompanyHistory', field: 'Department.id' },
            { name: 'Department status', type: 'Register.Info.DepartmentStatus', field: 'Department.id' },
            { name: 'Responsible persons', type: 'Register.Info.CompanyResponsiblePersons', field: 'Department.id' },
        ],
        dimensions: [
            { company: 'Catalog.Company' }
        ]
    })
], CatalogDepartment);
exports.CatalogDepartment = CatalogDepartment;
//# sourceMappingURL=Catalog.Department.js.map