"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDB = exports.tasksDB = exports.jettiDB = void 0;
const mssql_1 = require("../../mssql");
const sql_pool_jetti_1 = require("../../sql.pool.jetti");
const sql_pool_tasks_1 = require("../../sql.pool.tasks");
function jettiDB(req, res, next) {
    const user = req.user;
    const sdb = new mssql_1.MSSQL(sql_pool_jetti_1.JETTI_POOL, user);
    req.sdb = sdb;
    next();
}
exports.jettiDB = jettiDB;
function tasksDB(req, res, next) {
    const user = req.user;
    const sdb = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, user);
    req.sdb = sdb;
    next();
}
exports.tasksDB = tasksDB;
function SDB(req) {
    return req.sdb;
}
exports.SDB = SDB;
//# sourceMappingURL=db-sessions.js.map