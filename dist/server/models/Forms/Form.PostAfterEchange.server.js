"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x100_lib_1 = require("./../../x100.lib");
const tasks_1 = require("../Tasks/tasks");
const Form_PostAfterEchange_1 = require("./Form.PostAfterEchange");
const std_lib_1 = require("../../std.lib");
const mssql_1 = require("../../mssql");
const sql_pool_tasks_1 = require("../../sql.pool.tasks");
class PostAfterEchangeServer extends Form_PostAfterEchange_1.PostAfterEchange {
    async AddDescendantsCompany(tx) {
        if (!this.company)
            throw new Error(`Empty company!`);
        if (this.EndDate)
            this.EndDate.setHours(23, 59, 59, 999);
        this.user.isAdmin = true;
        const descedants = await std_lib_1.lib.doc.Descendants(this.company, new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, this.user));
        if (!descedants)
            return;
        const query = `SELECT distinct company
    FROM dbo.[Register.Accumulation.Inventory]
    WHERE (1 = 1) ${this.StartDate ? ' AND date between @p2 AND @p3 ' : ``}
    AND company IN (${descedants.map(el => '\'' + el.id + '\'').join(',')})`;
        const companyItems = await x100_lib_1.x100.util.x100DataDB().manyOrNone(query, [this.company, this.StartDate, this.EndDate]);
        this.Companys = [...new Set([...this.Companys.map(e => e.company), ...companyItems.map(e => e.company)])]
            .map(e => ({ company: e }));
    }
    async Execute() {
        this.user.isAdmin = true;
        if (this.EndDate)
            this.EndDate.setHours(23, 59, 59, 999);
        const procId = tasks_1.processId();
        const sdbq = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, this.user);
        let query = `
      SELECT company, COUNT(*) count
      FROM [dbo].[Documents]
      WHERE (1 = 1) ${this.StartDate ? ' AND date between @p2 AND @p3 ' : ``}
        ${this.Operation ? ` AND JSON_VALUE(doc, '$.Operation') = @p4 ` : ``}
        ${this.rePost ? `` : ` AND posted = 0 `} AND deleted = 0 and type LIKE 'Document.%' AND
        -- [ExchangeBase] IS NOT NULL AND
        company IS NOT NULL AND
        company IN (SELECT id FROM dbo.[Descendants](@p1, ''))
      GROUP BY company
      HAVING COUNT(*) >0
      ORDER BY 2 DESC`;
        if (this.Companys.length)
            query = query.replace(`SELECT id FROM dbo.[Descendants](@p1, '')`, `${this.Companys.map(el => '\'' + el.company + '\'').join(',')}`);
        const companyList = await sdbq.manyOrNone(query, [this.company, this.StartDate, this.EndDate, this.Operation]);
        for (const row of companyList) {
            const companyObject = await std_lib_1.lib.doc.byIdT(row.company, sdbq);
            const companyDescription = companyObject && companyObject.description;
            const data = {
                job: { id: `sync`, description: `[IIKO exchange for  ${companyDescription}]` },
                user: this.user,
                company: row.company,
                companyName: companyDescription,
                StartDate: this.StartDate,
                EndDate: this.EndDate,
                rePost: this.rePost,
                Operation: this.Operation,
                processId: procId
            };
            const activeJobs = await tasks_1.JQueue.getActive();
            const jobs = activeJobs.filter(j => j.data.job.id === `sync` && j.data.company === row.company);
            if (jobs.length === 0)
                await tasks_1.JQueue.add(data, { attempts: 3, priority: 100 });
        }
        return this;
    }
}
exports.default = PostAfterEchangeServer;
//# sourceMappingURL=Form.PostAfterEchange.server.js.map