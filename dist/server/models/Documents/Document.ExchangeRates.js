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
exports.DocumentExchangeRates = void 0;
const jetti_middle_1 = require("jetti-middle");
let DocumentExchangeRates = class DocumentExchangeRates extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.company = null;
        this.Rates = [new TableRates()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], DocumentExchangeRates.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, onChangeServer: true, style: { width: '350px' } }),
    __metadata("design:type", Object)
], DocumentExchangeRates.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', required: true, order: 1 }),
    __metadata("design:type", Array)
], DocumentExchangeRates.prototype, "Rates", void 0);
DocumentExchangeRates = __decorate([
    jetti_middle_1.JDocument({
        type: 'Document.ExchangeRates',
        description: 'Exchange rates',
        icon: 'far fa-file-alt',
        menu: 'Exchange rates',
        prefix: 'EXC-'
    })
], DocumentExchangeRates);
exports.DocumentExchangeRates = DocumentExchangeRates;
class TableRates {
    constructor() {
        this.Currency = null;
        this.Rate = 1;
        this.Mutiplicity = 1;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, style: { width: '150px' } }),
    __metadata("design:type", Object)
], TableRates.prototype, "Currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: true, style: { 'width': '150px', 'text-align': 'right' } }),
    __metadata("design:type", Object)
], TableRates.prototype, "Rate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', required: true, style: { 'width': '150px', 'text-align': 'right' } }),
    __metadata("design:type", Object)
], TableRates.prototype, "Mutiplicity", void 0);
//# sourceMappingURL=Document.ExchangeRates.js.map