"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const tasks_1 = require("../models/Tasks/tasks");
const user_settings_1 = require("../routes/user.settings");
const db_sessions_1 = require("./middleware/db-sessions");
const std_lib_1 = require("../std.lib");
exports.router = express.Router();
exports.router.post('/jobs/add', async (req, res, next) => {
    try {
        const sdbq = db_sessions_1.SDB(req);
        await sdbq.tx(async (tx) => {
            await std_lib_1.lib.util.adminMode(true, tx);
            try {
                req.body.data.user = user_settings_1.User(req);
                req.body.data.userId = user_settings_1.User(req).email;
                req.body.data.tx = tx;
                const result = await tasks_1.JQueue.add(req.body.data, req.body.opts);
                res.json(tasks_1.mapJob(result));
            }
            catch (ex) {
                throw new Error(ex);
            }
            finally {
                await std_lib_1.lib.util.adminMode(false, tx);
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/jobsCount', async (req, res, next) => {
    try {
        res.json(await tasks_1.JQueue.getJobCounts());
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/jobsActive', async (req, res, next) => {
    try {
        res.json(await tasks_1.JQueue.getActiveCount());
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/jobs', async (req, res, next) => {
    try {
        const all = await Promise.all([
            tasks_1.JQueue.getActive(),
            tasks_1.JQueue.getCompleted(),
            tasks_1.JQueue.getDelayed(),
            tasks_1.JQueue.getFailed(),
            tasks_1.JQueue.getWaiting(),
        ]);
        const result = {
            Active: all[0].map(el => tasks_1.mapJob(el)),
            Completed: all[1].map(el => tasks_1.mapJob(el)),
            Delayed: all[2].map(el => tasks_1.mapJob(el)),
            Failed: all[3].map(el => tasks_1.mapJob(el)),
            Waiting: all[4].map(el => tasks_1.mapJob(el)),
        };
        result.Completed.length = Math.min(5, result.Completed.length);
        result.Delayed.length = Math.min(5, result.Delayed.length);
        result.Failed.length = Math.min(5, result.Failed.length);
        result.Waiting.length = Math.min(5, result.Waiting.length);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/jobs/:id', async (req, res, next) => {
    try {
        const job = await tasks_1.JQueue.getJob(req.params.id);
        res.json(tasks_1.mapJob(job));
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=tasks.js.map