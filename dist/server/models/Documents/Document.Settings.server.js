"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSettingsServer = void 0;
const Settings_1 = require("../Registers/Info/Settings");
const Document_Settings_1 = require("./Document.Settings");
class DocumentSettingsServer extends Document_Settings_1.DocumentSettings {
    async onValueChanged(prop, value, tx) {
        switch (prop) {
            case 'company':
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
    async onPost(tx) {
        const Registers = { Account: [], Accumulation: [], Info: [] };
        Registers.Info.push(new Settings_1.RegisterInfoSettings({
            accountingCurrency: this.accountingCurrency,
            balanceCurrency: this.balanceCurrency,
        }));
        return Registers;
    }
}
exports.DocumentSettingsServer = DocumentSettingsServer;
//# sourceMappingURL=Document.Settings.server.js.map