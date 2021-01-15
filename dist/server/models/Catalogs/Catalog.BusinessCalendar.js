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
exports.CatalogBusinessCalendar = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogBusinessCalendar = class CatalogBusinessCalendar extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Country = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BusinessCalendar', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogBusinessCalendar.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Country', required: true }),
    __metadata("design:type", Object)
], CatalogBusinessCalendar.prototype, "Country", void 0);
CatalogBusinessCalendar = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.BusinessCalendar',
        description: 'Бизнес календарь',
        icon: 'fa fa-list',
        menu: 'Бизнес календари',
        prefix: 'bc-',
        relations: [
            { name: 'Departments', type: 'Catalog.Department', field: 'BusinessCalendar' },
            { name: 'Companies', type: 'Catalog.Company', field: 'BusinessCalendar' }
        ]
    })
], CatalogBusinessCalendar);
exports.CatalogBusinessCalendar = CatalogBusinessCalendar;
//# sourceMappingURL=Catalog.BusinessCalendar.js.map