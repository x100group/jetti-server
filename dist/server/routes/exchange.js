"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const jwt = require("jsonwebtoken");
const environment_1 = require("../env/environment");
const check_auth_1 = require("./middleware/check-auth");
const mssql_1 = require("../mssql");
const sql_pool_tasks_1 = require("../sql.pool.tasks");
exports.router = express_1.Router();
exports.router.post('/login', async (req, res, next) => {
    // setka.service.account@sushi-master.net
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(401).json({ message: 'Auth failed: user name required' });
        }
        if (!password) {
            return res.status(401).json({ message: 'Auth failed: password required' });
        }
        if (!(email === 'exchange@sushi-master.net' ||
            email === 'setka.service.account@sushi-master.net')) {
            return res.status(401).json({ message: 'Auth failed: wrong user name' });
        }
        if (password !== process.env.EXCHANGE_ACCESS_KEY) {
            return res.status(401).json({ message: 'Auth failed: wrong password' });
        }
        const payload = {
            email,
            description: 'setka service account',
            isAdmin: true,
            roles: [],
            env: {},
        };
        const token = jwt.sign(payload, environment_1.JTW_KEY, { expiresIn: '24h' });
        return res.json({ account: payload, token });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/v1.0/hello', check_auth_1.authHTTP, async (req, res, next) => {
    try {
        // const user = User(req);
        return res.json('hello');
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/v1.0/hello', check_auth_1.authHTTP, async (req, res, next) => {
    try {
        // const user = User(req);
        return res.json('hello');
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/v1.0/income/invoice', check_auth_1.authHTTP, async (req, res, next) => {
    try {
        const sdba = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, { email: 'service@service.com', isAdmin: true, description: 'service account', env: {}, roles: [] });
        await sdba.none(`
      INSERT INTO [exc].[Queue]([type],[doc])
      VALUES (N'Invoice', JSON_QUERY(@p1))`, [JSON.stringify(req.body)]);
        return res.json(200);
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/v1.0/income/order', check_auth_1.authHTTP, async (req, res, next) => {
    try {
        const sdba = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, { email: 'service@service.com', isAdmin: true, description: 'service account', env: {}, roles: [] });
        await sdba.none(`
      INSERT INTO [exc].[Queue]([type],[doc])
      VALUES (N'Order', JSON_QUERY(@p1))`, [JSON.stringify(req.body)]);
        return res.json(200);
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/v1.0/income/expense', check_auth_1.authHTTP, async (req, res, next) => {
    try {
        const sdba = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, { email: 'service@service.com', isAdmin: true, description: 'service account', env: {}, roles: [] });
        await sdba.none(`
      INSERT INTO [exc].[Queue]([type],[doc])
      VALUES (N'Expense', JSON_QUERY(@p1))`, [JSON.stringify(req.body)]);
        return res.json(200);
    }
    catch (err) {
        next(err);
    }
});
exports.router.patch('/v1.0/Employee', check_auth_1.authHTTP, async (req, res, next) => {
    try {
        const sdba = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, { email: 'service@service.com', isAdmin: true, description: 'service account', env: {}, roles: [] });
        await sdba.none(`
      INSERT INTO [exc].[Queue]([type],[doc])
      VALUES (N'Employee', JSON_QUERY(@p1))`, [JSON.stringify(req.body)]);
        return res.json(200);
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/v1.0/Employee', check_auth_1.authHTTP, async (req, res, next) => {
    try {
        const sdba = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, { email: 'service@service.com', isAdmin: true, description: 'service account', env: {}, roles: [] });
        await sdba.none(`
      INSERT INTO [exc].[Queue]([type],[doc])
      VALUES (N'Employee', JSON_QUERY(@p1))`, [JSON.stringify(req.body)]);
        return res.json(200);
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/v1.0/queue', check_auth_1.authHTTP, async (req, res, next) => {
    try {
        const sdba = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, { email: 'service@service.com', isAdmin: true, description: 'service account', env: {}, roles: [] });
        await sdba.none(`
      INSERT INTO [exc].[Queue]([type],[doc])
      VALUES (N'Queue', JSON_QUERY(@p1))`, [JSON.stringify(req.body)]);
        return res.json(200);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=exchange.js.map