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
exports.RegisterInfoExchangeRatesNational = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoExchangeRatesNational = class RegisterInfoExchangeRatesNational extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.Country = null;
        this.Currency1 = null;
        this.Currency2 = null;
        this.Rate = 1;
        this.Mutiplicity = 1;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Country' }),
    __metadata("design:type", Object)
], RegisterInfoExchangeRatesNational.prototype, "Country", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true }),
    __metadata("design:type", Object)
], RegisterInfoExchangeRatesNational.prototype, "Currency1", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true }),
    __metadata("design:type", Object)
], RegisterInfoExchangeRatesNational.prototype, "Currency2", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: true }),
    __metadata("design:type", Object)
], RegisterInfoExchangeRatesNational.prototype, "Rate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number' }),
    __metadata("design:type", Object)
], RegisterInfoExchangeRatesNational.prototype, "Mutiplicity", void 0);
RegisterInfoExchangeRatesNational = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.ExchangeRates.National',
        description: 'Exchange rates national',
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoExchangeRatesNational);
exports.RegisterInfoExchangeRatesNational = RegisterInfoExchangeRatesNational;
//# sourceMappingURL=ExchangeRates.National.js.map