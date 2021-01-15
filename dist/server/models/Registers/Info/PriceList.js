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
exports.RegisterInfoPriceList = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoPriceList = class RegisterInfoPriceList extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.Department = null;
        this.Storehouse = null;
        this.Product = null;
        this.Role = 'CONSTANT';
        this.Unit = null;
        this.currency = null;
        this.PriceType = null;
        this.Price = 0;
        this.forSales = false;
        this.forPurchases = false;
        this.isActive = false;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', required: true }),
    __metadata("design:type", Object)
], RegisterInfoPriceList.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Storehouse', required: true }),
    __metadata("design:type", Object)
], RegisterInfoPriceList.prototype, "Storehouse", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', required: true }),
    __metadata("design:type", Object)
], RegisterInfoPriceList.prototype, "Product", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['CONSTANT', 'ADDITIONAL', 'TRIAL'] }),
    __metadata("design:type", Object)
], RegisterInfoPriceList.prototype, "Role", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Unit', required: true }),
    __metadata("design:type", Object)
], RegisterInfoPriceList.prototype, "Unit", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true }),
    __metadata("design:type", Object)
], RegisterInfoPriceList.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.PriceType' }),
    __metadata("design:type", Object)
], RegisterInfoPriceList.prototype, "PriceType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: true }),
    __metadata("design:type", Object)
], RegisterInfoPriceList.prototype, "Price", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], RegisterInfoPriceList.prototype, "forSales", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], RegisterInfoPriceList.prototype, "forPurchases", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], RegisterInfoPriceList.prototype, "isActive", void 0);
RegisterInfoPriceList = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.PriceList',
        description: 'Price list',
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoPriceList);
exports.RegisterInfoPriceList = RegisterInfoPriceList;
//# sourceMappingURL=PriceList.js.map