"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentPriceListServer = void 0;
const std_lib_1 = require("../../std.lib");
const documents_factory_server_1 = require("../documents.factory.server");
const PriceList_1 = require("../Registers/Info/PriceList");
const Document_PriceList_1 = require("./Document.PriceList");
class DocumentPriceListServer extends Document_PriceList_1.DocumentPriceList {
    async onValueChanged(prop, value, tx) {
        switch (prop) {
            case 'company':
                return this;
            case 'PriceType':
                const priceType = await std_lib_1.lib.doc.byIdT(value.id, tx);
                if (priceType)
                    this.TaxInclude = priceType.TaxInclude;
                return this;
            default:
                return this;
        }
    }
    async onCommand(command, args, tx) {
        switch (command) {
            case 'company':
                return {};
            default:
                return {};
        }
    }
    async baseOn(source, tx) {
        const ISource = await std_lib_1.lib.doc.byId(source, tx);
        if (!ISource)
            return this;
        switch (ISource.type) {
            case 'Document.Invoice':
                const documentInvoice = await documents_factory_server_1.createDocumentServer(ISource.type, ISource, tx);
                const unitID = await std_lib_1.lib.doc.byCode('Catalog.Unit', 'bottle', tx);
                this.parent = ISource.id;
                this.Items = documentInvoice.Items.map(r => ({ SKU: r.SKU, Price: r.Price, Unit: unitID }));
                this.TaxInclude = true;
                this.company = documentInvoice.company;
                this.PriceType = documentInvoice.Items[0].PriceType;
                this.posted = false;
                return this;
            default:
                return this;
        }
    }
    async onPost(tx) {
        const Registers = { Account: [], Accumulation: [], Info: [] };
        const priceType = await std_lib_1.lib.doc.byIdT(this.PriceType, tx);
        for (const row of this.Items) {
            Registers.Info.push(new PriceList_1.RegisterInfoPriceList({
                currency: priceType.currency,
                PriceType: this.PriceType,
                Product: row.SKU,
                Price: row.Price,
                Unit: row.Unit
            }));
        }
        return Registers;
    }
}
exports.DocumentPriceListServer = DocumentPriceListServer;
//# sourceMappingURL=Document.PriceList.server.js.map