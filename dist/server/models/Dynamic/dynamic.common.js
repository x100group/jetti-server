"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamicMetaOperation = exports.getDynamicMetaCatalog = exports.getDynamicMeta = exports.updateDynamicMeta = exports.riseUpdateMetadataEvent = void 0;
const sql_pool_jetti_1 = require("../../sql.pool.jetti");
const mssql_1 = require("../../mssql");
const dynamic_prototype_1 = require("./dynamic.prototype");
const std_lib_1 = require("../../std.lib");
const __1 = require("../..");
const global_1 = require("../global");
const indexedOperation_1 = require("../indexedOperation");
const Document_Operation_1 = require("../Documents/Document.Operation");
function riseUpdateMetadataEvent() {
    __1.publisher.publish('updateDynamicMeta', 'button clck');
}
exports.riseUpdateMetadataEvent = riseUpdateMetadataEvent;
async function updateDynamicMeta() {
    global_1.Global.updateDynamicMeta();
    console.log(`Dynamic metadata updated`);
}
exports.updateDynamicMeta = updateDynamicMeta;
exports.getDynamicMeta = async () => {
    const tx = new mssql_1.MSSQL(sql_pool_jetti_1.JETTI_POOL);
    const catalogsMeta = await exports.getDynamicMetaCatalog(tx);
    const operationsMeta = await exports.getDynamicMetaOperation(tx);
    return {
        Metadata: [...catalogsMeta.Metadata, ...operationsMeta.Metadata],
        RegisteredDocument: [...catalogsMeta.RegisteredDocument, ...operationsMeta.RegisteredDocument]
    };
};
exports.getDynamicMetaCatalog = async (tx) => {
    const query = `SELECT id, typeString type FROM [dbo].[Catalog.Catalog.v] where posted = 1`;
    const cats = await tx.manyOrNone(query);
    const res = { RegisteredDocument: [], Metadata: [] };
    for (const cat of cats) {
        const ob = await std_lib_1.lib.doc.createDocServerById(cat.id, tx);
        const meta = await ob.getDynamicMetadata();
        res.RegisteredDocument.push({ type: meta.type, Class: dynamic_prototype_1.CatalogDynamic, dynamic: true });
        res.Metadata.push(meta);
    }
    return res;
};
exports.getDynamicMetaOperation = async (tx) => {
    const operations = await indexedOperation_1.getIndexedOperations(tx);
    const res = { RegisteredDocument: [], Metadata: [] };
    for (const operation of operations) {
        const ob = await std_lib_1.lib.doc.createDocServerById(operation.id, tx);
        const meta = await ob.getDynamicMetadata(tx);
        res.RegisteredDocument.push({ type: meta.type, Class: Document_Operation_1.DocumentOperation, dynamic: true });
        res.Metadata.push(meta);
    }
    return res;
};
//# sourceMappingURL=dynamic.common.js.map