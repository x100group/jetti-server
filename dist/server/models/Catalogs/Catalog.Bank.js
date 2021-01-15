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
exports.CatalogBank = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogBank = class CatalogBank extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Code1 = '';
        this.Code2 = '';
        this.Address = '';
        this.KorrAccount = '';
        this.ExportRule = null;
        this.isActive = true;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Bank', hiddenInList: true, order: -1, storageType: 'folders' }),
    __metadata("design:type", Object)
], CatalogBank.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogBank.prototype, "Code1", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogBank.prototype, "Code2", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogBank.prototype, "Address", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogBank.prototype, "KorrAccount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Document.Operation' }),
    __metadata("design:type", Object)
], CatalogBank.prototype, "ExportRule", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogBank.prototype, "isActive", void 0);
CatalogBank = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Bank',
        description: 'Банки',
        icon: 'fa fa-list',
        menu: 'Банки',
        hierarchy: 'folders',
    })
], CatalogBank);
exports.CatalogBank = CatalogBank;
//# sourceMappingURL=Catalog.Bank.js.map