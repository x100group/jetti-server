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
exports.CatalogBalance = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogBalance = class CatalogBalance extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.isActive = false;
        this.isPassive = false;
        this.DescriptionENG = '';
        this.Subcounts = [new Subcounts()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Balance', hiddenInList: true, order: -1, storageType: 'folders' }),
    __metadata("design:type", Object)
], CatalogBalance.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogBalance.prototype, "isActive", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogBalance.prototype, "isPassive", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogBalance.prototype, "DescriptionENG", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table' }),
    __metadata("design:type", Array)
], CatalogBalance.prototype, "Subcounts", void 0);
CatalogBalance = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Balance',
        description: 'Статья баланса',
        icon: 'fa fa-list',
        menu: 'Статьи баланса',
        relations: [
            { name: 'Balance analytics', type: 'Catalog.Balance.Analytics', field: 'parent' }
        ],
        hierarchy: 'folders'
    })
], CatalogBalance);
exports.CatalogBalance = CatalogBalance;
class Subcounts {
    constructor() {
        this.Subcount = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Subcount', required: true }),
    __metadata("design:type", Object)
], Subcounts.prototype, "Subcount", void 0);
//# sourceMappingURL=Catalog.Balance.js.map