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
exports.CatalogAccount = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogAccount = class CatalogAccount extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.isForex = false;
        this.isActive = false;
        this.isPassive = false;
        this.Subcounts = [new Subcounts()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Account', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogAccount.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', required: true }),
    __metadata("design:type", Object)
], CatalogAccount.prototype, "isForex", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogAccount.prototype, "isActive", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogAccount.prototype, "isPassive", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table' }),
    __metadata("design:type", Array)
], CatalogAccount.prototype, "Subcounts", void 0);
CatalogAccount = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Account',
        description: 'Счет БУ',
        icon: 'fa fa-list',
        menu: 'Счета БУ',
        presentation: 'code',
    })
], CatalogAccount);
exports.CatalogAccount = CatalogAccount;
class Subcounts {
    constructor() {
        this.Subcount = null;
        this.isQty = false;
        this.isSum = true;
        this.isTurnoversOnly = false;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Subcount', required: true, order: -1 }),
    __metadata("design:type", Object)
], Subcounts.prototype, "Subcount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], Subcounts.prototype, "isQty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], Subcounts.prototype, "isSum", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'isTO' }),
    __metadata("design:type", Object)
], Subcounts.prototype, "isTurnoversOnly", void 0);
//# sourceMappingURL=Catalog.Account.js.map