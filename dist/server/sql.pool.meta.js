"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JETTI_POOL_META = void 0;
const environment_1 = require("./env/environment");
const mssql_1 = require("./mssql");
exports.JETTI_POOL_META = new mssql_1.SqlPool(environment_1.sqlConfigMeta);
//# sourceMappingURL=sql.pool.meta.js.map