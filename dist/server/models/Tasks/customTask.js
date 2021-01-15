"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const std_lib_1 = require("../../std.lib");
const mssql_1 = require("../../mssql");
const sql_pool_tasks_1 = require("../../sql.pool.tasks");
async function default_1(job) {
    const params = job.data;
    const sdbq = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, params.user);
    const onTaskFailed = (Job, errorText = '') => {
        Job.data.error = errorText;
        Job.update(Job.data);
        throw Error(errorText);
    };
    try {
        await std_lib_1.lib.util.adminMode(true, sdbq);
        await job.progress(0);
        if (!job.data.TaskOperation)
            onTaskFailed(job, `Task operation not defined`);
        const serverDoc = await std_lib_1.lib.doc.createDocServerById(job.data.TaskOperation, sdbq);
        job.data.error = '';
        if (!serverDoc)
            onTaskFailed(job, `Task operation not exist: ${job.data.TaskOperation}`);
        const command = job.data.command || 'executeTask';
        const docModule = serverDoc['serverModule'][command];
        if (typeof docModule !== 'function')
            onTaskFailed(job, `Task method not found: ${command}`);
        await docModule({ job: job });
        await job.progress(100);
    }
    catch (ex) {
        throw ex;
    }
    finally {
        await std_lib_1.lib.util.adminMode(false, sdbq);
    }
}
exports.default = default_1;
//# sourceMappingURL=customTask.js.map