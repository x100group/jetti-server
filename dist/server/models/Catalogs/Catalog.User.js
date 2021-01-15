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
exports.CatalogUser = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogUser = class CatalogUser extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.code = '';
        this.isAdmin = false;
        this.isDisabled = false;
        this.Person = null;
        this.Department = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.User', hiddenInList: true, order: -1, storageType: 'folders' }),
    __metadata("design:type", Object)
], CatalogUser.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 1, required: true, style: { width: '250px' }, isUnique: true }),
    __metadata("design:type", Object)
], CatalogUser.prototype, "code", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogUser.prototype, "isAdmin", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogUser.prototype, "isDisabled", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person' }),
    __metadata("design:type", Object)
], CatalogUser.prototype, "Person", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department' }),
    __metadata("design:type", Object)
], CatalogUser.prototype, "Department", void 0);
CatalogUser = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.User',
        description: 'Пользователь',
        icon: 'fa fa-list',
        menu: 'Пользователи',
        prefix: 'USR-',
        hierarchy: 'folders',
        relations: [
            { name: 'Responsible persons', type: 'Register.Info.CompanyResponsiblePersons', field: '[User].id' },
            { name: 'Loan owner', type: 'Register.Info.LoanOwner', field: '[User].id' },
        ],
    })
], CatalogUser);
exports.CatalogUser = CatalogUser;
//# sourceMappingURL=Catalog.User.js.map