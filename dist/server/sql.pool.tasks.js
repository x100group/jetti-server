"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASKS_POOL = void 0;
const environment_1 = require("./env/environment");
const mssql_1 = require("./mssql");
exports.TASKS_POOL = new mssql_1.SqlPool(environment_1.sqlConfigTask);
//# sourceMappingURL=sql.pool.tasks.js.map