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
exports.CashRequest = exports.DocumentCashRequestRegistry = void 0;
const jetti_middle_1 = require("jetti-middle");
let DocumentCashRequestRegistry = class DocumentCashRequestRegistry extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.company = null;
        this.Status = 'PREPARED';
        this.Operation = 'Оплата поставщику';
        this.CashKind = 'ANY';
        this.CashFlow = null;
        this.BusinessDirection = null;
        this.Amount = 0;
        this.сurrency = null;
        this.user = null;
        this.BankUploadDate = null;
        this.DocumentsCreationDate = null;
        this.CashRequests = [new CashRequest()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], DocumentCashRequestRegistry.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', order: 4, required: true, style: { width: '250px' } }),
    __metadata("design:type", Object)
], DocumentCashRequestRegistry.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'enum', required: true, value: ['PREPARED', 'AWAITING', 'APPROVED', 'REJECTED'] }),
    __metadata("design:type", Object)
], DocumentCashRequestRegistry.prototype, "Status", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', order: 8, label: 'Вид операции', value: [
            'Оплата поставщику',
            'Перечисление налогов и взносов',
            'Оплата ДС в другую организацию',
            'Выдача ДС подотчетнику',
            'Оплата по кредитам и займам полученным',
            'Прочий расход ДС',
            'Выдача займа контрагенту',
            'Возврат оплаты клиенту',
            'Выплата заработной платы',
            'Выплата заработной платы (наличные)',
            'Выплата заработной платы без ведомости',
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequestRegistry.prototype, "Operation", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', style: { width: '140px' }, required: true,
        value: [
            'BANK',
            'CASH',
            'ANY',
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequestRegistry.prototype, "CashKind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashFlow', storageType: 'all' }),
    __metadata("design:type", Object)
], DocumentCashRequestRegistry.prototype, "CashFlow", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BusinessDirection' }),
    __metadata("design:type", Object)
], DocumentCashRequestRegistry.prototype, "BusinessDirection", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', readOnly: true, style: { width: '100px', textAlign: 'right' }, totals: 1 }),
    __metadata("design:type", Object)
], DocumentCashRequestRegistry.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true }),
    __metadata("design:type", Object)
], DocumentCashRequestRegistry.prototype, "\u0441urrency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.User', hiddenInList: false, readOnly: true }),
    __metadata("design:type", Object)
], DocumentCashRequestRegistry.prototype, "user", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', isAdditional: true }),
    __metadata("design:type", Object)
], DocumentCashRequestRegistry.prototype, "BankUploadDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', isAdditional: true }),
    __metadata("design:type", Object)
], DocumentCashRequestRegistry.prototype, "DocumentsCreationDate", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'table', required: false, order: 1, label: 'Cash requests',
        onChange: function (doc, value) {
            let Amount = 0;
            value.forEach(el => { Amount += el.Amount; });
            return { Amount: Math.round(Amount * 100) / 100 };
        }
    }),
    __metadata("design:type", Array)
], DocumentCashRequestRegistry.prototype, "CashRequests", void 0);
DocumentCashRequestRegistry = __decorate([
    jetti_middle_1.JDocument({
        type: 'Document.CashRequestRegistry',
        description: 'Реестр оплат',
        icon: 'far fa-file-alt',
        menu: 'Реестр оплат',
        prefix: 'CRR-',
        dimensions: [
            { Status: 'enum' },
            { company: 'Catalog.Company' },
            { Amount: 'number' },
            { user: 'Catalog.User' },
            { CashFlow: 'Catalog.CashFlow' }
        ],
        commands: [
            { method: 'Fill', icon: 'pi pi-plus', label: 'Заполнить', order: 1 },
            { method: 'RefreshLinkedDocuments', icon: 'pi pi-plus', label: 'Обновить ссылки на документы', order: 2 },
            { method: 'Create', icon: 'pi pi-plus', label: 'Создать документы', order: 2 },
            {
                method: 'UnloadToText', icon: 'pi pi-plus', label: 'Выгрузить в текст', order: 3, clientModule: `return { afterExecution: () => {
          const savedValue = this.form.get('info').value;
          if (!savedValue) return;
          const vals = this.form;
          let fileName = '';
          if (savedValue.indexOf('COUNT_B') === -1)
          fileName = 'exchange_' + vals.get('code').value + '_' + vals.get('date').value.toLocaleDateString()+ '_' + vals.get('company').value.value + '.' + (savedValue.startsWith('<?xml version=') ? 'xml' : 'txt');
          else fileName = 'jbkl_snd+.csv';
          this.ds.download(savedValue, fileName);
        }
      }`
            },
            {
                method: 'ExportSalaryToCSV', icon: 'pi pi-plus', label: 'Выгрузить в CSV', order: 4, clientModule: `return { afterExecution: () => {
          const savedValue = this.form.get('info').value;
          if (!savedValue) return;
          const vals = this.form;
          fileName = 'salary_' + vals.get('code').value + '_' + vals.get('date').value.toLocaleDateString()+ '_' + vals.get('company').value.value + '.csv';
          this.ds.download(savedValue, fileName);
        }
      }`
            }
        ],
    })
], DocumentCashRequestRegistry);
exports.DocumentCashRequestRegistry = DocumentCashRequestRegistry;
class CashRequest {
    constructor() {
        this.OperationType = null;
        this.CashRequest = null;
        this.CashRequestAmount = 0;
        this.AmountPaid = 0;
        this.AmountBalance = 0;
        this.AmountRequest = 0;
        this.Delayed = 0;
        this.Amount = 0;
        this.Confirm = false;
        this.CashRecipient = null;
        this.company = null;
        this.CashRegister = null;
        this.BankAccount = null;
        this.BankAccountIn = null;
        this.CashRecipientBankAccount = null;
        this.BankAccountPerson = null;
        this.CountOfBankAccountCashRecipient = 0;
        this.LinkedDocument = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Operation type', readOnly: true, style: { width: '320px', textAlign: 'left' } }),
    __metadata("design:type", Object)
], CashRequest.prototype, "OperationType", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Document.CashRequest', label: 'Cash request', readOnly: true, style: { width: '320px', textAlign: 'left' } }),
    __metadata("design:type", Object)
], CashRequest.prototype, "CashRequest", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Cash request amount', readOnly: true, style: { width: '100px', textAlign: 'right' }, totals: 1 }),
    __metadata("design:type", Object)
], CashRequest.prototype, "CashRequestAmount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Paid/ToPay amount', readOnly: true, style: { width: '100px', textAlign: 'right' }, totals: 1 }),
    __metadata("design:type", Object)
], CashRequest.prototype, "AmountPaid", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Amount balance', readOnly: true, style: { width: '100px', textAlign: 'right' }, totals: 1 }),
    __metadata("design:type", Object)
], CashRequest.prototype, "AmountBalance", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'number', label: 'Amount request', readOnly: false,
        style: { width: '100px', textAlign: 'right', background: 'lightgoldenrodyellow', color: 'black' }, totals: 1
    }),
    __metadata("design:type", Object)
], CashRequest.prototype, "AmountRequest", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: '#AP', readOnly: true, style: { width: '60px', textAlign: 'center' } }),
    __metadata("design:type", Object)
], CashRequest.prototype, "Delayed", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'number', label: 'Amount', required: true,
        style: { width: '100px', textAlign: 'right', background: 'lightgoldenrodyellow', color: 'black' }, totals: 1,
        onChange: function (doc, value) {
            return { Confirm: value > 0 ? true : false };
        }
    }),
    __metadata("design:type", Object)
], CashRequest.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'Cnfrm', style: { width: '50px', textAlign: 'center' } }),
    __metadata("design:type", Object)
], CashRequest.prototype, "Confirm", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.CashRecipient', label: 'Cash recipient', readOnly: true }),
    __metadata("design:type", Object)
], CashRequest.prototype, "CashRecipient", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', label: 'Company', readOnly: true }),
    __metadata("design:type", Object)
], CashRequest.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.CashRegister', label: 'Cash register', owner: [
            { dependsOn: 'company', filterBy: 'company' },
            { dependsOn: 'currency', filterBy: 'currency' }
        ]
    }),
    __metadata("design:type", Object)
], CashRequest.prototype, "CashRegister", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.BankAccount', label: 'Bank account out', owner: [{ dependsOn: 'company', filterBy: 'company' },
            { dependsOn: 'currency', filterBy: 'currency' }], required: true
    }),
    __metadata("design:type", Object)
], CashRequest.prototype, "BankAccount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.BankAccount', label: 'Bank account in', owner: [{ dependsOn: 'company', filterBy: 'company' }, { dependsOn: 'currency', filterBy: 'currency' }] }),
    __metadata("design:type", Object)
], CashRequest.prototype, "BankAccountIn", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Counterpartie.BankAccount', label: 'Cash recipient bank account', owner: [
            { dependsOn: 'CashRecipient', filterBy: 'owner' }
        ]
    }),
    __metadata("design:type", Object)
], CashRequest.prototype, "CashRecipientBankAccount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person.BankAccount', label: 'Bank account person', readOnly: true, required: false }),
    __metadata("design:type", Object)
], CashRequest.prototype, "BankAccountPerson", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: '#BA', readOnly: true, style: { width: '40px', textAlign: 'right' } }),
    __metadata("design:type", Object)
], CashRequest.prototype, "CountOfBankAccountCashRecipient", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document', label: 'Linked document', readOnly: true, style: { width: '440px' } }),
    __metadata("design:type", Object)
], CashRequest.prototype, "LinkedDocument", void 0);
exports.CashRequest = CashRequest;
//# sourceMappingURL=Document.CashRequestRegistry.js.map