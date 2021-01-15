"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.router = void 0;
const express = require("express");
const db_sessions_1 = require("./middleware/db-sessions");
const jetti_middle_1 = require("jetti-middle");
exports.router = express.Router();
function User(req) {
    return req.user;
}
exports.User = User;
exports.router.get('/user/settings/:type', async (req, res, next) => {
    try {
        const user = User(req);
        const sdb = db_sessions_1.SDB(req);
        // const query = `select JSON_QUERY(settings, '$."${req.params.type}"') data from users where email = @p1`;
        // const result = await sdb.oneOrNone<{ data: FormListSettings }>(query, [user.email]);
        res.json(new jetti_middle_1.FormListSettings());
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/user/settings/:type', async (req, res, next) => {
    try {
        const user = User(req);
        const sdb = db_sessions_1.SDB(req);
        const data = req.body || {};
        // const query = `update users set settings = JSON_MODIFY(settings, '$."${req.params.type}"', JSON_QUERY(@p1)) where email = @p2`;
        // await sdb.none(query, [JSON.stringify(data), user.email]);
        res.json(true);
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/user/settings/defaults', async (req, res, next) => {
    try {
        const user = User(req);
        const sdb = db_sessions_1.SDB(req);
        // const query = `select JSON_QUERY(settings, '$."defaults"') data from users where email = @p1`;
        // const result = await sdb.oneOrNone<{ data: UserDefaultsSettings }>(query, [user.email]);
        res.json(new jetti_middle_1.UserDefaultsSettings());
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/user/settings/defaults', async (req, res, next) => {
    try {
        const user = User(req);
        const sdb = db_sessions_1.SDB(req);
        const data = req.body || new jetti_middle_1.UserDefaultsSettings();
        // const query = `update users set settings = JSON_MODIFY(settings, '$."defaults"', JSON_QUERY(@p1)) where email = @p2`;
        // await sdb.none(query, [JSON.stringify(data), user.email]);
        res.json(true);
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/user/roles', async (req, res, next) => {
    try {
        const user = User(req);
        const sdb = db_sessions_1.SDB(req);
        const result = ['Admin'];
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=user.settings.js.map