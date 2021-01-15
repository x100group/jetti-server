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
exports.CatalogSalaryAnalytics = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogSalaryAnalytics = class CatalogSalaryAnalytics extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.SalaryKind = 'INCOME';
        this.Unit = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Salary.Analytics', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogSalaryAnalytics.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', resource: true, value: ['INCOME', 'EXPENSE', 'PAID'] }),
    __metadata("design:type", Object)
], CatalogSalaryAnalytics.prototype, "SalaryKind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Unit' }),
    __metadata("design:type", Object)
], CatalogSalaryAnalytics.prototype, "Unit", void 0);
CatalogSalaryAnalytics = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Salary.Analytics',
        description: 'Аналитика начислений/удержаний',
        icon: 'fa fa-list',
        menu: 'Аналитики нач/удерж',
        prefix: 'SAL.A-'
    })
], CatalogSalaryAnalytics);
exports.CatalogSalaryAnalytics = CatalogSalaryAnalytics;
//# sourceMappingURL=Catalog.Salary.Analytics.js.map