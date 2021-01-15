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
exports.CatalogRetailNetwork = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogRetailNetwork = class CatalogRetailNetwork extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Brand = null;
        this.Country = null;
        this.BusinessRegion = null;
        this.Currency = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.RetailNetwork', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogRetailNetwork.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Brand' }),
    __metadata("design:type", Object)
], CatalogRetailNetwork.prototype, "Brand", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Country' }),
    __metadata("design:type", Object)
], CatalogRetailNetwork.prototype, "Country", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BusinessRegion' }),
    __metadata("design:type", Object)
], CatalogRetailNetwork.prototype, "BusinessRegion", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency' }),
    __metadata("design:type", Object)
], CatalogRetailNetwork.prototype, "Currency", void 0);
CatalogRetailNetwork = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.RetailNetwork',
        description: 'Торговая сеть',
        icon: 'fa fa-list',
        menu: 'Торговые сети',
        hierarchy: 'folders'
    })
], CatalogRetailNetwork);
exports.CatalogRetailNetwork = CatalogRetailNetwork;
//# sourceMappingURL=Catalog.RetailNetwork.js.map