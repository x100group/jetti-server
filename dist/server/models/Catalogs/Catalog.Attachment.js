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
exports.CatalogAttachment = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogAttachment = class CatalogAttachment extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.owner = null;
        this.timestamp = null;
        this.user = null;
        this.date = new Date();
        this.AttachmentType = null;
        this.Storage = '';
        this.Tags = '';
        this.FileSize = '';
        this.FileName = '';
        this.MIMEType = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Attachment', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogAttachment.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Object', required: true, order: 1 }),
    __metadata("design:type", Object)
], CatalogAttachment.prototype, "owner", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'datetime', label: 'Modify', hidden: false }),
    __metadata("design:type", Object)
], CatalogAttachment.prototype, "timestamp", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.User', hiddenInList: false }),
    __metadata("design:type", Object)
], CatalogAttachment.prototype, "user", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'datetime', label: 'Created', hidden: false }),
    __metadata("design:type", Object)
], CatalogAttachment.prototype, "date", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Attachment.Type', required: true }),
    __metadata("design:type", Object)
], CatalogAttachment.prototype, "AttachmentType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogAttachment.prototype, "Storage", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogAttachment.prototype, "Tags", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'File size, bytes' }),
    __metadata("design:type", Object)
], CatalogAttachment.prototype, "FileSize", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'File name' }),
    __metadata("design:type", Object)
], CatalogAttachment.prototype, "FileName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'MIME-type' }),
    __metadata("design:type", Object)
], CatalogAttachment.prototype, "MIMEType", void 0);
CatalogAttachment = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Attachment',
        description: 'Вложение',
        icon: 'fa fa-list',
        menu: 'Вложения',
        hierarchy: 'folders'
    })
], CatalogAttachment);
exports.CatalogAttachment = CatalogAttachment;
//# sourceMappingURL=Catalog.Attachment.js.map