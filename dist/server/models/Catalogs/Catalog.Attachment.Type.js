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
exports.CatalogAttachmentType = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogAttachmentType = class CatalogAttachmentType extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.AllDocuments = false;
        this.AllCatalogs = false;
        this.MaxFileSize = 1000000;
        this.FileFilter = 'image/*';
        this.StorageType = false;
        this.IconURL = '';
        this.Tags = '';
        this.LoadDataOnInit = false;
        this.Owners = [new OwnerType()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Attachment.Type', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogAttachmentType.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogAttachmentType.prototype, "AllDocuments", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogAttachmentType.prototype, "AllCatalogs", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Max file size in bytes' }) // Maximum file size allowed in bytes.
    ,
    __metadata("design:type", Object)
], CatalogAttachmentType.prototype, "MaxFileSize", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }) // http://www.w3schools.com/tags/att_input_accept.asp
    ,
    __metadata("design:type", Object)
], CatalogAttachmentType.prototype, "FileFilter", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['URL', 'FILE'], required: true }),
    __metadata("design:type", Object)
], CatalogAttachmentType.prototype, "StorageType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogAttachmentType.prototype, "IconURL", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Tags (string splitted by ";")' }) // string splitted by ','
    ,
    __metadata("design:type", Object)
], CatalogAttachmentType.prototype, "Tags", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }) // load data to client on component init (for pictures in FILE)
    ,
    __metadata("design:type", Object)
], CatalogAttachmentType.prototype, "LoadDataOnInit", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table' }),
    __metadata("design:type", Array)
], CatalogAttachmentType.prototype, "Owners", void 0);
CatalogAttachmentType = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Attachment.Type',
        description: 'Тип вложения',
        icon: 'fa fa-list',
        menu: 'Типы вложений',
        hierarchy: 'folders'
    })
], CatalogAttachmentType);
exports.CatalogAttachmentType = CatalogAttachmentType;
class OwnerType {
    constructor() {
        this.OwnerType = '';
        this.Group = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Subcount', required: true }),
    __metadata("design:type", Object)
], OwnerType.prototype, "OwnerType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Group', style: { width: '100%' } }),
    __metadata("design:type", Object)
], OwnerType.prototype, "Group", void 0);
//# sourceMappingURL=Catalog.Attachment.Type.js.map