"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentExchangeRatesServer = void 0;
const ExchangeRates_1 = require("../Registers/Info/ExchangeRates");
const Document_ExchangeRates_1 = require("./Document.ExchangeRates");
class DocumentExchangeRatesServer extends Document_ExchangeRates_1.DocumentExchangeRates {
    async onCommand(command, args, tx) {
        switch (command) {
            case 'company':
                return {};
            default:
                return {};
        }
    }
    async onPost(tx) {
        const Registers = { Account: [], Accumulation: [], Info: [] };
        for (const row of this.Rates) {
            Registers.Info.push(new ExchangeRates_1.RegisterInfoExchangeRates({
                currency: row.Currency,
                Rate: row.Rate,
                Mutiplicity: row.Mutiplicity
            }));
        }
        return Registers;
    }
}
exports.DocumentExchangeRatesServer = DocumentExchangeRatesServer;
//# sourceMappingURL=Document.ExchangeRates.server.js.map