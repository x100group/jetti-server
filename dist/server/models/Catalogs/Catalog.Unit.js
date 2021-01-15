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
exports.CatalogUnit = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogUnit = class CatalogUnit extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.BaseUnit = null;
        this.Rate = 0;
        this.kind = 'NONE';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Unit' }),
    __metadata("design:type", Object)
], CatalogUnit.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Unit', useIn: 'elements' }),
    __metadata("design:type", Object)
], CatalogUnit.prototype, "BaseUnit", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', useIn: 'elements' }),
    __metadata("design:type", Object)
], CatalogUnit.prototype, "Rate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['NONE', 'WEIGHT', 'AREA', 'LENGTH', 'VOLUME'], required: true }),
    __metadata("design:type", Object)
], CatalogUnit.prototype, "kind", void 0);
CatalogUnit = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Unit',
        description: 'Unit',
        icon: 'fa fa-list',
        menu: 'Units',
        prefix: 'UNIT-'
    })
], CatalogUnit);
exports.CatalogUnit = CatalogUnit;
//# sourceMappingURL=Catalog.Unit.js.map