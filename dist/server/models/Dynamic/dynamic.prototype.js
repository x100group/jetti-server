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
exports.RegisterInfoDynamic = exports.CatalogDynamic = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogDynamic = class CatalogDynamic extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Dynamic', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogDynamic.prototype, "parent", void 0);
CatalogDynamic = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Dynamic',
        description: 'Прототип динамического справочника',
        icon: 'fa fa-list',
        menu: 'Прототип динамического справочника',
        prefix: 'ref-',
        hierarchy: 'folders'
    })
], CatalogDynamic);
exports.CatalogDynamic = CatalogDynamic;
let RegisterInfoDynamic = class RegisterInfoDynamic extends jetti_middle_1.RegisterInfo {
    constructor(init) {
        super(init);
        Object.assign(this, init);
    }
};
RegisterInfoDynamic = __decorate([
    jetti_middle_1.JRegisterInfo({
        type: 'Register.Info.Dynamic',
        description: 'Прототип регистра сведений',
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoDynamic);
exports.RegisterInfoDynamic = RegisterInfoDynamic;
//# sourceMappingURL=dynamic.prototype.js.map