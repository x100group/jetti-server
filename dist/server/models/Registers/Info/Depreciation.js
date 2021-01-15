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
exports.RegisterInfoDepreciation = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoDepreciation = class RegisterInfoDepreciation extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.OE = null;
        this.StartDate = new Date();
        this.Period = 0;
        this.StartCost = 0;
        this.EndCost = 0;
        this.Method = 'LIN';
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.ObjectsExploitation' }),
    __metadata("design:type", Object)
], RegisterInfoDepreciation.prototype, "OE", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', required: true }),
    __metadata("design:type", Date)
], RegisterInfoDepreciation.prototype, "StartDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: true }),
    __metadata("design:type", Object)
], RegisterInfoDepreciation.prototype, "Period", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: true }),
    __metadata("design:type", Object)
], RegisterInfoDepreciation.prototype, "StartCost", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], RegisterInfoDepreciation.prototype, "EndCost", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', value: ['LIN', 'PROP'] }),
    __metadata("design:type", Object)
], RegisterInfoDepreciation.prototype, "Method", void 0);
RegisterInfoDepreciation = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.Depreciation',
        description: 'Настройки атортизации ОЭ',
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoDepreciation);
exports.RegisterInfoDepreciation = RegisterInfoDepreciation;
//# sourceMappingURL=Depreciation.js.map