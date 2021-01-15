"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JETTI_POOL = void 0;
const environment_1 = require("./env/environment");
const mssql_1 = require("./mssql");
exports.JETTI_POOL = new mssql_1.SqlPool(environment_1.sqlConfig);
//# sourceMappingURL=sql.pool.jetti.js.map