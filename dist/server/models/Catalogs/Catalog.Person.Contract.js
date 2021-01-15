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
exports.CatalogPersonContract = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogPersonContract = class CatalogPersonContract extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.description = '';
        this.owner = null;
        this.currency = null;
        this.Status = 'OPEN';
        this.StartDate = null;
        this.EndDate = null;
        this.BankAccount = null;
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person.Contract', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogPersonContract.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', style: { width: '300px' }, readOnly: true }),
    __metadata("design:type", Object)
], CatalogPersonContract.prototype, "description", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person', required: true, order: 1 }),
    __metadata("design:type", Object)
], CatalogPersonContract.prototype, "owner", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true }),
    __metadata("design:type", Object)
], CatalogPersonContract.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', value: ['OPEN', 'CLOSE', 'PENDING'], required: true }),
    __metadata("design:type", Object)
], CatalogPersonContract.prototype, "Status", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', required: true }),
    __metadata("design:type", Object)
], CatalogPersonContract.prototype, "StartDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', required: true }),
    __metadata("design:type", Object)
], CatalogPersonContract.prototype, "EndDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person.BankAccount', required: true,
        owner: [
            { dependsOn: 'owner', filterBy: 'owner' }
        ] }),
    __metadata("design:type", Object)
], CatalogPersonContract.prototype, "BankAccount", void 0);
CatalogPersonContract = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Person.Contract',
        description: 'Договор с физ.лицом',
        icon: 'fa fa-list',
        menu: 'Договоры с физ.лицами',
        prefix: 'CONTR.P-'
    })
], CatalogPersonContract);
exports.CatalogPersonContract = CatalogPersonContract;
//# sourceMappingURL=Catalog.Person.Contract.js.map