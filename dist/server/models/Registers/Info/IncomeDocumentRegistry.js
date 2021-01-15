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
exports.RegisterInfoIncomeDocumentRegistry = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoIncomeDocumentRegistry = class RegisterInfoIncomeDocumentRegistry extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.StatusRegistry = '';
        this.OperationType = null;
        this.Counterpartie = null;
        this.Currency = null;
        this.Department = null;
        this.DocNumber = '';
        this.DocJETTI = null;
        this.AmountIncome = 0;
        this.AmountJETTI = 0;
        this.ReasonType = null;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], RegisterInfoIncomeDocumentRegistry.prototype, "StatusRegistry", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Operation.Type' }),
    __metadata("design:type", Object)
], RegisterInfoIncomeDocumentRegistry.prototype, "OperationType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Counterpartie' }),
    __metadata("design:type", Object)
], RegisterInfoIncomeDocumentRegistry.prototype, "Counterpartie", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency' }),
    __metadata("design:type", Object)
], RegisterInfoIncomeDocumentRegistry.prototype, "Currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department' }),
    __metadata("design:type", Object)
], RegisterInfoIncomeDocumentRegistry.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], RegisterInfoIncomeDocumentRegistry.prototype, "DocNumber", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Document.Operation', isIndexed: true }),
    __metadata("design:type", Object)
], RegisterInfoIncomeDocumentRegistry.prototype, "DocJETTI", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], RegisterInfoIncomeDocumentRegistry.prototype, "AmountIncome", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], RegisterInfoIncomeDocumentRegistry.prototype, "AmountJETTI", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.ReasonTypes' }),
    __metadata("design:type", Object)
], RegisterInfoIncomeDocumentRegistry.prototype, "ReasonType", void 0);
RegisterInfoIncomeDocumentRegistry = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.IncomeDocumentRegistry',
        description: 'Реестр входящих документов',
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoIncomeDocumentRegistry);
exports.RegisterInfoIncomeDocumentRegistry = RegisterInfoIncomeDocumentRegistry;
//# sourceMappingURL=IncomeDocumentRegistry.js.map