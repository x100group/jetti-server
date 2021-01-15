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
exports.CatalogRole = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogRole = class CatalogRole extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.code = '';
        this.Cataogs = [new Catalogs()];
        this.Documents = [new Documents()];
        this.OperationGroups = [new OperationGroups()];
        this.Subsystems = [new Subsystems()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Role', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogRole.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 1, required: true, style: { width: '250px' } }),
    __metadata("design:type", Object)
], CatalogRole.prototype, "code", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 1, label: 'Granted Catalogs' }),
    __metadata("design:type", Array)
], CatalogRole.prototype, "Cataogs", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 2, label: 'Granted Documents' }),
    __metadata("design:type", Array)
], CatalogRole.prototype, "Documents", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 3, label: 'Granted Operation Groups' }),
    __metadata("design:type", Array)
], CatalogRole.prototype, "OperationGroups", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 4, label: 'Granted Subsystems' }),
    __metadata("design:type", Array)
], CatalogRole.prototype, "Subsystems", void 0);
CatalogRole = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Role',
        description: 'Роль пользователя',
        icon: 'fa fa-list',
        menu: 'Роли пользователя',
    })
], CatalogRole);
exports.CatalogRole = CatalogRole;
class Catalogs {
    constructor() {
        this.Catalog = null;
        this.read = true;
        this.write = false;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Catalogs', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], Catalogs.prototype, "Catalog", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], Catalogs.prototype, "read", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], Catalogs.prototype, "write", void 0);
class Documents {
    constructor() {
        this.Document = null;
        this.read = true;
        this.write = false;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Documents', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], Documents.prototype, "Document", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], Documents.prototype, "read", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], Documents.prototype, "write", void 0);
class OperationGroups {
    constructor() {
        this.Group = null;
        this.read = true;
        this.write = false;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Group', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], OperationGroups.prototype, "Group", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], OperationGroups.prototype, "read", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], OperationGroups.prototype, "write", void 0);
class Subsystems {
    constructor() {
        this.SubSystem = null;
        this.read = true;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.SubSystem', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], Subsystems.prototype, "SubSystem", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], Subsystems.prototype, "read", void 0);
//# sourceMappingURL=Catalog.Role.js.map