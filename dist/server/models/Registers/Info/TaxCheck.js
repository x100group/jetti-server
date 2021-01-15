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
exports.RegisterInfoTaxCheck = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoTaxCheck = class RegisterInfoTaxCheck extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.clientInn = '';
        this.inn = '';
        this.totalAmount = 0;
        this.receiptId = '';
        this.operationTime = null;
        this.modifyDate = null;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'string', isIndexed: true }),
    __metadata("design:type", Object)
], RegisterInfoTaxCheck.prototype, "clientInn", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', isIndexed: true }),
    __metadata("design:type", Object)
], RegisterInfoTaxCheck.prototype, "inn", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], RegisterInfoTaxCheck.prototype, "totalAmount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', isIndexed: true }),
    __metadata("design:type", Object)
], RegisterInfoTaxCheck.prototype, "receiptId", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'datetime' }),
    __metadata("design:type", Object)
], RegisterInfoTaxCheck.prototype, "operationTime", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'datetime' }),
    __metadata("design:type", Object)
], RegisterInfoTaxCheck.prototype, "modifyDate", void 0);
RegisterInfoTaxCheck = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.TaxCheck',
        description: 'Чеки',
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoTaxCheck);
exports.RegisterInfoTaxCheck = RegisterInfoTaxCheck;
//# sourceMappingURL=TaxCheck.js.map