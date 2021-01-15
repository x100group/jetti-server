"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const db_sessions_1 = require("./middleware/db-sessions");
const filterBuilder_1 = require("../fuctions/filterBuilder");
const Types_factory_1 = require("../models/Types/Types.factory");
const documents_factory_1 = require("../models/documents.factory");
const jetti_middle_1 = require("jetti-middle");
exports.router = express.Router();
exports.router.post('/suggestOld/:type', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const type = req.params.type;
        const filter = req.query.filter;
        const filters = req.body.filters;
        let filterQuery = `(1 = 1)`;
        filters.filter(e => e.right !== undefined).forEach(f => {
            const value = f.right.id ? f.right.id : f.right;
            filterQuery += `
    AND [${f.left}] = N'${value}'`;
        });
        const query = `
    SELECT top 10 id as id, description as value, code as code, type as type, isfolder, deleted
    FROM [${type}.v] WITH (NOEXPAND)
    WHERE ${filterQuery}
    AND (description LIKE @p1 OR code LIKE @p1)
    ORDER BY type, description, deleted, code`;
        const data = await sdb.manyOrNone(query, ['%' + filter + '%']);
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/suggest/:type', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const type = req.params.type;
        const filterLike = req.query.filter;
        const filter = req.body.filters;
        const filterQuery = filterBuilder_1.filterBuilder(filter);
        let query = '';
        const queryOrder = 'type, description, deleted, code'.split(', ');
        if (jetti_middle_1.Type.isType(type)) {
            const select = Types_factory_1.createTypes(type).getTypes()
                .map(el => ({
                type: el,
                description: documents_factory_1.createDocument(el).Prop().description
            }));
            query = suggestQuery(select);
        }
        else if (type === 'Catalog.Subcount')
            query = suggestQuery(Types_factory_1.allTypes(), 'Catalog.Subcount');
        else {
            query = `${filterQuery.tempTable}
    SELECT top 10 id as id, description as value, code as code, description + ' (' + code + ')' as description, type as type, isfolder, deleted
    FROM [${type}.v] WITH (NOEXPAND)
    WHERE ${filterQuery.where}`;
            queryOrder.unshift('LEN([description])');
        }
        query = query.concat(`AND (description LIKE @p1 OR code LIKE @p1)
    ORDER BY ${queryOrder.join(', ')}`);
        const data = await sdb.manyOrNone(query, ['%' + filterLike + '%']);
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
function suggestQuery(select, type = '') {
    let query = '';
    for (const row of select) {
        query += `SELECT
      N'${type ? row.description : ''}' "value",
      '${row.type}' AS "id",
      '${type || row.type}' "type",
      '${row.type}' "code",
      N'${row.description}' + ' ('+ '${row.type}' + ')' "description",
      CAST(1 AS BIT) posted,
      CAST(0 AS BIT) deleted,
      CAST(0 AS BIT) isfolder,
      NULL parent
      UNION ALL\n`;
    }
    query = `SELECT * FROM (${query.slice(0, -(`UNION ALL\n`).length)}) d WHERE (1=1)\n`;
    return query;
}
//# sourceMappingURL=suggest.js.map