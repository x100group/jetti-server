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
exports.CatalogRetailClient = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogRetailClient = class CatalogRetailClient extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Gender = null;
        this.isActive = '';
        this.CreateDate = null;
        this.Birthday = null;
        this.FirstName = '';
        this.LastName = '';
        this.MiddleName = '';
        this.Phone = '';
        this.Address = '';
        this.Email = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.RetailClient', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogRetailClient.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['MALE', 'FEMALE', 'SELF'] }),
    __metadata("design:type", Object)
], CatalogRetailClient.prototype, "Gender", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogRetailClient.prototype, "isActive", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], CatalogRetailClient.prototype, "CreateDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], CatalogRetailClient.prototype, "Birthday", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogRetailClient.prototype, "FirstName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogRetailClient.prototype, "LastName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogRetailClient.prototype, "MiddleName", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogRetailClient.prototype, "Phone", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogRetailClient.prototype, "Address", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], CatalogRetailClient.prototype, "Email", void 0);
CatalogRetailClient = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.RetailClient',
        description: 'Розничный клиент',
        icon: 'fa fa-list',
        menu: 'Розничные клиенты',
        hierarchy: 'folders'
    })
], CatalogRetailClient);
exports.CatalogRetailClient = CatalogRetailClient;
//# sourceMappingURL=Catalog.RetailClient.js.map