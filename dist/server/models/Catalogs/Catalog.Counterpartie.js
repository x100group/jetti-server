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
exports.CatalogCounterpartie = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogCounterpartie = class CatalogCounterpartie extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.kind = 'ЮрЛицо';
        this.FullName = '';
        this.Department = null;
        this.Client = false;
        this.Supplier = false;
        this.isInternal = false;
        this.AddressShipping = null;
        this.AddressBilling = null;
        this.Phone = null;
        this.Code1 = null;
        this.Code2 = null;
        this.Code3 = null;
        this.BC = '';
        this.GLN = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Counterpartie', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', required: true, value: ['ЮрЛицо', 'ФизЛицо', 'ИндПред', 'Нерез', 'Обособ'] }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "kind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "FullName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', required: false }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', required: true }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "Client", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', required: true }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "Supplier", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "isInternal", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "AddressShipping", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "AddressBilling", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "Phone", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "Code1", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "Code2", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "Code3", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }) // Код Бенефициара (для Казахастана)
    ,
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "BC", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', readOnly: true, isAdditional: true }),
    __metadata("design:type", Object)
], CatalogCounterpartie.prototype, "GLN", void 0);
CatalogCounterpartie = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Counterpartie',
        description: 'Контрагент',
        icon: 'fa fa-list',
        menu: 'Контрагенты',
        prefix: 'CPE-',
        relations: [
            { name: 'Contracts', type: 'Catalog.Contract', field: 'owner' },
            { name: 'Bank accounts', type: 'Catalog.Counterpartie.BankAccount', field: 'owner' },
            { name: 'Loan contracts', type: 'Catalog.Loan', field: 'owner' }
        ],
        hierarchy: 'folders'
    })
], CatalogCounterpartie);
exports.CatalogCounterpartie = CatalogCounterpartie;
//# sourceMappingURL=Catalog.Counterpartie.js.map