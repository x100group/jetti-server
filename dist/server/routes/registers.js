"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const factory_1 = require("../models/Registers/Accumulation/factory");
const factory_2 = require("../models/Registers/Info/factory");
const x100_lib_1 = require("../x100.lib");
const db_sessions_1 = require("./middleware/db-sessions");
exports.router = express.Router();
exports.router.get('/register/movements/list/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const query = `SELECT *
    FROM (
        SELECT COUNT(id) records, r.type N'type', 'Accumulation' kind
            FROM [dbo].[Accumulation] r
            WHERE r.document = @p1
            group by r.type
        UNION
            SELECT COUNT(id) records, r.type N'type', 'Info'
            FROM [dbo].[Register.Info] r
            WHERE r.document = @p1
            group by r.type
        UNION
            SELECT COUNT(date) records, N'Register.Account' N'type', 'Account'
            FROM [dbo].[Register.Account] r
            WHERE r.document = @p1) as res
    where res.[records] > 0
    order by res.[type]`;
        const getRegisterFromQueryResult = (queryResult, kind, creationFunc) => {
            return queryResult.filter(el => el.kind === kind).map(r => {
                const Register = creationFunc({ type: r.type });
                const description = (Register.Prop()).description;
                return ({ type: r.type, description: `${description} [${r.records}]`, kind: r.kind });
            });
        };
        // tslint:disable-next-line: max-line-length
        const result = await sdb.manyOrNone(query, [req.params.id]);
        const listAccumulation = getRegisterFromQueryResult(result, 'Accumulation', factory_1.createRegisterAccumulation);
        const listInfo = getRegisterFromQueryResult(result, 'Info', factory_2.createRegisterInfo);
        const listAccount = getRegisterFromQueryResult(result, 'Account', _ => ({ description: 'Хозрасчетный' }));
        const reslist = listAccumulation.concat(listInfo, listAccount);
        res.json(reslist);
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/register/account/movements/view/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const id = req.params.id;
        const query = `SELECT * FROM "Register.Account.View" where "document.id" = '${id}'`;
        await sdb.tx(async (tx) => {
            const data = await tx.manyOrNone(query);
            res.json(data);
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/register/accumulation/list/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const id = req.params.id;
        const query = `SELECT DISTINCT r.type "type" FROM "Accumulation" r WHERE r.document = '${id}'`;
        await sdb.tx(async (tx) => {
            const result = await tx.manyOrNone(query);
            const list = result.map(r => {
                const regiter = factory_1.createRegisterAccumulation({ type: r.type });
                const description = regiter.Prop().description;
                return ({ type: r.type, description });
            });
            res.json(list);
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/register/info/list/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const id = req.params.id;
        const query = `SELECT DISTINCT r.type "type" FROM "Register.Info" r WHERE r.document = '${id}'`;
        await sdb.tx(async (tx) => {
            const result = await tx.manyOrNone(query);
            const list = result.map(r => {
                const description = factory_2.createRegisterInfo({ type: r.type }).Prop().description;
                return ({ type: r.type, description });
            });
            res.json(list);
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/register/accumulation/:type/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const id = req.params.id;
        const type = req.params.type;
        const query = factory_1.createRegisterAccumulation({ type }).QueryList();
        await sdb.tx(async (tx) => {
            const result = await tx.manyOrNone(`${query} AND r.document = '${id}'`);
            res.json(result);
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/register/info/:type/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const id = req.params.id;
        const type = req.params.type;
        const query = factory_2.createRegisterInfo({ type }).QueryList();
        await sdb.tx(async (tx) => {
            const result = await tx.manyOrNone(`${query} AND r.document = '${id}'`);
            res.json(result);
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/register/info/byFilter/:type', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const type = req.params.type;
        let query = factory_2.createRegisterInfo({ type }).QueryList();
        const filter = req.body;
        let filterText = '';
        query = query.replace('SELECT', 'SELECT r.document docId, ');
        filter.forEach(element => filterText += ` AND ${element.key} = '${element.value}'`);
        await sdb.tx(async (tx) => {
            const result = await tx.manyOrNone(query + filterText);
            res.json(result);
        });
    }
    catch (err) {
        next(err);
    }
});
// x100 only
exports.router.get('/register/movements/transformed/:id', async (req, res, next) => {
    try {
        res.json(await x100_lib_1.x100.register.getTransformedRegisterMovementsByDocId(req.params.id));
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=registers.js.map