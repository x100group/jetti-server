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
exports.DocumentPriceList = void 0;
const jetti_middle_1 = require("jetti-middle");
let DocumentPriceList = class DocumentPriceList extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.PriceType = null;
        this.TaxInclude = false;
        this.Items = [new TableItems()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], DocumentPriceList.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.PriceType', required: true, label: 'price type', onChangeServer: true }),
    __metadata("design:type", Object)
], DocumentPriceList.prototype, "PriceType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', required: true, label: 'tax include' }),
    __metadata("design:type", Object)
], DocumentPriceList.prototype, "TaxInclude", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', required: true, order: 1 }),
    __metadata("design:type", Array)
], DocumentPriceList.prototype, "Items", void 0);
DocumentPriceList = __decorate([
    jetti_middle_1.JDocument({
        type: 'Document.PriceList',
        description: 'Price list',
        icon: 'far fa-file-alt',
        menu: 'Price list',
        prefix: 'PRICE-'
    })
], DocumentPriceList);
exports.DocumentPriceList = DocumentPriceList;
class TableItems {
    constructor() {
        this.SKU = null;
        this.Unit = null;
        this.Price = 0;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', required: true, style: { width: '50%' } }),
    __metadata("design:type", Object)
], TableItems.prototype, "SKU", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Unit', required: true, style: { width: '30%' } }),
    __metadata("design:type", Object)
], TableItems.prototype, "Unit", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: true, style: { width: '20%' } }),
    __metadata("design:type", Object)
], TableItems.prototype, "Price", void 0);
//# sourceMappingURL=Document.PriceList.js.map