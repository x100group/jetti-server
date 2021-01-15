"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentInvoiceServer = void 0;
const std_lib_1 = require("../../std.lib");
const documents_factory_server_1 = require("../documents.factory.server");
const AR_1 = require("../Registers/Accumulation/AR");
const Balance_1 = require("../Registers/Accumulation/Balance");
const Inventory_1 = require("../Registers/Accumulation/Inventory");
const PL_1 = require("../Registers/Accumulation/PL");
const Sales_1 = require("../Registers/Accumulation/Sales");
const Document_Invoice_1 = require("./Document.Invoice");
class DocumentInvoiceServer extends Document_Invoice_1.DocumentInvoice {
    async GetPrice(args, tx) {
        this.Amount = 0;
        for (const row of this.Items) {
            row.Price = 100;
            row.Amount = row.Qty * row.Price;
            this.Amount += row.Amount;
        }
        return { doc: this, result: {} };
    }
    async onCommand(command, args, tx) {
        switch (command) {
            case 'company':
                return args;
            default:
                return {};
        }
    }
    async baseOn(source, tx) {
        const ISource = await std_lib_1.lib.doc.byId(source, tx);
        if (!ISource)
            return this;
        switch (ISource.type) {
            case 'Catalog.Counterpartie':
                const catalogCounterpartie = await documents_factory_server_1.createDocumentServer(ISource.type, ISource, tx);
                this.Customer = catalogCounterpartie.id;
                return this;
            default:
                return this;
        }
    }
    async onPost(tx) {
        const Registers = { Account: [], Accumulation: [], Info: [] };
        const acc90 = await std_lib_1.lib.account.byCode('90.01', tx);
        const acc41 = await std_lib_1.lib.account.byCode('41.01', tx);
        const acc62 = await std_lib_1.lib.account.byCode('62.01', tx);
        const ExpenseCOST = await std_lib_1.lib.doc.byCode('Catalog.Expense', 'OUT.COST', tx);
        const IncomeSALES = await std_lib_1.lib.doc.byCode('Catalog.Income', 'SALES', tx);
        const PL = await std_lib_1.lib.doc.byCode('Catalog.Balance', 'PL', tx);
        const AR = await std_lib_1.lib.doc.byCode('Catalog.Balance', 'AR', tx);
        const INVENTORY = await std_lib_1.lib.doc.byCode('Catalog.Balance', 'INVENTORY', tx);
        const exchangeRate = await std_lib_1.lib.info.exchangeRate(this.date, this.company, this.currency, tx) || 1;
        // AR
        Registers.Accumulation.push(new AR_1.RegisterAccumulationAR({
            kind: true,
            AO: this.id,
            Department: this.Department,
            Customer: this.Customer,
            AR: this.Amount,
            AmountInBalance: this.Amount / exchangeRate,
            AmountInAccounting: this.Amount,
            PayDay: this.PayDay,
            currency: this.currency
        }));
        Registers.Account.push({
            debit: { account: acc62, subcounts: [this.Customer] },
            kredit: { account: acc90, subcounts: [] },
            sum: this.Amount,
        });
        const totalCost = 0;
        for (const row of this.Items) {
            Registers.Accumulation.push(new Inventory_1.RegisterAccumulationInventory({
                kind: false,
                Expense: ExpenseCOST,
                Storehouse: this.Storehouse,
                batch: null,
                SKU: row.SKU,
                Cost: 0,
                Qty: row.Qty
            }));
            // Account
            Registers.Account.push({
                debit: { account: acc90, subcounts: [] },
                kredit: { account: acc41, subcounts: [this.Storehouse, row.SKU], qty: row.Qty },
                sum: 0,
            });
            Registers.Accumulation.push(new Sales_1.RegisterAccumulationSales({
                kind: true,
                AO: this.id,
                Department: this.Department,
                Customer: this.Customer,
                Product: row.SKU,
                Manager: this.Manager,
                Storehouse: this.Storehouse,
                Qty: row.Qty,
                Amount: row.Amount / exchangeRate,
                AmountInAR: row.Amount,
                AmountInDoc: row.Amount,
                Cost: 0,
                Discount: 0,
                Tax: row.Tax / exchangeRate,
                currency: this.currency
            }));
            Registers.Accumulation.push(new PL_1.RegisterAccumulationPL({
                kind: true,
                Department: this.Department,
                PL: IncomeSALES,
                Analytics: row.SKU,
                Amount: row.Amount / exchangeRate,
            }));
            Registers.Accumulation.push(new PL_1.RegisterAccumulationPL({
                kind: false,
                Department: this.Department,
                PL: ExpenseCOST,
                Analytics: row.SKU,
                Amount: 0,
            }));
        }
        Registers.Accumulation.push(new Balance_1.RegisterAccumulationBalance({
            kind: true,
            Department: this.Department,
            Balance: AR,
            Analytics: this.Customer,
            Amount: this.Amount / exchangeRate
        }));
        Registers.Accumulation.push(new Balance_1.RegisterAccumulationBalance({
            kind: false,
            Department: this.Department,
            Balance: INVENTORY,
            Analytics: this.Storehouse,
            Amount: totalCost
        }));
        Registers.Accumulation.push(new Balance_1.RegisterAccumulationBalance({
            kind: true,
            Department: this.Department,
            Balance: PL,
            Analytics: ExpenseCOST,
            Amount: totalCost
        }));
        Registers.Accumulation.push(new Balance_1.RegisterAccumulationBalance({
            kind: false,
            Department: this.Department,
            Balance: PL,
            Analytics: IncomeSALES,
            Amount: this.Amount / exchangeRate,
        }));
        return Registers;
    }
}
exports.DocumentInvoiceServer = DocumentInvoiceServer;
//# sourceMappingURL=Document.Invoce.server.js.map