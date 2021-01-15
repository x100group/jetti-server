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
exports.Item = exports.PayRoll = exports.DocumentCashRequest = void 0;
const jetti_middle_1 = require("jetti-middle");
let DocumentCashRequest = class DocumentCashRequest extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.date = new Date();
        this.code = '';
        this.info = '';
        this.parent = null;
        this.user = null;
        this.Status = 'PREPARED';
        this.Operation = 'Оплата поставщику';
        this.company = null;
        this.PaymentKind = 'BODY';
        // для 'Выплата заработной платы','Выплата заработной платы без ведомости' для РФ обязательное поле с 1.06.2020
        this.EnforcementProceedings = '( ) Доходы без ограничения взысканий';
        this.CashKind = 'ANY';
        this.PayRollKind = 'SALARYPROJECT';
        this.Department = null;
        this.CashRecipient = null;
        this.Contract = null;
        this.PersonContract = null;
        this.ContractIntercompany = null;
        this.CashFlow = null;
        this.SalaryProject = null;
        this.Loan = null;
        this.CashOrBank = null;
        this.CashRecipientBankAccount = null;
        this.CashOrBankIn = null;
        this.PayDay = new Date();
        this.Amount = 0;
        // для 'Выплата заработной платы','Выплата заработной платы без ведомости' для РФ
        this.AmountPenalty = 0;
        this.сurrency = 'A4867005-66B8-4A8A-9105-3F25BB081936'; // RUB
        this.ExpenseOrBalance = null;
        this.ExpenseAnalytics = null;
        this.SalaryAnalitics = null;
        this.SKU = null;
        this.TaxRate = null;
        this.TaxKPP = '';
        this.TaxPaymentCode = null;
        this.TaxAssignmentCode = null;
        this.TaxPayerStatus = null;
        this.TaxBasisPayment = null;
        this.TaxPaymentPeriod = null;
        this.TaxDocNumber = '';
        this.TaxDocDate = '';
        this.TaxOfficeCode2 = '';
        this.BalanceAnalytics = null;
        this.workflowID = '';
        this.ManualInfo = false;
        this.BudgetPayment = false;
        this.RelatedURL = '';
        this.tempCompanyParent = null;
        this.tempSalaryKind = 'PAID';
        this.Manager = null;
        this.PayRolls = [new PayRoll()];
        this.Items = [new Item()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'datetime', label: 'Дата', order: 1 }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "date", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Номер', required: true, order: 2, style: { width: '135px' } }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "code", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Комментарий', hiddenInList: true, order: -1, controlType: 'textarea' }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "info", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document', label: 'Основание', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.User', label: 'Автор', readOnly: true, hiddenInList: false, order: 991, style: { width: '200px' } }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "user", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', required: true, readOnly: true, hiddenInList: false, style: { width: '100px' }, order: 7, label: 'Статус', value: [
            'PREPARED',
            'AWAITING',
            'MODIFY',
            'APPROVED',
            'REJECTED',
            'CLOSED',
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "Status", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', required: true, order: 8, style: { width: '250px' }, label: 'Вид операции', value: [
            'Оплата поставщику',
            'Перечисление налогов и взносов',
            'Оплата ДС в другую организацию',
            'Выдача ДС подотчетнику',
            'Оплата по кредитам и займам полученным',
            'Прочий расход ДС',
            'Перемещение ДС',
            'Внутренний займ',
            'Выдача займа контрагенту',
            'Возврат оплаты клиенту',
            'Выплата заработной платы',
            'Выплата заработной платы без ведомости',
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "Operation", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', order: 3, label: 'Организация', required: true, onChangeServer: true, style: { width: '250px' } }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "company", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', hiddenInList: true, label: 'Вид платежа', value: [
            'BODY',
            'PERCENT',
            'SHARE',
            'CUSTOM1'
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "PaymentKind", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', label: 'Вид дохода', value: [
            '(1) Заработная плата и иные доходы с ограничением взыскания',
            '(2) Доходы, на которые не может быть обращено взыскание (без оговорок)',
            '(3) Доходы, на которые не может быть обращено взыскание (с оговорками)',
            '( ) Доходы без ограничения взысканий'
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "EnforcementProceedings", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', style: { width: '140px' },
        label: 'Тип платежа',
        value: [
            'BANK',
            'CASH',
            'ANY',
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "CashKind", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'enum', required: false, hiddenInList: true, style: { width: '140px' },
        label: 'Способ выплаты',
        value: [
            'CASH',
            'SALARYPROJECT'
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "PayRollKind", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', label: 'Подразделение' }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Types.CashRecipient',
        onChangeServer: true,
        label: 'Получатель',
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "CashRecipient", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Contract',
        hiddenInList: true,
        required: false,
        onChangeServer: true,
        label: 'Договор',
        owner: [
            { dependsOn: 'CashRecipient', filterBy: 'owner' },
            { dependsOn: 'company', filterBy: 'company' },
            { dependsOn: 'currency', filterBy: 'currency' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "Contract", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Person.Contract',
        label: 'Договор',
        owner: [
            { dependsOn: 'CashRecipient', filterBy: 'owner' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "PersonContract", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Contract.Intercompany',
        hiddenInList: true,
        required: false,
        label: 'Договор',
        owner: [
            { dependsOn: 'CashRecipient', filterBy: 'KorrCompany' },
            { dependsOn: 'company', filterBy: 'company' },
            { dependsOn: 'currency', filterBy: 'currency' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "ContractIntercompany", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.CashFlow', label: 'Статья ДДС', required: true }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "CashFlow", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.SalaryProject', label: 'Зарплатный проект',
        owner: [
            { dependsOn: 'company', filterBy: 'company' },
            { dependsOn: 'currency', filterBy: 'currency' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "SalaryProject", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Loan',
        hiddenInList: true,
        label: 'Договор кредита/займа',
        owner: [
            { dependsOn: 'CashRecipient', filterBy: 'owner' },
            { dependsOn: 'company', filterBy: 'company' },
            { dependsOn: 'currency', filterBy: 'currency' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "Loan", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Types.CashOrBank',
        label: 'Источник',
        owner: [
            { dependsOn: 'company', filterBy: 'company' },
            { dependsOn: 'сurrency', filterBy: 'currency' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "CashOrBank", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Types.PersonOrCounterpartieBankAccount',
        label: 'Счет получателя',
        owner: [
            { dependsOn: 'CashRecipient', filterBy: 'owner' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "CashRecipientBankAccount", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Types.CashOrBank', hiddenInList: true,
        label: 'Касса/банк получателя',
        owner: [
            { dependsOn: 'CashRecipient', filterBy: 'company' },
            { dependsOn: 'сurrency', filterBy: 'currency' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "CashOrBankIn", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'date',
        hiddenInList: false,
        order: 9,
        label: 'Дата платежа',
        style: { width: '100px' }
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "PayDay", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Сумма', required: true, order: 4, style: { width: '100px', textAlign: 'right' } }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Сумма взысканий', style: { width: '100px', textAlign: 'right' } }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "AmountPenalty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', label: 'Валюта', required: true, order: 5, style: { width: '70px' } }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "\u0441urrency", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Types.ExpenseOrBalanceOrIncome', label: 'Аналитики расходов', hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "ExpenseOrBalance", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Expense.Analytics', label: 'Аналитики расходов', hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "ExpenseAnalytics", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Salary.Analytics', label: 'Выплачено', hiddenInList: true,
        owner: [
            { dependsOn: 'tempSalaryKind', filterBy: 'SalaryKind' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "SalaryAnalitics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', label: 'ЛОТ/Услуга' }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "SKU", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.TaxRate', label: 'Ставка НДС', hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "TaxRate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'КПП', hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "TaxKPP", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.TaxPaymentCode', label: 'КБК', hiddenInList: true,
        owner: [
            { dependsOn: 'tempCompanyParent', filterBy: 'company' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "TaxPaymentCode", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.TaxAssignmentCode', label: 'КНП', hiddenInList: true
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "TaxAssignmentCode", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.TaxPayerStatus', label: 'Статус плательщика', hiddenInList: true,
        owner: [
            { dependsOn: 'tempCompanyParent', filterBy: 'company' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "TaxPayerStatus", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.TaxBasisPayment', label: 'Основание', hiddenInList: true,
        owner: [
            { dependsOn: 'tempCompanyParent', filterBy: 'company' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "TaxBasisPayment", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.TaxPaymentPeriod', label: 'Период', hiddenInList: true,
        owner: [
            { dependsOn: 'tempCompanyParent', filterBy: 'company' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "TaxPaymentPeriod", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Номер документа' }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "TaxDocNumber", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', label: 'Дата документа' }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "TaxDocDate", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'ОКТМО', hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "TaxOfficeCode2", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Balance.Analytics', label: 'Аналитика баланса', hiddenInList: true,
        owner: [
            { dependsOn: 'ExpenseOrBalance', filterBy: 'parent' }
        ]
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "BalanceAnalytics", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', label: 'Бизнес-процесс №' }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "workflowID", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'Ручной ввод назначения платежа', hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "ManualInfo", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'boolean', label: 'Оплата в бюджет', hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "BudgetPayment", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'URL', hiddenInList: true, isAdditional: true }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "RelatedURL", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Company', hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "tempCompanyParent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', hiddenInList: true }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "tempSalaryKind", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.User', label: 'Ответственный'
    }),
    __metadata("design:type", Object)
], DocumentCashRequest.prototype, "Manager", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'table', required: false, order: 1,
        onChange: function (doc, value) {
            let Amount = 0;
            value.forEach(el => { Amount += el.Salary; });
            let AmountPenalty = 0;
            value.forEach(el => { AmountPenalty += el.SalaryPenalty; });
            return { Amount: Math.round(Amount * 100) / 100, AmountPenalty: Math.round(AmountPenalty * 100) / 100 };
        }
    }),
    __metadata("design:type", Array)
], DocumentCashRequest.prototype, "PayRolls", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'table', required: false, order: 1,
        onChange: function (doc, value) {
            let Amount = 0;
            value.forEach(el => { Amount += el.Amount; });
            return { Amount: Math.round(Amount * 100) / 100 };
        }
    }),
    __metadata("design:type", Array)
], DocumentCashRequest.prototype, "Items", void 0);
DocumentCashRequest = __decorate([
    jetti_middle_1.JDocument({
        type: 'Document.CashRequest',
        description: 'Заявка на расходование ДС',
        dimensions: [
            { company: 'Catalog.Company' },
            { Operation: 'enum' },
            { Status: 'enum' },
            { Amount: 'number' },
        ],
        icon: 'far fa-file-alt',
        menu: 'Заявки на ДС',
        prefix: 'CR-',
        copyTo: [
            { type: 'Document.Operation', icon: '', label: 'Платежный документ', order: 1 }
        ],
        relations: [
            { name: 'Операции', type: 'Document.Operation', field: 'parent' },
        ],
        commands: [
            { method: 'FillTaxInfo', icon: 'pi pi-plus', label: 'Сформировать назначение платежа', order: 1 },
            { method: 'returnToStatusPrepared', icon: 'pi pi-plus', label: 'Установить статус "PREPARED"', order: 2 },
            { method: 'CloseCashRequest', icon: 'pi pi-plus', label: 'Закрыть заявку на расход ДС', order: 3 },
            { method: 'FillSalaryBalanceByDepartment', icon: 'pi pi-plus', label: '[ЗП] Заполнить остатками по подразделению', order: 4 },
            { method: 'FillSalaryBalanceByPersons', icon: 'pi pi-plus', label: '[ЗП] Заполнить остатками по сотрудникам', order: 5 },
            {
                method: 'FillSalaryBalanceByDepartmentWithCurrentMonth',
                icon: 'pi pi-plus', label: '[ЗП] Заполнить остатками по подразделению (с текущим месяцем)', order: 4
            },
            {
                method: 'FillSalaryBalanceByPersonsWithCurrentMonth',
                icon: 'pi pi-plus', label: '[ЗП] Заполнить остатками по сотрудникам (с текущим месяцем)', order: 5
            },
            { method: 'onCommandcheckTaxCheck', icon: 'pi pi-plus', label: 'Проверить возможность согласования', order: 6 }
        ],
        module: `
      {
        const getFilter_CashRecipientBankAccount = () => {
            if (!this._value || !this._value.type) return Filter;
            Filter = [];
            Filter.push({ left: 'owner', center: '=', right: doc.CashRecipient.id });
            if (this._value.type === 'Catalog.Counterpartie.BankAccount')
                Filter.push({ left: 'currency', center: '=', right: doc.сurrency.id });
            return Filter;
        };
        return { getFilter_CashRecipientBankAccount };
    }`
    })
], DocumentCashRequest);
exports.DocumentCashRequest = DocumentCashRequest;
class PayRoll {
    constructor() {
        this.Employee = null;
        this.Salary = 0;
        this.SalaryPenalty = 0;
        this.Tax = 0;
        this.BankAccount = null;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Person', label: 'Сотрудник', style: { width: '350px' } }),
    __metadata("design:type", Object)
], PayRoll.prototype, "Employee", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'К выплате', totals: 1 }),
    __metadata("design:type", Object)
], PayRoll.prototype, "Salary", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Взыскано', style: { width: '100px', textAlign: 'right' }, totals: 1 }),
    __metadata("design:type", Object)
], PayRoll.prototype, "SalaryPenalty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Налог', totals: 1 }),
    __metadata("design:type", Object)
], PayRoll.prototype, "Tax", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Person.BankAccount', label: 'Счет', style: { width: '350px' },
        owner: [{ dependsOn: 'Employee', filterBy: 'owner' }]
    }),
    __metadata("design:type", Object)
], PayRoll.prototype, "BankAccount", void 0);
exports.PayRoll = PayRoll;
class Item {
    constructor() {
        this.Item = null;
        this.Storehouse = null;
        this.Department = null;
        this.Amount = 0;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', label: 'Товар/Услуга', style: { width: '350px' } }),
    __metadata("design:type", Object)
], Item.prototype, "Item", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Storehouse', label: 'Склад' }),
    __metadata("design:type", Object)
], Item.prototype, "Storehouse", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', label: 'Подразделение' }),
    __metadata("design:type", Object)
], Item.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', label: 'Сумма', totals: 1 }),
    __metadata("design:type", Object)
], Item.prototype, "Amount", void 0);
exports.Item = Item;
//# sourceMappingURL=Document.CashRequest.js.map