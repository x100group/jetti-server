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
exports.DocumentInvoiceComment = exports.DocumentInvoiceItem = exports.DocumentInvoice = void 0;
const jetti_middle_1 = require("jetti-middle");
let DocumentInvoice = class DocumentInvoice extends jetti_middle_1.DocumentBase {
    constructor() {
        super(...arguments);
        this.parent = null;
        this.Department = null;
        this.Storehouse = null;
        this.Customer = null;
        this.Manager = null;
        this.Status = 'PREPARED';
        this.PayDay = new Date();
        this.Amount = 0;
        this.Tax = 0;
        this.currency = null;
        this.Items = [new DocumentInvoiceItem()];
        this.Comments = [new DocumentInvoiceComment()];
    }
};
__decorate([
    jetti_middle_1.Props({ type: 'Types.Document', hiddenInList: true, order: -1 }),
    __metadata("design:type", Object)
], DocumentInvoice.prototype, "parent", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Department', required: true, hiddenInList: true, order: 10 }),
    __metadata("design:type", Object)
], DocumentInvoice.prototype, "Department", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Storehouse', hiddenInList: true, required: true, order: 11 }),
    __metadata("design:type", Object)
], DocumentInvoice.prototype, "Storehouse", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Counterpartie', required: true, order: 12,
        style: { width: '250px', 'min-width': '250px', 'max-width': '250px', }
    }),
    __metadata("design:type", Object)
], DocumentInvoice.prototype, "Customer", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'Catalog.Manager', order: 13,
        style: { width: '250px', 'min-width': '250px', 'max-width': '250px' }
    }),
    __metadata("design:type", Object)
], DocumentInvoice.prototype, "Manager", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string', required: true, order: 14, style: { width: '80px', 'min-width': '80px', 'max-width': '80px' } }),
    __metadata("design:type", Object)
], DocumentInvoice.prototype, "Status", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'date', hiddenInList: true, order: 15 }),
    __metadata("design:type", Object)
], DocumentInvoice.prototype, "PayDay", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', readOnly: true, order: 16 }),
    __metadata("design:type", Object)
], DocumentInvoice.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', readOnly: true, order: 17 }),
    __metadata("design:type", Object)
], DocumentInvoice.prototype, "Tax", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Currency', required: true, order: 18, style: { width: '100px', 'min-width': '100px', 'max-width': '100px' } }),
    __metadata("design:type", Object)
], DocumentInvoice.prototype, "currency", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'table', required: true, order: 1,
        onChange: function (doc, value) {
            let Amount = 0, Tax = 0;
            value.forEach(el => { Amount += el.Amount; Tax += el.Tax; });
            return { Amount: Math.round(Amount * 100) / 100, Tax: Math.round(Tax * 100) / 100 };
        }
    }),
    __metadata("design:type", Array)
], DocumentInvoice.prototype, "Items", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'table', order: 2 }),
    __metadata("design:type", Array)
], DocumentInvoice.prototype, "Comments", void 0);
DocumentInvoice = __decorate([
    jetti_middle_1.JDocument({
        type: 'Document.Invoice',
        description: 'Invoice',
        dimensions: [
            { Customer: 'Catalog.Counterpartie' },
            { Manager: 'Catalog.Manager' },
            { Amount: 'number' },
        ],
        icon: 'far fa-file-alt',
        menu: 'Invoices',
        prefix: 'INV-',
        commands: [
            { method: 'test', icon: 'fa fa-plus', label: 'test', order: 1 }
        ],
        copyTo: [
            { type: 'Document.PriceList', icon: '', label: 'PriceList', order: 1 }
        ],
        relations: [
            { name: 'Operations', type: 'Document.Operation', field: 'parent' }
        ]
    })
], DocumentInvoice);
exports.DocumentInvoice = DocumentInvoice;
class DocumentInvoiceItem {
    constructor() {
        this.SKU = null;
        this.Qty = 0;
        this.PriceType = null;
        this.Price = 0;
        this.Amount = 0;
        this.Tax = 0;
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.Product', required: true, order: 1, style: { width: '400px' } }),
    __metadata("design:type", Object)
], DocumentInvoiceItem.prototype, "SKU", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'number', totals: 3, required: true, order: 3,
        onChange: function (doc, value) {
            return { Amount: Math.round(doc.Price * (value || 0) * 10000) / 10000, Tax: doc.Price * (value || 0) * 0.18 };
        }
    }),
    __metadata("design:type", Object)
], DocumentInvoiceItem.prototype, "Qty", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.PriceType', required: true, order: 5, style: { width: '120px', 'min-width': '120px', 'max-width': '120px' } }),
    __metadata("design:type", Object)
], DocumentInvoiceItem.prototype, "PriceType", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'number', required: true, order: 4,
        onChange: function (doc, value) {
            return { Amount: Math.round(doc.Qty * (value || 0) * 100) / 100, Tax: doc.Qty * (value || 0) * 0.18 };
        }
    }),
    __metadata("design:type", Object)
], DocumentInvoiceItem.prototype, "Price", void 0);
__decorate([
    jetti_middle_1.Props({
        type: 'number', required: true, order: 10, totals: 3,
        onChange: function (doc, value) {
            return { Price: Math.round(value / doc.Qty * 10000) / 10000, Tax: value * 0.18 };
        }
    }),
    __metadata("design:type", Object)
], DocumentInvoiceItem.prototype, "Amount", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'number', readOnly: true, totals: 9 }),
    __metadata("design:type", Object)
], DocumentInvoiceItem.prototype, "Tax", void 0);
exports.DocumentInvoiceItem = DocumentInvoiceItem;
class DocumentInvoiceComment {
    constructor() {
        this.Date = new Date();
        this.User = null;
        this.Comment = '';
    }
}
__decorate([
    jetti_middle_1.Props({ type: 'date', style: { width: '195px' } }),
    __metadata("design:type", Object)
], DocumentInvoiceComment.prototype, "Date", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'Catalog.User' }),
    __metadata("design:type", Object)
], DocumentInvoiceComment.prototype, "User", void 0);
__decorate([
    jetti_middle_1.Props({ type: 'string' }),
    __metadata("design:type", Object)
], DocumentInvoiceComment.prototype, "Comment", void 0);
exports.DocumentInvoiceComment = DocumentInvoiceComment;
//# sourceMappingURL=Document.Invoice.js.map