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
exports.CatalogAllUnicLotDepartment = exports.CatalogAllUnicLot = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogAllUnicLot = class CatalogAllUnicLot extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.code = '';
        this.SalesStartDate = null;
        this.Cost = 0;
        this.Currency = null;
        this.Product = null;
        this.Department = [new CatalogAllUnicLotDepartment()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.AllUnic.Lot', hiddenInList: true, order: -1, storageType: 'folders' }),
    __metadata("design:type", Object)
], CatalogAllUnicLot.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true, order: 2, style: { width: '135px' }, isProtected: true }),
    __metadata("design:type", Object)
], CatalogAllUnicLot.prototype, "code", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', label: 'Дата старта продаж' }),
    __metadata("design:type", Object)
], CatalogAllUnicLot.prototype, "SalesStartDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Стоимость' }),
    __metadata("design:type", Object)
], CatalogAllUnicLot.prototype, "Cost", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', label: 'Валюта лота', isProtected: true }),
    __metadata("design:type", Object)
], CatalogAllUnicLot.prototype, "Currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', label: 'Номенклатура', isProtected: true }),
    __metadata("design:type", Object)
], CatalogAllUnicLot.prototype, "Product", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', label: 'Подразделения' }),
    __metadata("design:type", Array)
], CatalogAllUnicLot.prototype, "Department", void 0);
CatalogAllUnicLot = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.AllUnic.Lot',
        description: 'AllUnic лот',
        icon: 'fa fa-list',
        menu: 'AllUnic лоты',
        hierarchy: 'folders',
    })
], CatalogAllUnicLot);
exports.CatalogAllUnicLot = CatalogAllUnicLot;
class CatalogAllUnicLotDepartment {
    constructor() {
        this.Department = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', label: 'Подразделение' }),
    __metadata("design:type", Object)
], CatalogAllUnicLotDepartment.prototype, "Department", void 0);
exports.CatalogAllUnicLotDepartment = CatalogAllUnicLotDepartment;
//# sourceMappingURL=Catalog.AllUnic.Lot.js.map