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
exports.RegisterInfoCounterpartiePriceList = void 0;
const jetti_middle_1 = require("jetti-middle");
const jetti_middle_2 = require("jetti-middle");
let RegisterInfoCounterpartiePriceList = class RegisterInfoCounterpartiePriceList extends jetti_middle_2.RegisterInfo {
    constructor(init) {
        super(init);
        this.company = null;
        this.Scenario = 'ACTUAL';
        this.Counterpartie = null;
        this.Contract = null;
        this.DocNumber = '';
        this.DocDate = null;
        this.Department = null;
        this.Storehouse = null;
        this.Product = null;
        this.Qty = 0;
        this.Price = 0;
        this.Cost = 0;
        this.currency = null;
        Object.assign(this, init);
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, unique: true, order: 1 }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', required: true, value: [
            'PLAN',
            'ACTUAL',
        ]
    }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "Scenario", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Counterpartie', required: true, unique: true, order: 2 }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "Counterpartie", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Contract', order: 3 }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "Contract", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', resource: true, order: 4 }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "DocNumber", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'datetime', resource: true, order: 5 }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "DocDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', order: 6 }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Storehouse', order: 7 }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "Storehouse", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "Product", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "Qty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "Price", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', resource: true }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "Cost", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, dimension: true }),
    __metadata("design:type", Object)
], RegisterInfoCounterpartiePriceList.prototype, "currency", void 0);
RegisterInfoCounterpartiePriceList = __decorate([
    jetti_middle_2.JRegisterInfo({
        type: 'Register.Info.CounterpartiePriceList',
        description: 'Цены контрагентов',
    }),
    __metadata("design:paramtypes", [Object])
], RegisterInfoCounterpartiePriceList);
exports.RegisterInfoCounterpartiePriceList = RegisterInfoCounterpartiePriceList;
//# sourceMappingURL=CounterpartiePriceList.js.map