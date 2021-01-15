"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogProductKindServer = void 0;
const std_lib_1 = require("../../std.lib");
const Catalog_ProductKind_1 = require("./Catalog.ProductKind");
class CatalogProductKindServer extends Catalog_ProductKind_1.CatalogProductKind {
    async onCreate(tx) {
        if (!this.Parameters.length)
            await this.ParametersFill(tx);
        return this;
    }
    async onCommand(command, tx) {
        if (this[command])
            await this[command](tx);
        return this;
    }
    async ParametersFill(tx) {
        const product = await std_lib_1.lib.doc.createDocServer('Catalog.Product', undefined, tx);
        const props = product.Props();
        this.Parameters = Object.keys(props)
            .filter(e => props[e].order === 666)
            .map(key => ({ PropName: key }));
    }
}
exports.CatalogProductKindServer = CatalogProductKindServer;
//# sourceMappingURL=Catalog.ProductKind.server.js.map