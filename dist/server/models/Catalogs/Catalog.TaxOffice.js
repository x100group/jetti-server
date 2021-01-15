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
exports.CatalogTaxOffice = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogTaxOffice = class CatalogTaxOffice extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.FullName = '';
        this.Code1 = '';
        this.Code2 = '';
        this.Code3 = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.TaxOffice', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogTaxOffice.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Наименование полное', required: true }),
    __metadata("design:type", Object)
], CatalogTaxOffice.prototype, "FullName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Код налогового органа', required: true }),
    __metadata("design:type", Object)
], CatalogTaxOffice.prototype, "Code1", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'ОКТМО', required: true }),
    __metadata("design:type", Object)
], CatalogTaxOffice.prototype, "Code2", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'ОКАТО', required: false }),
    __metadata("design:type", Object)
], CatalogTaxOffice.prototype, "Code3", void 0);
CatalogTaxOffice = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.TaxOffice',
        description: 'Наголовая служба',
        icon: 'fa fa-list',
        menu: 'Наголовые службы',
        prefix: 'TXR-'
    })
], CatalogTaxOffice);
exports.CatalogTaxOffice = CatalogTaxOffice;
//# sourceMappingURL=Catalog.TaxOffice.js.map