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
exports.CatalogAcquiringTerminal = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogAcquiringTerminal = class CatalogAcquiringTerminal extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.company = null;
        this.BankAccount = null;
        this.Counterpartie = null;
        this.Department = null;
        this.isDefault = false;
        this.Code1 = '';
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.AcquiringTerminal', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogAcquiringTerminal.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, hiddenInList: false }),
    __metadata("design:type", Object)
], CatalogAcquiringTerminal.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BankAccount', required: true }),
    __metadata("design:type", Object)
], CatalogAcquiringTerminal.prototype, "BankAccount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Counterpartie', required: true }),
    __metadata("design:type", Object)
], CatalogAcquiringTerminal.prototype, "Counterpartie", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department' }),
    __metadata("design:type", Object)
], CatalogAcquiringTerminal.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean' }),
    __metadata("design:type", Object)
], CatalogAcquiringTerminal.prototype, "isDefault", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Мерчант' }),
    __metadata("design:type", Object)
], CatalogAcquiringTerminal.prototype, "Code1", void 0);
CatalogAcquiringTerminal = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.AcquiringTerminal',
        description: 'Банковский терминал',
        icon: 'fa fa-list',
        menu: 'Банковские терминалы',
        prefix: 'AQTERM-'
    })
], CatalogAcquiringTerminal);
exports.CatalogAcquiringTerminal = CatalogAcquiringTerminal;
//# sourceMappingURL=Catalog.AcquiringTerminal.js.map