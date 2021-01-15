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
exports.CatalogDocuments = void 0;
const jetti_middle_1 = require("jetti-middle");
const documents_factory_1 = require("./../../models/documents.factory");
const jetti_middle_2 = require("jetti-middle");
let CatalogDocuments = class CatalogDocuments extends jetti_middle_2.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
    }
    QueryList() {
        const select = documents_factory_1.RegisteredDocumentsTypes(el => jetti_middle_1.Type.isDocument(el.type))
            .map(type => ({ type, description: (documents_factory_1.createDocument(type).Prop()).description }));
        return jetti_middle_1.buildSubcountQueryList(select);
    }
};
__decorate([
    jetti_middle_2.Props({ type: 'Catalog.Documents', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogDocuments.prototype, "parent", void 0);
CatalogDocuments = __decorate([
    jetti_middle_2.JDocument({
        type: 'Catalog.Documents',
        description: 'Documents types',
        icon: '',
        menu: 'Documents types',
        prefix: ''
    })
], CatalogDocuments);
exports.CatalogDocuments = CatalogDocuments;
//# sourceMappingURL=Catalog.Documents.js.map