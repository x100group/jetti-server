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
exports.CatalogOperationGroup = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogOperationGroup = class CatalogOperationGroup extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Prefix = '';
        this.menu = '';
        this.icon = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Group', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogOperationGroup.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], CatalogOperationGroup.prototype, "Prefix", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], CatalogOperationGroup.prototype, "menu", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], CatalogOperationGroup.prototype, "icon", void 0);
CatalogOperationGroup = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Operation.Group',
        description: 'Группа операции',
        icon: 'fa fa-list',
        menu: 'Группы операций',
        prefix: 'OPG-',
        relations: [
            { name: 'Operations', type: 'Catalog.Operation', field: 'Group' }
        ],
    })
], CatalogOperationGroup);
exports.CatalogOperationGroup = CatalogOperationGroup;
//# sourceMappingURL=Catalog.Operation.Group.js.map