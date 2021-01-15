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
exports.CatalogProductPackage = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogProductPackage = class CatalogProductPackage extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Product = null;
        this.Qty = 0;
        this.isActive = false;
        this.Label = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product.Package', hiddenInList: true, order: -1, storageType: 'folders' }),
    __metadata("design:type", Object)
], CatalogProductPackage.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product' }),
    __metadata("design:type", Object)
], CatalogProductPackage.prototype, "Product", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Qty' }),
    __metadata("design:type", Object)
], CatalogProductPackage.prototype, "Qty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogProductPackage.prototype, "isActive", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogProductPackage.prototype, "Label", void 0);
CatalogProductPackage = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Product.Package',
        description: 'Пакет продуктов',
        icon: 'fa fa-list',
        menu: 'Пакеты продуктов',
        hierarchy: 'folders',
        dimensions: [
            { Product: 'Catalog.Product' }, { Label: 'string' }, { isActive: 'boolean' }
        ],
    })
], CatalogProductPackage);
exports.CatalogProductPackage = CatalogProductPackage;
//# sourceMappingURL=Catalog.Product.Package.js.map