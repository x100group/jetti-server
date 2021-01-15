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
exports.Dimension = exports.Parameter = exports.CatalogCatalog = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogCatalog = class CatalogCatalog extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.description = '';
        this.typeString = '';
        this.prefix = '';
        this.icon = 'fa fa-list';
        this.menu = '';
        this.presentation = 'description';
        this.hierarchy = 'none';
        this.module = '';
        this.Parameters = [new Parameter()];
        this.CopyTo = [new CopyTo()];
        this.commandsOnServer = [new Command()];
        this.commandsOnClient = [new Command()];
        this.relations = [new Relation()];
        this.dimensions = [new Dimension()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Catalog', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogCatalog.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 3, required: true, style: { width: '50%' } }),
    __metadata("design:type", Object)
], CatalogCatalog.prototype, "description", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'type' }),
    __metadata("design:type", Object)
], CatalogCatalog.prototype, "typeString", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogCatalog.prototype, "prefix", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', value: 'fa fa-list', required: true }),
    __metadata("design:type", Object)
], CatalogCatalog.prototype, "icon", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], CatalogCatalog.prototype, "menu", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['code', 'description'], required: true }),
    __metadata("design:type", Object)
], CatalogCatalog.prototype, "presentation", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['folders', 'elements', 'none'], required: true }),
    __metadata("design:type", Object)
], CatalogCatalog.prototype, "hierarchy", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'javascript', hiddenInList: true, style: { height: '50vh' }, panel: 'Module' }),
    __metadata("design:type", Object)
], CatalogCatalog.prototype, "module", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table' }),
    __metadata("design:type", Array)
], CatalogCatalog.prototype, "Parameters", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', label: 'Copy to...' }),
    __metadata("design:type", Array)
], CatalogCatalog.prototype, "CopyTo", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', label: 'Commands on server' }),
    __metadata("design:type", Array)
], CatalogCatalog.prototype, "commandsOnServer", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', label: 'Commands on client' }),
    __metadata("design:type", Array)
], CatalogCatalog.prototype, "commandsOnClient", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', label: 'Relations' }),
    __metadata("design:type", Array)
], CatalogCatalog.prototype, "relations", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', label: 'Dimensions' }),
    __metadata("design:type", Array)
], CatalogCatalog.prototype, "dimensions", void 0);
CatalogCatalog = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Catalog',
        description: 'Catalog constructor',
        icon: 'fa fa-list',
        menu: 'Catalog constructor',
        presentation: 'description',
        prefix: 'CC-',
        commands: [
            { method: 'updateSQLViewsX100DATA', icon: 'pi pi-plus', label: 'Обновить SQL представления (X100-DATA)', order: 3 },
            { method: 'updateSQLViews', icon: 'pi pi-plus', label: 'Обновить SQL представления', order: 2 },
            { method: 'riseUpdateMetadataEvent', icon: 'pi pi-plus', label: 'Обновить метаданные', order: 1 },
            { method: 'createSequence', icon: 'pi pi-plus', label: 'Создать последовательность', order: 3 },
            { method: 'fillByType', icon: 'pi pi-plus', label: 'Заполнить по типу', order: 5 }
        ]
    })
], CatalogCatalog);
exports.CatalogCatalog = CatalogCatalog;
class Parameter {
    constructor() {
        this.parameter = '';
        this.label = '';
        this.type = null;
        this.order = null;
        this.required = false;
        this.change = '';
        this.tableDef = '';
        this.Props = '';
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], Parameter.prototype, "parameter", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], Parameter.prototype, "label", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Subcount', required: true }),
    __metadata("design:type", Object)
], Parameter.prototype, "type", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: true }),
    __metadata("design:type", Object)
], Parameter.prototype, "order", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', required: true }),
    __metadata("design:type", Object)
], Parameter.prototype, "required", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'javascript', label: 'change script', hiddenInList: true }),
    __metadata("design:type", Object)
], Parameter.prototype, "change", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'json', hiddenInList: true }),
    __metadata("design:type", Object)
], Parameter.prototype, "tableDef", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'json', hiddenInList: true }),
    __metadata("design:type", Object)
], Parameter.prototype, "Props", void 0);
exports.Parameter = Parameter;
class CopyTo {
    constructor() {
        this.Operation = null;
        this.script = '';
        this.method = '';
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation', required: true, style: { width: '400px' } }),
    __metadata("design:type", Object)
], CopyTo.prototype, "Operation", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'javascript', label: 'script', hiddenInList: true }),
    __metadata("design:type", Object)
], CopyTo.prototype, "script", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'javascript', label: 'script', hiddenInList: true }),
    __metadata("design:type", Object)
], CopyTo.prototype, "method", void 0);
class Command {
    constructor() {
        this.method = '';
        this.label = '';
        this.icon = '';
        this.order = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], Command.prototype, "method", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], Command.prototype, "label", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], Command.prototype, "icon", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: true }),
    __metadata("design:type", Object)
], Command.prototype, "order", void 0);
class Relation {
    constructor() {
        this.name = '';
        this.type = null;
        this.field = '';
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], Relation.prototype, "name", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Subcount', required: true }),
    __metadata("design:type", Object)
], Relation.prototype, "type", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], Relation.prototype, "field", void 0);
class Dimension {
    constructor() {
        this.name = '';
        this.type = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true }),
    __metadata("design:type", Object)
], Dimension.prototype, "name", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Subcount', required: true }),
    __metadata("design:type", Object)
], Dimension.prototype, "type", void 0);
exports.Dimension = Dimension;
//# sourceMappingURL=Catalog.Catalog.js.map