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
exports.Ingridient = exports.OutputProduct = exports.CatalogSpecification = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogSpecification = class CatalogSpecification extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.company = null;
        this.Brand = null;
        this.MainProduct = null;
        this.Status = 'DEVELOPING';
        this.FullDescription = '';
        this.StartDate = null;
        this.EndDate = null;
        this.ResponsiblePerson = null;
        this.RetailNetwork = null;
        this.OutputProducts = [new OutputProduct()];
        this.Ingridients = [new Ingridient()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Specification', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogSpecification.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', hiddenInList: true }),
    __metadata("design:type", Object)
], CatalogSpecification.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Brand' }),
    __metadata("design:type", Object)
], CatalogSpecification.prototype, "Brand", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product' }),
    __metadata("design:type", Object)
], CatalogSpecification.prototype, "MainProduct", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['DEVELOPING', 'ACTIVE', 'CLOSED'], label: 'Статус' }),
    __metadata("design:type", Object)
], CatalogSpecification.prototype, "Status", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Наименование полное' }),
    __metadata("design:type", Object)
], CatalogSpecification.prototype, "FullDescription", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', label: 'Дата начала' }),
    __metadata("design:type", Object)
], CatalogSpecification.prototype, "StartDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', label: 'Дата окончания' }),
    __metadata("design:type", Object)
], CatalogSpecification.prototype, "EndDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person', label: 'Отвественный' }),
    __metadata("design:type", Object)
], CatalogSpecification.prototype, "ResponsiblePerson", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.RetailNetwork', label: 'Торовая сеть' }),
    __metadata("design:type", Object)
], CatalogSpecification.prototype, "RetailNetwork", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', required: false, label: 'Выходные изделия' }),
    __metadata("design:type", Array)
], CatalogSpecification.prototype, "OutputProducts", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', required: false, label: 'Ингридиенты' }),
    __metadata("design:type", Array)
], CatalogSpecification.prototype, "Ingridients", void 0);
CatalogSpecification = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Specification',
        description: 'Ресурсная спецификация',
        icon: 'fa fa-list',
        menu: 'Ресурсные спецификации'
    })
], CatalogSpecification);
exports.CatalogSpecification = CatalogSpecification;
class OutputProduct {
    constructor() {
        this.Product = null;
        this.Quantity = 0;
        this.CostShare = 1;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', label: 'Изделие', style: { width: '300px' } }),
    __metadata("design:type", Object)
], OutputProduct.prototype, "Product", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Количество' }),
    __metadata("design:type", Object)
], OutputProduct.prototype, "Quantity", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Доля стоимости' }),
    __metadata("design:type", Object)
], OutputProduct.prototype, "CostShare", void 0);
exports.OutputProduct = OutputProduct;
class Ingridient {
    constructor() {
        this.Ingridient = null;
        this.QuantityIn = 0;
        this.QuantityOut = 0;
        this.PercentOut = 0;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', label: 'Ингридиент', style: { width: '300px' } }),
    __metadata("design:type", Object)
], Ingridient.prototype, "Ingridient", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Количество (вход)' }),
    __metadata("design:type", Object)
], Ingridient.prototype, "QuantityIn", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Количество (выход)' }),
    __metadata("design:type", Object)
], Ingridient.prototype, "QuantityOut", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Процент потерь' }),
    __metadata("design:type", Object)
], Ingridient.prototype, "PercentOut", void 0);
exports.Ingridient = Ingridient;
//# sourceMappingURL=Catalog.Specification.js.map