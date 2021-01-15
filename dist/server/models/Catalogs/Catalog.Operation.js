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
exports.Parameter = exports.CatalogOperation = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogOperation = class CatalogOperation extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Group = null;
        this.description = '';
        this.shortName = '';
        this.Configuration = null;
        this.script = '';
        this.module = '';
        this.Parameters = [new Parameter()];
        this.CopyTo = [new CopyTo()];
        this.commandsOnServer = [new CommandOnServer()];
        this.commandsOnClient = [new Command()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation', hiddenInList: true, order: -1, storageType: 'folders' }),
    __metadata("design:type", Object)
], CatalogOperation.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Group', order: 2, label: 'Operation group', required: true, style: { width: '30%' } }),
    __metadata("design:type", Object)
], CatalogOperation.prototype, "Group", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 3, required: true, style: { width: '50%' } }),
    __metadata("design:type", Object)
], CatalogOperation.prototype, "description", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 3, required: false, style: { width: '50%' } }),
    __metadata("design:type", Object)
], CatalogOperation.prototype, "shortName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Configuration', storageType: 'elements' }),
    __metadata("design:type", Object)
], CatalogOperation.prototype, "Configuration", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'javascript', required: true, hiddenInList: true, style: { height: '50vh' }, value: '' }),
    __metadata("design:type", Object)
], CatalogOperation.prototype, "script", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'javascript', hiddenInList: true, style: { height: '50vh' } }),
    __metadata("design:type", Object)
], CatalogOperation.prototype, "module", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', required: true }),
    __metadata("design:type", Array)
], CatalogOperation.prototype, "Parameters", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', label: 'Copy to...' }),
    __metadata("design:type", Array)
], CatalogOperation.prototype, "CopyTo", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', label: 'Commands on server' }),
    __metadata("design:type", Array)
], CatalogOperation.prototype, "commandsOnServer", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', label: 'Commands on client' }),
    __metadata("design:type", Array)
], CatalogOperation.prototype, "commandsOnClient", void 0);
CatalogOperation = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Operation',
        description: 'Правило операции',
        icon: 'fa fa-list',
        menu: 'Правила операций',
        dimensions: [],
        prefix: 'RULE-',
        relations: [
            { name: 'Operations', type: 'Document.Operation', field: 'Operation' }
        ],
        copyTo: [
            { type: 'Document.Operation', icon: '', label: 'Operation', order: 1 }
        ],
        hierarchy: 'folders',
        module: `{const onOpen = async () => {this.readonly = this.readonly || !this.auth.isRoleAvailableOperationRulesDesigner()}; return {onOpen};}`,
        commands: [
            { method: 'updateSQLViewsX100DATA', icon: 'pi pi-plus', label: 'Обновить SQL представления (X100-DATA)', order: 3 },
            { method: 'updateSQLViews', icon: 'pi pi-plus', label: 'Обновить SQL представления', order: 1 },
            { method: 'riseUpdateMetadataEvent', icon: 'pi pi-plus', label: 'Обновить метаданные', order: 2 },
            { method: 'createSequence', icon: 'pi pi-plus', label: 'Создать последовательность', order: 4 }
        ]
    })
], CatalogOperation);
exports.CatalogOperation = CatalogOperation;
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
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], Parameter.prototype, "required", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'javascript', label: 'change script', hiddenInList: true, style: { width: '550px' } }),
    __metadata("design:type", Object)
], Parameter.prototype, "change", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'json', hiddenInList: true, style: { width: '550px' } }),
    __metadata("design:type", Object)
], Parameter.prototype, "tableDef", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'json', hiddenInList: true, style: { width: '550px' } }),
    __metadata("design:type", Object)
], Parameter.prototype, "Props", void 0);
exports.Parameter = Parameter;
class CopyTo {
    constructor() {
        this.Operation = null;
        this.script = '';
        this.order = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation', required: true, style: { width: '400px' } }),
    __metadata("design:type", Object)
], CopyTo.prototype, "Operation", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'javascript', label: 'script', hiddenInList: true, style: { width: '550px' } }),
    __metadata("design:type", Object)
], CopyTo.prototype, "script", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: true }),
    __metadata("design:type", Object)
], CopyTo.prototype, "order", void 0);
class Command {
    constructor() {
        this.method = '';
        this.label = '';
        this.icon = '';
        this.order = 0;
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
class CommandOnServer extends Command {
    constructor() {
        super(...arguments);
        this.clientModule = '';
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'javascript', label: 'Client module', hiddenInList: true, style: { width: '550px' } }),
    __metadata("design:type", Object)
], CommandOnServer.prototype, "clientModule", void 0);
//# sourceMappingURL=Catalog.Operation.js.map