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
exports.DocumentWorkFlow = void 0;
const jetti_middle_1 = require("jetti-middle");
let DocumentWorkFlow = class DocumentWorkFlow extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.user = null;
        this.Document = null;
        this.Status = 'PREPARED';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], DocumentWorkFlow.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.User', hiddenInList: false, order: -1 }),
    __metadata("design:type", Object)
], DocumentWorkFlow.prototype, "user", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Object', required: true, label: 'Document' }),
    __metadata("design:type", Object)
], DocumentWorkFlow.prototype, "Document", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', required: true, value: [
            'PREPARED',
            'AWAITING',
            'APPROVED',
            'REJECTED',
        ] }),
    __metadata("design:type", Object)
], DocumentWorkFlow.prototype, "Status", void 0);
DocumentWorkFlow = __decorate([
    jetti_middle_1.JDocument({
        type: 'Document.WorkFlow',
        description: 'Workflow',
        dimensions: [
            { Status: 'enum' },
            { Document: 'Types.Object' },
            { user: 'Catalog.User' },
        ],
        icon: 'far fa-file-alt',
        menu: 'WorkFlow list',
        prefix: 'WF-'
    })
], DocumentWorkFlow);
exports.DocumentWorkFlow = DocumentWorkFlow;
//# sourceMappingURL=Document.WokrFlow.js.map