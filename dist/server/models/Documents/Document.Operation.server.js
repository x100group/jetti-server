"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentOperationServer = void 0;
const std_lib_1 = require("../../std.lib");
const documents_factory_server_1 = require("../documents.factory.server");
const Document_Operation_1 = require("./Document.Operation");
class DocumentOperationServer extends Document_Operation_1.DocumentOperation {
    async onValueChanged(prop, value, tx) {
        switch (prop) {
            case 'company':
                const company = await std_lib_1.lib.doc.byIdT(value.id, tx);
                if (company)
                    this.currency = company.currency;
                return this;
            case 'Operation':
                const Operation = await std_lib_1.lib.doc.byIdT(value.id, tx);
                if (Operation)
                    this.Group = Operation.Group;
                return this;
            default:
                return this;
        }
    }
    async onCopy(tx) {
        this.parent = null;
        return this;
    }
    async beforePost(tx) {
        // запрет проведения с 0 суммой для группы 1.0 - Приобретение товаров и услуг
        if ((!this.Amount || this.Amount < 0.01) && this.Group === 'E74FF926-C149-11E7-BD8F-43B2F3011722')
            throw new Error(`${this.description} не может быть проведен: не заполнена сумма документа`);
        if (!this.parent)
            return this;
        const parentDoc = (await std_lib_1.lib.doc.byId(this.parent, tx));
        if (!parentDoc)
            return this;
        switch (parentDoc.type) {
            case 'Document.CashRequest':
                const CashRequestServer = await documents_factory_server_1.createDocumentServer('Document.CashRequest', parentDoc, tx);
                await CashRequestServer.beforePostDocumentOperation(this, tx);
                break;
            default:
                break;
        }
        return this;
    }
    async onPost(tx) {
        const Registers = { Account: [], Accumulation: [], Info: [] };
        if (this.posted && !this.deleted) {
            const query = `
        SELECT (SELECT "script" FROM OPENJSON(doc) WITH ("script" NVARCHAR(MAX) '$."script"')) "script"
        FROM "Documents" WHERE id = @p1`;
            const Operation = await tx.oneOrNone(query, [this.Operation]);
            const exchangeRate = await std_lib_1.lib.info.exchangeRate(this.date, this.company, this.currency, tx);
            const settings = await std_lib_1.lib.info.sliceLast('Settings', this.date, this.company, {}, tx);
            const accountingCurrency = settings && settings.accountingCurrency || this.currency;
            const exchangeRateAccounting = await std_lib_1.lib.info.exchangeRate(this.date, this.company, accountingCurrency, tx);
            const script = `
      let exchangeRateBalance = exchangeRate;
      let AmountInBalance = doc.Amount / exchangeRate;
      let AmountInAccounting = doc.Amount / exchangeRateAccounting;
      ${Operation.script
                .replace(/\$\./g, 'doc.')
                .replace(/tx\./g, 'await tx.')
                .replace(/lib\./g, 'await lib.')
                .replace(/\'doc\./g, '\'$.')}
      `;
            const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
            const func = new AsyncFunction('doc, Registers, tx, lib, settings, exchangeRate, exchangeRateAccounting', script);
            await func(this, Registers, tx, std_lib_1.lib, settings, exchangeRate, exchangeRateAccounting);
        }
        return Registers;
    }
    async baseOn(source, tx, params) {
        const rawDoc = await std_lib_1.lib.doc.byId(source, tx);
        if (!rawDoc)
            return this;
        const sourceDoc = await documents_factory_server_1.createDocumentServer(rawDoc.type, rawDoc, tx);
        if (sourceDoc instanceof DocumentOperationServer) {
            const Operation = await std_lib_1.lib.doc.byIdT(sourceDoc.Operation, tx);
            const Rule = Operation.CopyTo.find(c => c.Operation === this.Operation);
            if (Rule) {
                const script = `
        this.company = doc.company;
        this.currency = doc.currency;
        this.parent = doc.id;
        ${Rule.script
                    .replace(/\$\./g, 'doc.')
                    .replace(/tx\./g, 'await tx.')
                    .replace(/lib\./g, 'await lib.')
                    .replace(/\'doc\./g, '\'$.')}
          `;
                const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
                const func = new AsyncFunction('doc, tx, lib', script);
                await func.bind(this, sourceDoc, tx, std_lib_1.lib)();
            }
        }
        else {
            switch (sourceDoc.type) {
                case 'Catalog.Counterpartie':
                    break;
                case 'Document.CashRequest':
                    await sourceDoc.FillDocumentOperation(this, tx, params);
                    break;
                case 'Catalog.Operation':
                    this.Operation = sourceDoc.id;
                    this.Group = sourceDoc.Group;
                    break;
                default:
                    break;
            }
        }
        const doc = await (documents_factory_server_1.createDocumentServer(this.type, this, tx));
        const Props = doc.Props();
        const Prop = doc.Prop();
        this.description = doc.description;
        this.Props = () => Props;
        this.Prop = () => Prop;
        return this;
    }
}
exports.DocumentOperationServer = DocumentOperationServer;
//# sourceMappingURL=Document.Operation.server.js.map