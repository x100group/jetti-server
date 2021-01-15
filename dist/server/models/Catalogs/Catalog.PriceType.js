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
exports.CatalogPriceType = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogPriceType = class CatalogPriceType extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.currency = null;
        this.TaxInclude = false;
        this.Brand = null;
        this.RetailNetwork = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.PriceType', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogPriceType.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, style: { width: '100px' }, isProtected: true }),
    __metadata("design:type", Object)
], CatalogPriceType.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', required: true }),
    __metadata("design:type", Object)
], CatalogPriceType.prototype, "TaxInclude", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Brand', isProtected: true }),
    __metadata("design:type", Object)
], CatalogPriceType.prototype, "Brand", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.RetailNetwork' }),
    __metadata("design:type", Object)
], CatalogPriceType.prototype, "RetailNetwork", void 0);
CatalogPriceType = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.PriceType',
        description: 'Типы цен',
        icon: 'fa fa-list',
        menu: 'Типы цен',
        prefix: 'PRT-',
        hierarchy: 'folders'
    })
], CatalogPriceType);
exports.CatalogPriceType = CatalogPriceType;
//# sourceMappingURL=Catalog.PriceType.js.map