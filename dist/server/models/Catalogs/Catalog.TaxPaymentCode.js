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
exports.CatalogTaxPaymentCode = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogTaxPaymentCode = class CatalogTaxPaymentCode extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.FullDescription = '';
        this.BalanceAnalytics = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.TaxPaymentCode', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogTaxPaymentCode.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', hiddenInList: true }),
    __metadata("design:type", Object)
], CatalogTaxPaymentCode.prototype, "FullDescription", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Balance.Analytics', label: 'Balance analytics' }),
    __metadata("design:type", Object)
], CatalogTaxPaymentCode.prototype, "BalanceAnalytics", void 0);
CatalogTaxPaymentCode = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.TaxPaymentCode',
        description: 'КБК',
        icon: 'fa fa-list',
        menu: 'КБК',
    })
], CatalogTaxPaymentCode);
exports.CatalogTaxPaymentCode = CatalogTaxPaymentCode;
//# sourceMappingURL=Catalog.TaxPaymentCode.js.map