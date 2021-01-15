"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const std_lib_1 = require("../../std.lib");
const mssql_1 = require("../../mssql");
const sql_pool_tasks_1 = require("../../sql.pool.tasks");
async function default_1(job) {
    const params = job.data;
    const sdbq = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, params.user);
    try {
        await std_lib_1.lib.util.adminMode(true, sdbq);
        const query = `
      SELECT d.id, d.date, d.description
      FROM [dbo].[Documents] d
      WHERE (1 = 1) AND
        d.company = @p1
        ${params.StartDate ? ' AND date between @p2 AND @p3 ' : ''}
        ${params.Operation ? ` AND JSON_VALUE(doc, '$.Operation') = @p4 ` : ``}
        ${params.rePost ? ' AND posted = 1' : ' AND posted = 0 '} AND
        d.deleted = 0 and d.type LIKE 'Document.%' AND
        (d.[user] <> 'E050B6D0-FAED-11E9-B75B-A35013C043AE' OR d.[user] IS NULL)
      ORDER BY d.date;`;
        const docs = await sdbq.manyOrNone(query, [params.company, params.StartDate, params.EndDate, params.Operation]);
        job.data.message = `found ${docs.length} docs for ${params.companyName}, id=${params.company}`;
        await job.progress(0);
        if (docs.length) {
            const TaskList = [];
            const count = docs.length;
            let offset = 0;
            job.data.job['total'] = docs.length;
            job.data.message = `job started for ${params.companyName}, total dosc = ${docs.length} documents`;
            await job.update(job.data);
            await job.progress(0);
            for (const doc of docs) {
                offset = offset + 1;
                job.data.message = `${params.companyName}, ${offset} of ${count}, last doc -> [${doc.description}]`;
                try {
                    await sdbq.tx(async (tx) => { await std_lib_1.lib.doc.postById(doc.id, tx); });
                }
                catch (ex) {
                    job.data.message = `!${ex}, ${job.data.message}`;
                }
                await job.update(job.data);
                await job.progress(offset);
            }
        }
        job.data.message = `job complete for ${params.companyName}`;
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
//# sourceMappingURL=sync.js.map