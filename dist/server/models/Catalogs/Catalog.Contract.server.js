"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogContractServer = void 0;
const Catalog_Contract_1 = require("./Catalog.Contract");
const std_lib_1 = require("../../std.lib");
class CatalogContractServer extends Catalog_Contract_1.CatalogContract {
    async onValueChanged(prop, value, tx) {
        switch (prop) {
            case 'company':
                if (value && value.id) {
                    const comp = await std_lib_1.lib.doc.byIdT(value.id, tx);
                    this.currency = comp.currency || this.currency;
                }
                break;
            default:
                break;
        }
        return this;
    }
}
exports.CatalogContractServer = CatalogContractServer;
//# sourceMappingURL=Catalog.Contract.server.js.map