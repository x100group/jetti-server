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
exports.CatalogStorehouse = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogStorehouse = class CatalogStorehouse extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Department = null;
        this.company = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Storehouse', hiddenInList: true, order: -1, storageType: 'folders' }),
    __metadata("design:type", Object)
], CatalogStorehouse.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department' }),
    __metadata("design:type", Object)
], CatalogStorehouse.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', hiddenInForm: false }),
    __metadata("design:type", Object)
], CatalogStorehouse.prototype, "company", void 0);
CatalogStorehouse = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Storehouse',
        description: 'Склад',
        icon: 'fa fa-list',
        menu: 'Склады',
        prefix: 'STOR-',
        hierarchy: 'folders',
        dimensions: [
            { Department: 'Catalog.Department' },
            { company: 'Catalog.Company' }
        ]
    })
], CatalogStorehouse);
exports.CatalogStorehouse = CatalogStorehouse;
//# sourceMappingURL=Catalog.Storehouse.js.map