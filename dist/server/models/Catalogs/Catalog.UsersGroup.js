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
exports.CatalogUsersGroup = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogUsersGroup = class CatalogUsersGroup extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.code = '';
        this.Users = [new Users()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.UsersGroup', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogUsersGroup.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', order: 1, required: true, style: { width: '250px' } }),
    __metadata("design:type", Object)
], CatalogUsersGroup.prototype, "code", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 3, label: 'Users' }),
    __metadata("design:type", Array)
], CatalogUsersGroup.prototype, "Users", void 0);
CatalogUsersGroup = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.UsersGroup',
        description: 'Группа пользователей',
        icon: 'fa fa-list',
        menu: 'Группы пользователе',
    })
], CatalogUsersGroup);
exports.CatalogUsersGroup = CatalogUsersGroup;
class Users {
    constructor() {
        this.User = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.User', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], Users.prototype, "User", void 0);
//# sourceMappingURL=Catalog.UsersGroup.js.map