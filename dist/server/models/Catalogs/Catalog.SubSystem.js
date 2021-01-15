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
exports.CatalogSubSystem = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogSubSystem = class CatalogSubSystem extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.code = '';
        this.icon = '';
        this.Catalogs = [new Catalogs()];
        this.Documents = [new Documents()];
        this.Forms = [new Forms()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Role', hiddenInList: true, order: -1, storageType: 'folders' }),
    __metadata("design:type", Object)
], CatalogSubSystem.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 1, required: true, style: { width: '250px' } }),
    __metadata("design:type", Object)
], CatalogSubSystem.prototype, "code", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], CatalogSubSystem.prototype, "icon", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 1, label: 'Catalogs' }),
    __metadata("design:type", Array)
], CatalogSubSystem.prototype, "Catalogs", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 2, label: 'Documents' }),
    __metadata("design:type", Array)
], CatalogSubSystem.prototype, "Documents", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 3, label: 'Forms' }),
    __metadata("design:type", Array)
], CatalogSubSystem.prototype, "Forms", void 0);
CatalogSubSystem = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.SubSystem',
        description: 'Подсистема',
        icon: 'fa fa-list',
        menu: 'Подсистемы',
    })
], CatalogSubSystem);
exports.CatalogSubSystem = CatalogSubSystem;
class Catalogs {
    constructor() {
        this.Catalog = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Catalogs', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], Catalogs.prototype, "Catalog", void 0);
class Documents {
    constructor() {
        this.Document = null;
        this.Group = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Documents', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], Documents.prototype, "Document", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Group', style: { width: '100%' } }),
    __metadata("design:type", Object)
], Documents.prototype, "Group", void 0);
class Forms {
    constructor() {
        this.Form = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Forms', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], Forms.prototype, "Form", void 0);
//# sourceMappingURL=Catalog.SubSystem.js.map