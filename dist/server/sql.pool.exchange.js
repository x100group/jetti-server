"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXCHANGE_POOL = void 0;
const environment_1 = require("./env/environment");
const mssql_1 = require("./mssql");
exports.EXCHANGE_POOL = new mssql_1.SqlPool(environment_1.sqlConfigExchange);
//# sourceMappingURL=sql.pool.exchange.js.map