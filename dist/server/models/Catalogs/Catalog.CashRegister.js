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
exports.CatalogCashRegister = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogCashRegister = class CatalogCashRegister extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.currency = null;
        this.Department = null;
        this.company = null;
        this.isAccounting = true;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashRegister', hiddenInList: true, order: -1, storageType: 'folders' }),
    __metadata("design:type", Object)
], CatalogCashRegister.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, style: { width: '100px' }, isProtected: true }),
    __metadata("design:type", Object)
], CatalogCashRegister.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department' }),
    __metadata("design:type", Object)
], CatalogCashRegister.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, hiddenInForm: false, isProtected: true }),
    __metadata("design:type", Object)
], CatalogCashRegister.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogCashRegister.prototype, "isAccounting", void 0);
CatalogCashRegister = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.CashRegister',
        description: 'Касса',
        icon: 'fa fa-list',
        menu: 'Кассы',
        prefix: 'CSREG-',
        hierarchy: 'folders',
        dimensions: [
            { company: 'Catalog.Company' }
        ]
    })
], CatalogCashRegister);
exports.CatalogCashRegister = CatalogCashRegister;
//# sourceMappingURL=Catalog.CashRegister.js.map