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
exports.CatalogProductReport = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogProductReport = class CatalogProductReport extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Brand = null;
        this.Unit = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product.Report', hiddenInList: true, order: -1, storageType: 'folders' }),
    __metadata("design:type", Object)
], CatalogProductReport.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Brand' }),
    __metadata("design:type", Object)
], CatalogProductReport.prototype, "Brand", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Unit', label: 'Unit' }),
    __metadata("design:type", Object)
], CatalogProductReport.prototype, "Unit", void 0);
CatalogProductReport = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Product.Report',
        description: 'Номенклатура отчета',
        icon: 'fa fa-list',
        menu: 'Номенклатура отчета',
        hierarchy: 'folders',
        dimensions: [
            { Brand: 'Catalog.Brand' },
        ],
    })
], CatalogProductReport);
exports.CatalogProductReport = CatalogProductReport;
//# sourceMappingURL=Catalog.Product.Report.js.map