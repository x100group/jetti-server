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
exports.Parameter = exports.CatalogProductKind = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogProductKind = class CatalogProductKind extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.ProductType = '';
        this.Parameters = [new Parameter()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.ProductKind', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogProductKind.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', label: 'Type', value: ['GOODS', 'SERVICE', 'WORK'], required: true, order: 3 }),
    __metadata("design:type", Object)
], CatalogProductKind.prototype, "ProductType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', label: 'Parameters' }),
    __metadata("design:type", Array)
], CatalogProductKind.prototype, "Parameters", void 0);
CatalogProductKind = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.ProductKind',
        description: 'Виды номенклатуры',
        icon: 'fa fa-list',
        menu: 'Виды номенклатуры',
        prefix: 'PRODKIND-',
        commands: [{ method: 'ParametersFill', label: 'Заполнить параметры', order: 1, icon: 'pi pi-plus' }]
    })
], CatalogProductKind);
exports.CatalogProductKind = CatalogProductKind;
class Parameter {
    constructor() {
        this.PropName = '';
        this.Visible = '';
        this.Readonly = '';
        this.Required = '';
        this.Info = '';
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], Parameter.prototype, "PropName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], Parameter.prototype, "Visible", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], Parameter.prototype, "Readonly", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], Parameter.prototype, "Required", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], Parameter.prototype, "Info", void 0);
exports.Parameter = Parameter;
//# sourceMappingURL=Catalog.ProductKind.js.map