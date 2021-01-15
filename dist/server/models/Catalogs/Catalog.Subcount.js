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
exports.CatalogSubcount = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
const Types_factory_1 = require("../Types/Types.factory");
let CatalogSubcount = class CatalogSubcount extends jetti_middle_2.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.QueryList = () => jetti_middle_1.buildSubcountQueryList(Types_factory_1.allTypes());
    }
};
__decorate([
    jetti_middle_2.Props({ type: 'Catalog.Subcount', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogSubcount.prototype, "parent", void 0);
CatalogSubcount = __decorate([
    jetti_middle_2.JDocument({
        type: 'Catalog.Subcount',
        description: 'Субконко',
        icon: '',
        menu: 'Субконто',
    })
], CatalogSubcount);
exports.CatalogSubcount = CatalogSubcount;
//# sourceMappingURL=Catalog.Subcount.js.map