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
exports.Product = exports.CatalogProduct = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogProduct = class CatalogProduct extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.isfolder = false;
        this.ProductKind = null;
        this.ProductCategory = null;
        this.Specification = null;
        this.Brand = null;
        this.RetailNetwork = null;
        this.Unit = null;
        this.Expense = null;
        this.Analytics = null;
        this.ProductReport = null;
        this.Settings = null;
        this.Purchased = false;
        this.ShortCode = '';
        this.ShortName = '';
        this.Tags = '';
        this.Weight = '';
        this.Volume = '';
        this.Calorie = 0;
        this.Carbohydrates = 0;
        this.Fat = 0;
        this.Proteins = 0;
        this.CookingTime = 0;
        this.Composition = '';
        this.CookingPlace = 'kitchen';
        this.Order = 0;
        this.Barcode = '';
        this.Eancode = '';
        this.isVegan = false;
        this.isHot = false;
        this.isPromo = false;
        this.Product = [new Product()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', hiddenInList: true, order: -1, storageType: 'folders' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', hidden: false, hiddenInList: true, isAdditional: true }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "isfolder", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.ProductKind', label: 'Kind', order: 5, onChangeServer: true, useIn: 'all', isIndexed: true }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "ProductKind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.ProductCategory', label: 'Сategory', order: 666, useIn: 'all', isIndexed: true }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "ProductCategory", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Specification', label: 'Specification', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Specification", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Brand', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Brand", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.RetailNetwork', order: 666 }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "RetailNetwork", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Unit', label: 'Unit', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Unit", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Expense', label: 'Expense', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Expense", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Expense.Analytics', label: 'Analytics', order: 666, useIn: 'all',
        owner: [{ dependsOn: 'Expense', filterBy: 'parent' }]
    }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Analytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product.Report', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "ProductReport", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Document.Operation', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Settings", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Purchased", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "ShortCode", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "ShortName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Tags", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Weight", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Volume", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Calorie", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Carbohydrates", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Fat", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Proteins", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "CookingTime", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Composition", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', order: 666, value: ['kitchen', 'outlet'], useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "CookingPlace", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Order", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Barcode", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "Eancode", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "isVegan", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "isHot", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', order: 666, useIn: 'all' }),
    __metadata("design:type", Object)
], CatalogProduct.prototype, "isPromo", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', label: 'Products', order: 666 }),
    __metadata("design:type", Array)
], CatalogProduct.prototype, "Product", void 0);
CatalogProduct = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Product',
        description: 'Номенклатура',
        icon: ' fa fa-list',
        menu: 'Номенклатура',
        prefix: 'SKU-',
        hierarchy: 'folders',
        relations: [{ name: 'Specification by department', type: 'Register.Info.ProductSpecificationByDepartment', field: 'Product.id' }],
        dimensions: [
            { Unit: 'Catalog.Unit' },
            { Kind: 'Catalog.ProductKind' }
        ],
        commands: [{ method: 'SavePropsValuesInChilds', icon: 'pi pi-plus', order: 1, label: 'Save in child elements' }]
    })
], CatalogProduct);
exports.CatalogProduct = CatalogProduct;
class Product {
    constructor() {
        this.Product = '';
        this.Qty = '';
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product' }),
    __metadata("design:type", Object)
], Product.prototype, "Product", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], Product.prototype, "Qty", void 0);
exports.Product = Product;
//# sourceMappingURL=Catalog.Product.js.map