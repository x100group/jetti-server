"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const std_lib_1 = require("./../std.lib");
const db_sessions_1 = require("./middleware/db-sessions");
exports.router = express.Router();
exports.router.post('/accum/balance', async (req, res, next) => {
    try {
        const { registerName, date, fields, groupBy, filter, topRows } = req.body;
        res.json(await std_lib_1.lib.accum.balance(registerName, date, fields, groupBy, filter, topRows));
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/accum/turnover', async (req, res, next) => {
    try {
        const { registerName, period, fields, groupBy, filter, topRows } = req.body;
        res.json(await std_lib_1.lib.accum.turnover(registerName, period, fields, groupBy, filter, topRows));
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/info/sliceLast', async (req, res, next) => {
    try {
        const { type, date, company, analytics } = req.body;
        res.json(await std_lib_1.lib.info.sliceLast(type, date, company, analytics, db_sessions_1.SDB(req)));
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=utils.js.map