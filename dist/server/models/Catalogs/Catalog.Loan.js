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
exports.Agreement = exports.CatalogLoan = void 0;
const jetti_middle_1 = require("jetti-middle");
let CatalogLoan = class CatalogLoan extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.company = null;
        this.date = new Date();
        this.PayDay = null;
        this.CloseDay = null;
        this.owner = null;
        this.OwnerBankAccount = null;
        this.CashKind = 'ANY';
        this.kind = 'IN';
        this.Status = 'PREPARED';
        this.InvestorGroup = null;
        this.InterestRate = 0;
        this.InterestDeadline = null;
        this.loanType = null;
        this.Department = null;
        this.AmountLoan = 0;
        this.currency = null;
        this.Country = null;
        this.Lot = null;
        this.LotQty = 0;
        this.LoanRepaymentProcedure = null;
        this.PayDeadline = null;
        this.Agreements = [new Agreement()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Loan', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', required: true, onChangeServer: true, style: { width: '250px' }, isProtected: true }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', hiddenInForm: false, hiddenInList: false, hidden: false, order: 1 }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "date", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', order: 5, label: 'Open date' }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "PayDay", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', label: 'Close date', order: 6 }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "CloseDay", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.CompanyOrCounterpartieOrPerson', required: true, isProtected: true, order: 4, isIndexed: true }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "owner", void 0);
__decorate([
    jetti_middle_1.Props({
        order: 8,
        type: 'Catalog.Counterpartie.BankAccount',
        owner: [
            { dependsOn: 'owner', filterBy: 'owner' },
            { dependsOn: 'currency', filterBy: 'currency' }
        ]
    }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "OwnerBankAccount", void 0);
__decorate([
    jetti_middle_1.Props({
        order: 7,
        type: 'enum', style: { width: '140px' },
        value: [
            'BANK',
            'CASH',
            'ANY',
        ]
    }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "CashKind", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', required: true, order: 3, value: [
            'IN',
            'IN BANK',
            'OUT',
            'OUT BANK',
        ]
    }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "kind", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', required: true, value: [
            'PREPARED',
            'ACTIVE',
            'CLOSED',
        ]
    }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "Status", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.InvestorGroup' }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "InvestorGroup", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', order: 777 }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "InterestRate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', label: 'Interest deadline', order: 777 }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "InterestDeadline", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.LoanTypes' }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "loanType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', required: true }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', order: 777 }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "AmountLoan", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, style: { width: '100px' }, isProtected: true }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Country', order: 777 }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "Country", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', order: 777, label: 'Lot/Service' }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "Lot", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', order: 777, label: 'Lot/Service (quantity)' }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "LotQty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.LoanRepaymentProcedure', order: 777 }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "LoanRepaymentProcedure", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', label: 'Pay deadline', order: 777 }),
    __metadata("design:type", Object)
], CatalogLoan.prototype, "PayDeadline", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'table', required: false, label: 'Agreements'
    }),
    __metadata("design:type", Array)
], CatalogLoan.prototype, "Agreements", void 0);
CatalogLoan = __decorate([
    jetti_middle_1.JDocument({
        type: 'Catalog.Loan',
        description: 'Договор кредита/займа',
        icon: 'fa fa-list',
        menu: 'Договоры кредита/займа',
        prefix: 'LOAN-'
    })
], CatalogLoan);
exports.CatalogLoan = CatalogLoan;
class Agreement {
    constructor() {
        this.AgreementCode = '';
        this.AgreementDate = null;
        this.AgreementDeadline = null;
        this.AgreementStatus = '0 не определен';
        this.AgreementCostCompany = 0;
        this.AgreementSeller = null;
        this.AgreementBuyer = null;
        this.AgreementShareCompany = null;
        this.AgreementSharePrice = '';
        this.AgreementShareQty = '';
        this.AgreementHologram = '';
        // tslint:disable-next-line: max-line-length
        this.AgreementAmount = 0;
        this.AgreementInterest = 0;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Code' }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementCode", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', label: 'Date' }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', label: 'Deadline' }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementDeadline", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', label: 'Status', value: [
            '0 не определен',
            '1 заведен договор займа',
            '2 подписан договор займа',
            '3 частично оплачен договор займа',
            '4 оплачен договор займа',
            '5 опцион выписан',
            '6 опцион подписан',
            '7 заведен агентский договор',
            '8 подписан агентский договор',
            '9 частично олачен агентский договор',
            '10 олачен агентский договор',
            '11 отправлен',
            '12 оформлен',
            '13 расторгнут',
            '14 смена вида вложения'
        ]
    }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementStatus", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Company cost', style: { width: '100px', textAlign: 'right', background: 'lightgoldenrodyellow', color: 'black' }, totals: 1 }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementCostCompany", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', label: 'Seller' }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementSeller", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Counterpartie', label: 'Buyer' }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementBuyer", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', label: 'Company share' }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementShareCompany", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Share price', style: { width: '100px', textAlign: 'right', background: 'lightgoldenrodyellow', color: 'black' } }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementSharePrice", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Share q-ty', style: { width: '100px', textAlign: 'right', background: 'lightgoldenrodyellow', color: 'black' }, totals: 1 }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementShareQty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Hologram №' }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementHologram", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Amount ', style: { width: '100px', textAlign: 'right', background: 'lightgoldenrodyellow', color: 'black' }, totals: 1 }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementAmount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Interest', style: { width: '100px', textAlign: 'right', background: 'lightgoldenrodyellow', color: 'black' } }),
    __metadata("design:type", Object)
], Agreement.prototype, "AgreementInterest", void 0);
exports.Agreement = Agreement;
//# sourceMappingURL=Catalog.Loan.js.map