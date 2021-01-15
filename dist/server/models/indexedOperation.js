"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndexedOperationById = exports.getIndexedOperationType = exports.getIndexedOperations = exports.getIndexedOperationsMap = void 0;
const mssql_1 = require("../mssql");
const sql_pool_jetti_1 = require("../sql.pool.jetti");
const global_1 = require("./global");
async function getIndexedOperationsMap() {
    const operations = await getIndexedOperations();
    return new Map(operations.map(e => [e.id, e.type]));
}
exports.getIndexedOperationsMap = getIndexedOperationsMap;
async function getIndexedOperations(tx, operationsId) {
    const sdbl = tx ? tx : new mssql_1.MSSQL(sql_pool_jetti_1.JETTI_POOL);
    let query = `
    SELECT id, CONCAT('Operation.', shortName) type, shortName
    FROM [dbo].[Catalog.Operation.v] WHERE posted = 1 and shortName <> ''
    ORDER BY shortName`;
    if (operationsId)
        query += `and id in (${operationsId.map(e => '\'' + e + '\'').join()})`;
    return await sdbl.manyOrNone(query);
}
exports.getIndexedOperations = getIndexedOperations;
function getIndexedOperationType(operationId) {
    return global_1.Global.indexedOperations().get(operationId) || undefined;
}
exports.getIndexedOperationType = getIndexedOperationType;
function getIndexedOperationById(operationId) {
    const operType = global_1.Global.indexedOperations().get(operationId);
    if (!operType)
        return undefined;
    return { id: operationId, type: operType, shortName: operType.replace('Operation.', '') };
}
exports.getIndexedOperationById = getIndexedOperationById;
//# sourceMappingURL=indexedOperation.js.map