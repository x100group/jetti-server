"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x100DATA_POOL = void 0;
const environment_1 = require("./env/environment");
const mssql_1 = require("./mssql");
exports.x100DATA_POOL = new mssql_1.SqlPool(environment_1.sqlConfigX100DATA);
//# sourceMappingURL=sql.pool.x100-DATA.js.map