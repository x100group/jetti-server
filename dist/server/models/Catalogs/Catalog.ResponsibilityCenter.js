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
exports.CatalogResponsibilityCenter = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogResponsibilityCenter = class CatalogResponsibilityCenter extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.kind = '';
        this.ResponsiblePerson = null;
        this.Currency = null;
        this.code = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.ResponsibilityCenter', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogResponsibilityCenter.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', order: 1, required: true, value: ['COST', 'REVENUE', 'PROFIT', 'INVESTMENT'] }),
    __metadata("design:type", Object)
], CatalogResponsibilityCenter.prototype, "kind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person', order: 2, required: true }),
    __metadata("design:type", Object)
], CatalogResponsibilityCenter.prototype, "ResponsiblePerson", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, isProtected: true }),
    __metadata("design:type", Object)
], CatalogResponsibilityCenter.prototype, "Currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true, order: 2, style: { width: '135px' }, isProtected: true }),
    __metadata("design:type", Object)
], CatalogResponsibilityCenter.prototype, "code", void 0);
CatalogResponsibilityCenter = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.ResponsibilityCenter',
        description: 'ЦФО',
        icon: 'fa fa-list',
        menu: 'ЦФО',
        hierarchy: 'folders'
    })
], CatalogResponsibilityCenter);
exports.CatalogResponsibilityCenter = CatalogResponsibilityCenter;
//# sourceMappingURL=Catalog.ResponsibilityCenter.js.map