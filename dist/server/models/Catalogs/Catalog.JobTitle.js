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
exports.CatalogJobTitle = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogJobTitle = class CatalogJobTitle extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Category = null;
        this.TO = false;
        this.CO = false;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.JobTitle', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogJobTitle.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.JobTitle.Category', label: 'Категория', required: true }),
    __metadata("design:type", Object)
], CatalogJobTitle.prototype, "Category", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'ТТ' }),
    __metadata("design:type", Object)
], CatalogJobTitle.prototype, "TO", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'ЦО' }),
    __metadata("design:type", Object)
], CatalogJobTitle.prototype, "CO", void 0);
CatalogJobTitle = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.JobTitle',
        description: 'Должность',
        icon: 'fa fa-list',
        menu: 'Должности',
        prefix: 'JT-',
        hierarchy: 'folders',
        relations: [{ name: 'Staffing table', type: 'Catalog.StaffingTable', field: 'JobTitle' }]
    })
], CatalogJobTitle);
exports.CatalogJobTitle = CatalogJobTitle;
//# sourceMappingURL=Catalog.JobTitle.js.map