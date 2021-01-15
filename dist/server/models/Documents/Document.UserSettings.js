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
exports.CompanyItems = exports.DocumentUserSettings = void 0;
const jetti_middle_1 = require("jetti-middle");
let DocumentUserSettings = class DocumentUserSettings extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.UserOrGroup = null;
        this.COMP = false;
        this.DEPT = false;
        this.STOR = false;
        this.CASH = false;
        this.BANK = false;
        this.GROUP = false;
        this.RoleList = [new RoleItems()];
        this.CompanyList = [new CompanyItems()];
        this.Departments = [new Departments()];
        this.Storehouses = [new Storehouses()];
        this.CashRegisters = [new CashRegisters()];
        this.BankAccounts = [new BankAccounts()];
        this.OperationGroups = [new OperationGroups()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], DocumentUserSettings.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.UserOrGroup', required: true }),
    __metadata("design:type", Object)
], DocumentUserSettings.prototype, "UserOrGroup", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'Exclude Companys' }),
    __metadata("design:type", Object)
], DocumentUserSettings.prototype, "COMP", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'Exclude Departments' }),
    __metadata("design:type", Object)
], DocumentUserSettings.prototype, "DEPT", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'Exclude Storehouse' }),
    __metadata("design:type", Object)
], DocumentUserSettings.prototype, "STOR", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'Exclude CashRegisters' }),
    __metadata("design:type", Object)
], DocumentUserSettings.prototype, "CASH", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'Exclude BankAccounts' }),
    __metadata("design:type", Object)
], DocumentUserSettings.prototype, "BANK", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'Exclude Operations ' }),
    __metadata("design:type", Object)
], DocumentUserSettings.prototype, "GROUP", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 1, label: 'Roles' }),
    __metadata("design:type", Array)
], DocumentUserSettings.prototype, "RoleList", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 2, label: 'Сompanys' }),
    __metadata("design:type", Array)
], DocumentUserSettings.prototype, "CompanyList", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 3, label: 'Departments' }),
    __metadata("design:type", Array)
], DocumentUserSettings.prototype, "Departments", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 4, label: 'Storehouses' }),
    __metadata("design:type", Array)
], DocumentUserSettings.prototype, "Storehouses", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 5, label: 'CashRegisters' }),
    __metadata("design:type", Array)
], DocumentUserSettings.prototype, "CashRegisters", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 6, label: 'BankAccounts' }),
    __metadata("design:type", Array)
], DocumentUserSettings.prototype, "BankAccounts", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 7, label: 'Operation Groups' }),
    __metadata("design:type", Array)
], DocumentUserSettings.prototype, "OperationGroups", void 0);
DocumentUserSettings = __decorate([
    jetti_middle_1.JDocument({
        type: 'Document.UserSettings',
        description: 'User settings',
        icon: 'far fa-file-alt',
        menu: 'User settings',
        prefix: 'USET-',
        commands: [
            { method: 'AddDescendantsCompany', icon: 'pi pi-plus', label: 'Добавить починенные компании', order: 1 },
            { method: 'ClearCompanyList', icon: 'pi pi-plus', label: 'Очистить ТЧ "Companys"', order: 2 }
        ],
    })
], DocumentUserSettings);
exports.DocumentUserSettings = DocumentUserSettings;
class RoleItems {
    constructor() {
        this.Role = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Role', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], RoleItems.prototype, "Role", void 0);
class CompanyItems {
    constructor() {
        this.company = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], CompanyItems.prototype, "company", void 0);
exports.CompanyItems = CompanyItems;
class OperationGroups {
    constructor() {
        this.Group = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Group', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], OperationGroups.prototype, "Group", void 0);
class Storehouses {
    constructor() {
        this.Storehouse = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Storehouse', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], Storehouses.prototype, "Storehouse", void 0);
class CashRegisters {
    constructor() {
        this.CashRegister = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashRegister', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], CashRegisters.prototype, "CashRegister", void 0);
class BankAccounts {
    constructor() {
        this.BankAccount = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BankAccount', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], BankAccounts.prototype, "BankAccount", void 0);
class Departments {
    constructor() {
        this.Department = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', required: true, style: { width: '100%' } }),
    __metadata("design:type", Object)
], Departments.prototype, "Department", void 0);
//# sourceMappingURL=Document.UserSettings.js.map