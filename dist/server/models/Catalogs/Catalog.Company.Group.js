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
exports.CatalogCompanyGroup = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogCompanyGroup = class CatalogCompanyGroup extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.FullName = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company.Group', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogCompanyGroup.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: false }),
    __metadata("design:type", Object)
], CatalogCompanyGroup.prototype, "FullName", void 0);
CatalogCompanyGroup = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Company.Group',
        description: 'Группа организаций',
        icon: 'fa fa-list',
        menu: 'Группы организаций',
        hierarchy: 'folders',
        relations: [
            { name: 'company', type: 'Catalog.Company', field: 'company' },
            { name: 'Responsible persons', type: 'Register.Info.CompanyResponsiblePersons', field: 'companyOrGroup.id' },
        ],
    })
], CatalogCompanyGroup);
exports.CatalogCompanyGroup = CatalogCompanyGroup;
//# sourceMappingURL=Catalog.Company.Group.js.map