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
exports.RegisterInfoSettlementsReconciliation = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoSettlementsReconciliation = class RegisterInfoSettlementsReconciliation extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.Customer = null;
        this.Contract = null;
        this.company = null;
        this.Status = 'APPROVED';
        this.currency = null;
        this.Period = null;
        this.Operation = null;
        this.OperationDescription = '';
        this.OperationInDocNumber = '';
        this.OperationInDocDate = '';
        this.Comment = 0;
        this.Amount = 0;
        this.AmountPaid = 0;
        this.AmountBalance = 0;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Counterpartie', required: true, unique: true, order: 1, dimension: true }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "Customer", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Contract', unique: true, order: 2, dimension: true }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "Contract", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, unique: true, order: 3, dimension: true }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', required: true, value: ['PREPARED', 'AWAITING', 'APPROVED'], dimension: true, order: 4 }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "Status", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true, order: 5 }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "Period", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Document.Operation' }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "Operation", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "OperationDescription", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "OperationInDocNumber", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date' }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "OperationInDocDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "Comment", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "AmountPaid", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterInfoSettlementsReconciliation.prototype, "AmountBalance", void 0);
RegisterInfoSettlementsReconciliation = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.SettlementsReconciliation',
        description: 'Сверки взаиморасчетов',
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoSettlementsReconciliation);
exports.RegisterInfoSettlementsReconciliation = RegisterInfoSettlementsReconciliation;
//# sourceMappingURL=SettlementsReconciliation.js.map