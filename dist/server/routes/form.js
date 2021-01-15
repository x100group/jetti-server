"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildViewModel = exports.router = void 0;
const express = require("express");
const db_sessions_1 = require("./middleware/db-sessions");
const form_factory_server_1 = require("../models/Forms/form.factory.server");
const user_settings_1 = require("./user.settings");
const jetti_middle_1 = require("jetti-middle");
exports.router = express.Router();
function noSqlDocument(flatDoc) {
    if (!flatDoc)
        throw new Error(`noSqlDocument: source is null!`);
    const { id, date, type, code, description, company, user, posted, deleted, isfolder, parent, info, timestamp } = flatDoc, doc = __rest(flatDoc, ["id", "date", "type", "code", "description", "company", "user", "posted", "deleted", "isfolder", "parent", "info", "timestamp"]);
    return { id, date, type, code, description, company, user, posted, deleted, isfolder, parent, info, timestamp, doc };
}
async function buildViewModel(ServerDoc, tx) {
    const viewModelQuery = jetti_middle_1.SQLGenegator.QueryObjectFromJSON(ServerDoc.Props());
    const NoSqlDocument = JSON.stringify(noSqlDocument(ServerDoc));
    return await tx.oneOrNone(viewModelQuery, [NoSqlDocument]);
}
exports.buildViewModel = buildViewModel;
exports.router.post('/form/:type/execute', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const user = user_settings_1.User(req);
        const doc = JSON.parse(JSON.stringify(req.body), jetti_middle_1.dateReviverUTC);
        doc.type = req.params.type;
        doc.user = user;
        const serverDoc = form_factory_server_1.createFormServer(doc);
        await serverDoc.Execute();
        const view = await buildViewModel(serverDoc, sdb);
        res.json(view);
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/form/view/:type', async (req, res, next) => {
    try {
        const doc = { type: req.params.type, user: user_settings_1.User(req) };
        const serverDoc = form_factory_server_1.createFormServer(doc);
        res.json({
            metadata: serverDoc.Prop(),
            schema: serverDoc.Props()
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/form/:type/:method', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const user = user_settings_1.User(req);
        const doc = JSON.parse(JSON.stringify(req.body), jetti_middle_1.dateReviverUTC);
        doc.type = req.params.type;
        doc.user = user;
        const serverDoc = form_factory_server_1.createFormServer(doc);
        await serverDoc[req.params.method]();
        serverDoc.user = null;
        const result = {
            metadata: serverDoc.Prop(),
            schema: serverDoc.Props(),
            model: (await buildViewModel(serverDoc, sdb)),
            columnsDef: [],
            settings: new jetti_middle_1.FormListSettings(),
        };
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/form/:type/nonmodel/:method', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const user = user_settings_1.User(req);
        const doc = JSON.parse(JSON.stringify(req.body), jetti_middle_1.dateReviverUTC);
        doc.type = req.params.type;
        doc.user = user;
        const serverDoc = form_factory_server_1.createFormServer(doc);
        res.json(await serverDoc[req.params.method]());
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=form.js.map