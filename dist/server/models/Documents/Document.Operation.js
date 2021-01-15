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
exports.DocumentOperation = void 0;
const jetti_middle_1 = require("jetti-middle");
let DocumentOperation = class DocumentOperation extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.company = null;
        this.Group = null;
        this.Operation = null;
        this.Amount = 0;
        this.currency = null;
        this.f1 = null;
        this.f2 = null;
        this.f3 = null;
        this.user = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document', hiddenInList: false, order: 1000 }),
    __metadata("design:type", Object)
], DocumentOperation.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Company', order: 4, required: true, style: { width: '250px' },
        onChange: function (doc, value, api) {
            if (value && value.id) {
                const thisObject = api.byId(value.id);
                const currency = api.formControlRef(thisObject.currency);
                return { currency };
            }
            else
                return {};
        }
    }),
    __metadata("design:type", Object)
], DocumentOperation.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Group', required: true, order: 5, label: 'Group', hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentOperation.prototype, "Group", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Operation', owner: [{ dependsOn: 'Group', filterBy: 'Group' }],
        required: true, onChangeServer: true, order: 6, style: { width: '270px' }
    }),
    __metadata("design:type", Object)
], DocumentOperation.prototype, "Operation", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', order: 7 }),
    __metadata("design:type", Object)
], DocumentOperation.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, order: 7, label: 'Cur', style: { width: '70px' } }),
    __metadata("design:type", Object)
], DocumentOperation.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', label: 'additional filed #1', style: { width: '270px' }, hiddenInForm: true }),
    __metadata("design:type", Object)
], DocumentOperation.prototype, "f1", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', label: 'additional filed #2', style: { width: '270px' }, hiddenInForm: true }),
    __metadata("design:type", Object)
], DocumentOperation.prototype, "f2", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Catalog', label: 'additional filed #3', style: { width: '270px' }, hiddenInForm: true }),
    __metadata("design:type", Object)
], DocumentOperation.prototype, "f3", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.User', hiddenInList: false, hiddenInForm: true, order: 1000 }),
    __metadata("design:type", Object)
], DocumentOperation.prototype, "user", void 0);
DocumentOperation = __decorate([
    jetti_middle_1.JDocument({
        type: 'Document.Operation',
        description: 'Operation',
        dimensions: [
            { Operation: 'Catalog.Operation' },
            { Amount: 'number' },
            { currency: 'Catalog.Currency' },
            { f1: 'string' },
            { f2: 'string' },
            { f3: 'string' },
            { company: 'Catalog.Company' }
        ],
        icon: 'far fa-file-alt',
        menu: 'Operations',
        prefix: 'OPER-',
        commands: [],
        relations: [
            { name: 'Descendants', type: 'Document.Operation', field: 'parent' }
        ]
    })
], DocumentOperation);
exports.DocumentOperation = DocumentOperation;
//# sourceMappingURL=Document.Operation.js.map