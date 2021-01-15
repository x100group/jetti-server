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
exports.movementsByDoc = exports.getAdminTX = exports.isEqualObjects = exports.unPostById = exports.postById = exports.flatDocument = exports.lib = void 0;
const sql_pool_jetti_1 = require("./sql.pool.jetti");
const tasks_1 = require("./models/Tasks/tasks");
const sql_pool_exchange_1 = require("./sql.pool.exchange");
const UsersPermissions_1 = require("./fuctions/UsersPermissions");
const config_1 = require("./models/config");
const jetti_middle_1 = require("jetti-middle");
const documents_factory_server_1 = require("./models/documents.factory.server");
const post_1 = require("./routes/utils/post");
const mssql_1 = require("./mssql");
const uuid_1 = require("uuid");
const BankStatementUnloader_1 = require("./fuctions/BankStatementUnloader");
const Catalog_Attachment_1 = require("./models/Catalogs/Catalog.Attachment");
const x100_lib_1 = require("./x100.lib");
const sql_pool_tasks_1 = require("./sql.pool.tasks");
const axios_1 = require("axios");
const dynamic_common_1 = require("./models/Dynamic/dynamic.common");
const SQLGenerator_MSSQL_Metadata_1 = require("./fuctions/SQLGenerator.MSSQL.Metadata");
const indexedOperation_1 = require("./models/indexedOperation");
const documents_factory_1 = require("./models/documents.factory");
exports.lib = {
    account: {
        balance,
        debit,
        kredit,
        byCode: accountByCode
    },
    register: {
        balance: registerBalance,
        movementsByDoc
    },
    doc: {
        byCode,
        byId,
        byIdT,
        findDocumentByKey,
        findDocumentByProps,
        createDoc,
        createDocServer,
        createDocServerById,
        saveDoc,
        updateDoc,
        historyById,
        Ancestors,
        Descendants,
        haveDescendants,
        formControlRef,
        postById,
        unPostById,
        noSqlDocument,
        flatDocument,
        docPrefix,
        isDocumentUsedInAccumulationWithPropValueById
    },
    meta: {
        updateSQLViewsByType,
        updateSQLViewsByOperationId,
        riseUpdateMetadataEvent: dynamic_common_1.riseUpdateMetadataEvent
    },
    info: {
        sliceLast,
        exchangeRate
    },
    accum: {
        balance: accumBalance,
        turnover
    },
    util: {
        groupArray,
        formatDate,
        parseDate,
        round,
        addAttachments,
        delAttachments,
        getAttachmentsByOwner,
        getAttachmentStorageById,
        getAttachmentsSettingsByOwner,
        salaryCompanyByCompany,
        bankStatementUnloadById,
        adminMode: post_1.adminMode,
        closeMonth,
        getUserRoles,
        isRoleAvailable,
        GUID,
        closeMonthErrors,
        getObjectPropertyById,
        exchangeDB,
        taskPoolTx,
        executeGETRequest,
        jettiPoolTx,
        isEqualObjects
    },
    queue: {
        insertQueue,
        updateQueue,
        deleteQueue,
        getQueueById,
        addTask,
        getTasks,
        deleteTasks
    },
    queuePost: {
        addId
    }
};
async function GUID() {
    return uuid_1.v1().toLocaleUpperCase();
}
async function accountByCode(code, tx) {
    const result = await tx.oneOrNone(`
    SELECT id result FROM [Catalog.Account.v]  WITH (NOEXPAND) WHERE code = @p1`, [code]);
    return result ? result.result : null;
}
async function byCode(type, code, tx) {
    const result = await tx.oneOrNone(`SELECT id result FROM [${type}.v]  WITH (NOEXPAND) WHERE code = @p1`, [code]);
    return result ? result.result : null;
}
async function byId(id, tx) {
    if (!id)
        return null;
    const result = await tx.oneOrNone(`
  SELECT * FROM "Documents" WHERE id = @p1`, [id]);
    if (result)
        return flatDocument(result);
    else
        return null;
}
async function historyById(historyId, tx) {
    if (!historyId)
        return null;
    const result = await tx.oneOrNone(`
  SELECT
    _id id
    ,type
    ,date
    ,code
    ,description
    ,posted
    ,deleted
    ,doc
    ,parent
    ,isfolder
    ,company
    ,user
    ,_timestamp
 FROM "Documents.Hisroty" WHERE id = @p1`, [historyId]);
    if (result)
        return flatDocument(result);
    else
        return null;
}
async function byIdT(id, tx) {
    const result = await byId(id, tx);
    if (result)
        return documents_factory_1.createDocument(result.type, result);
    else
        return null;
}
async function findDocumentByKey(searchKey, tx) {
    if (!searchKey || !searchKey.length)
        return null;
    const result = await tx.manyOrNone(`
  SELECT
  *
  FROM "Documents"
  WHERE 1 = 1 AND
  ${searchKey
        .map((e, index) => `${e.key} = @p${++index}`)
        .join(' AND ')}`, searchKey.map(e => e.value));
    if (!result)
        return null;
    return result.map(doc => flatDocument(doc));
}
async function findDocumentByProps(type, propsFilter, tx, options) {
    if (!Object.keys(propsFilter).length)
        return [];
    const { matching = 'AND', selectedFields = 'id, description', first = 0, order = 'description', excludeDeleted = false } = options || {};
    const filterQ = Object.keys(propsFilter)
        .map((key, index) => `${key} = @p${++index} `)
        .join(` ${matching} \n`);
    const query = `
  SELECT DISTINCT ${first ? 'TOP ' + first : ''}
  ${selectedFields}
  FROM [dbo].[${type}.v]
  WHERE 1 = 1 AND
  ${excludeDeleted ? 'deleted = 0 AND' : ''}
  (${filterQ})
  ORDER BY ${order} `;
    return await tx.manyOrNone(query, Object.values(propsFilter));
}
async function createDoc(type, document) {
    return await documents_factory_1.createDocument(type, document);
}
async function createDocServer(type, document, tx) {
    return await documents_factory_server_1.createDocumentServer(type, document, tx);
}
async function createDocServerById(id, tx) {
    const flatDoc = await byId(id, tx);
    if (!flatDoc)
        return null;
    return await createDocServer(flatDoc.type, flatDoc, tx);
}
async function saveDoc(servDoc, tx, queuePostFlow, opts) {
    const savedVersion = await byId(servDoc.id, tx);
    const isPostedBefore = jetti_middle_1.Type.isDocument(servDoc.type) && savedVersion && savedVersion.posted;
    const isPostedAfter = jetti_middle_1.Type.isDocument(servDoc.type) && servDoc.posted;
    if (isPostedBefore)
        await post_1.unpostDocument(servDoc, tx);
    if (!servDoc.code)
        servDoc.code = await exports.lib.doc.docPrefix(servDoc.type, tx);
    if (!servDoc.timestamp)
        servDoc = await post_1.insertDocument(servDoc, tx, opts);
    else
        servDoc = await post_1.updateDocument(servDoc, tx, opts);
    if (isPostedAfter) {
        if (queuePostFlow)
            await exports.lib.queuePost.addId(servDoc.id, queuePostFlow, tx);
        else
            await post_1.postDocument(servDoc, tx);
    }
    return servDoc;
}
async function updateDoc(servDoc, tx) {
    return await post_1.updateDocument(servDoc, tx);
}
async function isDocumentUsedInAccumulationWithPropValueById(docId, tx) {
    return (await isDocumentUsedInAccumulationWithPropValueByIdInTable(docId, 'Accumulation', tx) ||
        await isDocumentUsedInAccumulationWithPropValueByIdInTable(docId, '[Register.Info]', tx));
}
// tslint:disable-next-line: max-line-length
async function isDocumentUsedInAccumulationWithPropValueByIdInTable(docId, tableName, tx) {
    const query = `
  select TOP 1 id
  from ${tableName}
  where contains(data, @p1)`;
    return !!(await tx.oneOrNone(query, [docId]));
}
async function Ancestors(id, tx, level) {
    if (!id)
        return null;
    const query = `SELECT id, [parent.id] parent, levelUp as N'level' FROM dbo.[Ancestors](@p1) WHERE levelUp = @p2 or @p2 is NULL`;
    let result;
    if (level || level === 0) {
        result = await tx.oneOrNone(query, [id, level]);
        if (result)
            result = result.id;
    }
    else {
        result = await tx.manyOrNone(query, [id, null]);
    }
    return result;
}
async function Descendants(id, tx) {
    if (!id)
        return null;
    return await tx.manyOrNone(`SELECT id, parent FROM dbo.[Descendants](@p1,'')`, [id]);
}
async function haveDescendants(id, tx) {
    if (!id)
        return false;
    const query = 'select top 1 id from Documents where parent = @p1';
    return !!(await tx.oneOrNone(query, [id]));
}
async function salaryCompanyByCompany(company, tx) {
    return await x100_lib_1.x100.util.salaryCompanyByCompany(company, tx);
}
function noSqlDocument(flatDoc) {
    if (!flatDoc)
        throw new Error(`lib.noSqlDocument: source is null!`);
    const { id, date, type, code, description, company, user, posted, deleted, isfolder, parent, info, timestamp } = flatDoc, doc = __rest(flatDoc, ["id", "date", "type", "code", "description", "company", "user", "posted", "deleted", "isfolder", "parent", "info", "timestamp"]);
    return { id, date, type, code, description, company, user, posted, deleted, isfolder, parent, info, timestamp, ExchangeCode: flatDoc['ExchangeCode'], ExchangeBase: flatDoc['ExchangeBase'], doc };
}
function flatDocument(noSqldoc) {
    if (!noSqldoc)
        throw new Error(`lib.flatDocument: source is null!`);
    const { doc } = noSqldoc, header = __rest(noSqldoc, ["doc"]);
    const flatDoc = Object.assign(Object.assign({}, header), doc);
    return flatDoc;
}
exports.flatDocument = flatDocument;
async function docPrefix(type, tx) {
    const sqType = jetti_middle_1.Type.isOperation(type) ? 'Document.Operation' : type;
    const metadata = config_1.configSchema().get(sqType);
    if (metadata && metadata.prefix) {
        const prefix = metadata.prefix;
        const queryText = `SELECT '${prefix}' + FORMAT((NEXT VALUE FOR "Sq.${sqType}"), '0000000000') result `;
        const result = await tx.oneOrNone(queryText);
        return result ? result.result : '';
    }
    return '';
}
async function formControlRef(id, tx) {
    const result = await tx.oneOrNone(`
    SELECT "id", "code", "description" as "value", "type" FROM "Documents" WHERE id = @p1`, [id]);
    return result;
}
async function debit(account, date = new Date(), company, tx) {
    const result = await tx.oneOrNone(`
    SELECT SUM(sum) result FROM "Register.Account"
    WHERE dt = @p1 AND datetime <= @p2 AND company = @p3
  `, [account, date, company]);
    return result ? result.result : 0;
}
async function kredit(account, date = new Date(), company, tx) {
    const result = await tx.oneOrNone(`
    SELECT SUM(sum) result FROM "Register.Account"
    WHERE kt = @p1 AND datetime <= @p2 AND company = @p3
  `, [account, date, company]);
    return result ? result.result : 0;
}
async function balance(account, date = new Date(), company, tx) {
    const result = await tx.oneOrNone(`
  SELECT (SUM(u.dt) - SUM(u.kt)) result FROM (
      SELECT SUM(sum) dt, 0 kt
      FROM "Register.Account"
      WHERE dt = @p1 AND datetime <= @p2 AND company = @p3

      UNION ALL

      SELECT 0 dt, SUM(sum) kt
      FROM "Register.Account"
      WHERE kt = @p1 AND datetime <= @p2 AND company = @p3
  ) u`, [account, date, company]);
    return result ? result.result : 0;
}
async function registerBalance(type, date = new Date(), resource, analytics, tx) {
    const addFields = (key) => `SUM("${key}") "${key}",\n`;
    let fields = '';
    for (const el of resource) {
        fields += addFields(el);
    }
    fields = fields.slice(0, -2);
    const addWhere = (key) => `AND "${key}" = '${analytics[key]}'\n`;
    let where = '';
    for (const el of resource) {
        where += addWhere(el);
    }
    where = where.slice(0, -2);
    const queryText = `
  SELECT ${fields}
  FROM "${type}"
  WHERE (1=1)
    AND date <= @p1
    ${where}
  `;
    const result = await tx.oneOrNone(queryText, [date]);
    return (result ? result : {});
}
async function exchangeRate(date = new Date(), company, currency, tx) {
    const queryText = `
    SELECT TOP 1 CAST([Rate] AS FLOAT) / CASE WHEN [Mutiplicity] > 0 THEN [Mutiplicity] ELSE 1 END result
    FROM [Register.Info.ExchangeRates] WITH (NOEXPAND)
    WHERE (1=1)
      AND date <= @p1
      AND company = @p2
      AND [currency] = @p3
    ORDER BY date DESC`;
    const result = await tx.oneOrNone(queryText, [date, company, currency]);
    return result ? result.result : 1;
}
async function sliceLast(type, date = new Date(), company, analytics, tx) {
    const addWhere = (key) => `AND "${key}" = '${analytics[key]}' \n`;
    let where = '';
    for (const el of Object.keys(analytics)) {
        where += addWhere(el);
    }
    const queryText = `
    SELECT TOP 1 * FROM [Register.Info.${type}] WITH (NOEXPAND)
    WHERE (1=1)
      AND date <= @p1
      AND company = @p2
      ${where}
    ORDER BY date DESC`;
    const result = await tx.oneOrNone(queryText, [date, company]);
    return result;
}
async function accumBalance(registerName, date, fields, groupBy, filter, topRows) {
    const where = Object.keys(filter).map((key, index) => `AND "${key}" = @p${index + 2}`).join('\n');
    const select = fields.split(',').map(key => `SUM(${key}) ${key}`).join(',\n');
    const having = fields.split(',').map(key => `SUM(${key}) <> 0`).join('\n AND ');
    const params = Object.values(filter);
    const queryText = `
    SELECT TOP ${topRows || 1000}
    ${groupBy},
    ${select}
    FROM [Register.Accumulation.${registerName}]
    WHERE
      date <= @p1
      ${where}
      ${groupBy ? `GROUP BY ${groupBy}` : ''}
    HAVING ${having}`;
    const tx = x100_lib_1.x100.util.x100DataDB();
    const result = await tx.manyOrNone(queryText, [date, ...params]);
    return result;
}
async function turnover(registerName, period, fields, groupBy, filter, topRows) {
    const where = Object.keys(filter).map((key, index) => `AND "${key}" = @p${index + 3}`).join('\n');
    const select = fields.split(',').map(key => `SUM(${key}) ${key}`).join(',\n');
    const having = fields.split(',').map(key => `SUM(${key}) <> 0`).join('\n AND ');
    const params = Object.values(filter);
    const queryText = `
    SELECT TOP ${topRows || 1000}
      ${groupBy},
      ${select}
    FROM [Register.Accumulation.${registerName}]
    WHERE
      date BETWEEN @p1 AND @p2
      ${where}
      ${groupBy ? `GROUP BY ${groupBy}` : ''}
      HAVING ${having}`;
    const tx = x100_lib_1.x100.util.x100DataDB();
    const result = await tx.manyOrNone(queryText, [period.begin, period.end, ...params]);
    return result;
}
async function postById(id, tx) {
    await exports.lib.util.adminMode(true, tx);
    try {
        const serverDoc = await post_1.setPostedSate(id, tx);
        await post_1.unpostDocument(serverDoc, tx);
        if (serverDoc.deleted === false)
            await post_1.postDocument(serverDoc, tx);
        return serverDoc;
    }
    catch (ex) {
        throw new Error(ex);
    }
    finally {
        await exports.lib.util.adminMode(false, tx);
    }
}
exports.postById = postById;
async function unPostById(id, tx) {
    await exports.lib.util.adminMode(true, tx);
    try {
        const doc = (await exports.lib.doc.byId(id, tx));
        const serverDoc = await documents_factory_server_1.createDocumentServer(doc.type, doc, tx);
        // if (!doc.posted) return serverDoc;
        serverDoc.posted = false;
        await post_1.unpostDocument(serverDoc, tx);
        await post_1.updateDocument(serverDoc, tx);
        return serverDoc;
    }
    catch (ex) {
        throw new Error(ex);
    }
    finally {
        await exports.lib.util.adminMode(false, tx);
    }
}
exports.unPostById = unPostById;
function taskPoolTx() {
    return new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, { email: 'service@service.com', isAdmin: true, description: 'service account', env: {}, roles: [] });
}
async function executeGETRequest(opts) {
    const instance = axios_1.default.create({ baseURL: opts.baseURL });
    return await instance.get(opts.query);
}
async function updateSQLViewsByType(type, tx, withSecurityPolicy = true) {
    if (!tx)
        tx = getAdminTX();
    const queries = [
        ...SQLGenerator_MSSQL_Metadata_1.SQLGenegatorMetadata.CreateViewCatalogIndex(type, withSecurityPolicy, true),
        ...SQLGenerator_MSSQL_Metadata_1.SQLGenegatorMetadata.CreateViewCatalog(type, true)
    ];
    for (const querText of queries) {
        try {
            await tx.none(`execute sp_executesql @p1`, [querText]);
        }
        catch (error) {
            if (queries.indexOf(querText))
                throw new Error(error);
        }
    }
}
async function updateSQLViewsByOperationId(id, tx, withSecurityPolicy = true) {
    const indexedOperation = indexedOperation_1.getIndexedOperationById(id);
    if (!indexedOperation)
        throw new Error(`Operation ${id} is not indexed`);
    if (!tx)
        tx = getAdminTX();
    const queries = [
        ...await SQLGenerator_MSSQL_Metadata_1.SQLGenegatorMetadata.CreateViewOperationIndex(indexedOperation, tx, true, withSecurityPolicy),
        ...await SQLGenerator_MSSQL_Metadata_1.SQLGenegatorMetadata.CreateViewOperation(indexedOperation, true)
    ];
    for (const querText of queries) {
        try {
            if (process.env.NODE_ENV !== 'production')
                console.log(querText);
            await tx.none(`execute sp_executesql @p1`, [querText]);
        }
        catch (error) {
            if (queries.indexOf(querText))
                throw new Error(error);
        }
    }
}
function isEqualObjects(object1, object2) {
    const keysObject1 = Object.keys(object1);
    const keysObject2 = Object.keys(object2);
    if (keysObject1.length !== keysObject2.length ||
        keysObject1.join().length !== keysObject2.join().length)
        return false;
    keysObject1.forEach(keyObj1 => {
        if (!keysObject2.includes(keyObj1) ||
            object1[keyObj1] !== object2[keyObj1])
            return false;
    });
    return true;
}
exports.isEqualObjects = isEqualObjects;
function getAdminTX() {
    return new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL);
}
exports.getAdminTX = getAdminTX;
function jettiPoolTx() {
    return new mssql_1.MSSQL(sql_pool_jetti_1.JETTI_POOL);
}
async function insertQueue(row, taskPoolTX) {
    if (!row.date)
        row.date = new Date();
    if (!taskPoolTX)
        taskPoolTX = taskPoolTx();
    const query = `INSERT INTO [exc].[Queue]([type],[doc],[status],[ExchangeCode],[ExchangeBase],[Date],[id])
  VALUES (@p1, JSON_QUERY(@p2), @p3, @p4, @p5, @p6, @p7)`;
    if (!row.id)
        row.id = uuid_1.v1().toLocaleUpperCase();
    await taskPoolTX.none(query, [row.type, row.doc, row.status, row.exchangeCode, row.exchangeBase, row.date, row.id]);
    return row;
}
async function addId(id, flow, taskPoolTX) {
    if (!id)
        return;
    if (!taskPoolTX)
        taskPoolTX = taskPoolTx();
    await taskPoolTX.none(`INSERT INTO [exc].[QueuePost]([id],[flow])
  VALUES (@p1, @p2)`, [id, flow]);
}
async function updateQueue(row, taskPoolTX) {
    if (!row.date)
        row.date = new Date();
    if (!taskPoolTX)
        taskPoolTX = taskPoolTx();
    const query = `UPDATE [exc].[Queue]
    SET
      [type] = @p1,
      [doc] = JSON_QUERY(@p2),
      [status] = @p3,
      [ExchangeCode] = @p4,
      [ExchangeBase] = @p5,
      [Date] = @p6 WHERE id = @p7`;
    if (!row.id)
        row.id = uuid_1.v1().toLocaleUpperCase();
    await taskPoolTX.none(query, [row.type, row.doc, row.status, row.exchangeCode, row.exchangeBase, row.date, row.id]);
    return row;
}
async function deleteQueue(id, taskPoolTX) {
    if (!taskPoolTX)
        taskPoolTX = taskPoolTx();
    const query = `DELETE FROM [exc].[Queue] WHERE id = @p1`;
    await taskPoolTX.none(query, [id]);
}
async function getQueueById(id, taskPoolTX) {
    if (taskPoolTX)
        taskPoolTX = taskPoolTx();
    const query = `SELECT * FROM  [exc].[Queue] WHERE id = @p1`;
    return await taskPoolTX.oneOrNone(query, [id]);
}
async function addTask(queueId, taskParams, taskOpts) {
    return await tasks_1.execQueueAPIPostRequest(queueId, `api/v1.0/task/add`, { params: taskParams, opts: taskOpts });
}
async function getTasks(queueId, params) {
    return await tasks_1.execQueueAPIPostRequest(queueId, `api/v1.0/task/get`, params);
}
async function deleteTasks(queueId, params) {
    return await tasks_1.execQueueAPIPostRequest(queueId, `api/v1.0/task/delete`, params);
}
function formatDate(date) {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yy = date.getFullYear();
    return `${dd < 10 ? '0' + dd : dd}.${mm < 10 ? '0' + mm : mm}.${yy}`;
}
// stringToDate("17/9/2014","dd/MM/yyyy","/");
function parseDate(date, format, delimiter) {
    const formatItems = format.toLowerCase().split(delimiter);
    const dateItems = date.split(delimiter);
    const monthIndex = formatItems.indexOf('mm');
    const dayIndex = formatItems.indexOf('dd');
    const yearIndex = formatItems.indexOf('yyyy');
    const month = parseInt(dateItems[monthIndex], undefined) - 1;
    return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
}
function groupArray(array, groupField = '') {
    return groupField ? [...new Set(array.map(e => e[groupField]))] : [...new Set(array)];
}
function round(num, precision = 4) {
    const factor = +`1${'0'.repeat(precision)}`;
    return Math.round(num * factor) / factor;
}
async function addAttachments(attachments, tx) {
    const keys = Object.keys(new Catalog_Attachment_1.CatalogAttachment);
    const result = [];
    let userId = '';
    // const getCurrentUserIdByMail = async () => {
    //   return await byCode('Catalog.User', tx.user.email, tx);
    // };
    for (const attachment of attachments) {
        if (!attachment.owner)
            throw new Error('Attachment owner is empty!');
        let ob;
        if (attachment.id && attachment.timestamp)
            ob = await createDocServerById(attachment.id, tx);
        else {
            ob = await createDocServer('Catalog.Attachment', undefined, tx);
            if (!userId)
                userId = tx.user.env.id;
            ob.user = userId;
            ob.date = new Date;
            ob.company = (await byId(attachment.owner, tx)).company;
        }
        Object.keys(attachment)
            .filter(e => keys.includes(e) && attachment[e])
            .forEach(e => ob[e] = attachment[e]);
        if (!ob.user)
            ob.user = '63C8AE00-5985-11EA-B2B2-7DD8BECCDACF'; // EXCHANGE SERVICE
        ob = await saveDoc(ob, tx);
        const resOb = Object.assign(Object.assign({}, attachment), { timestamp: ob.timestamp, date: ob.date, user: ob.user, id: ob.id });
        if (!resOb['userDescription'] && resOb.user)
            resOb['userDescription'] = (await byId(resOb.user, tx)).description;
        result.push(resOb);
    }
    return result;
}
async function delAttachments(attachmentsId, tx) {
    for (const id of attachmentsId) {
        const ob = await createDocServerById(id, tx);
        if (!ob || ob.deleted)
            continue;
        ob.Storage = '';
        ob.deleted = true;
        await post_1.updateDocument(ob, tx);
    }
    return true;
}
async function getAttachmentsByOwner(ownerId, withDeleted, tx) {
    const query = `
  SELECT
    attach.*,
    stor.Storage
FROM
    (
        SELECT
            a.id,
            a.description,
            a.timestamp,
            a.owner,
            a.date,
            a.AttachmentType,
            a.Tags,
            a.MIMEType,
            a.FileSize,
            a.FileName,
            us.description userDescription,
            at.description AttachmentTypeDescription,
            at.IconURL,
            at.StorageType,
            at.LoadDataOnInit
        FROM
            [Catalog.Attachment.v] a
            LEFT JOIN [Catalog.Attachment.Type.v] at ON a.AttachmentType = at.id
            LEFT JOIN [Catalog.User.v] us ON a.[user] = us.id
        WHERE
            a.owner = @p1
            ${withDeleted ? '' : 'and a.deleted = 0'}
    ) attach
    LEFT JOIN dbo.[Documents] doc
    CROSS APPLY OPENJSON (doc.doc, N'$') WITH (Storage NVARCHAR(MAX) N'$.Storage') stor ON attach.id = doc.id
    and attach.LoadDataOnInit = 1
ORDER BY
    attach.timestamp DESC`;
    return await tx.manyOrNone(query, [ownerId]);
}
async function getAttachmentStorageById(attachmentId, tx) {
    const query = `
  SELECT stor.Storage FROM dbo.[Documents] doc
    CROSS APPLY OPENJSON (doc.doc, N'$') WITH (Storage NVARCHAR(MAX) N'$.Storage') stor WHERE doc.id = @p1`;
    const res = await tx.oneOrNone(query, [attachmentId]);
    return res ? res.Storage : '';
}
async function getAttachmentsSettingsByOwner(ownerId, tx) {
    const owner = await byId(ownerId, tx);
    if (!owner)
        return [];
    let query = `SELECT d.id AttachmentType,
      d.description AttachmentTypeDescription,
      JSON_VALUE(d.doc, N'$.StorageType')  StorageType,
      JSON_VALUE(d.doc, N'$.FileFilter')  FileFilter,
      JSON_VALUE(d.doc, N'$.MaxFileSize')  MaxFileSize,
      JSON_VALUE(d.doc, N'$.IconURL')  IconURL,
      JSON_VALUE(d.doc, N'$.Tags')  Tags
  FROM [dbo].[Documents] d

  where d.type = 'Catalog.Attachment.Type'
      and d.deleted = 0
      and JSON_VALUE(d.doc, N'$.AllDocuments') = 'true'
  UNION
  SELECT d.id AttachmentType,
      d.description AttachmentTypeDescription,
      JSON_VALUE(d.doc, N'$.StorageType') StorageType,
      JSON_VALUE(d.doc, N'$.FileFilter') FileFilter,
      JSON_VALUE(d.doc, N'$.MaxFileSize') MaxFileSize,
      JSON_VALUE(d.doc, N'$.IconURL')  IconURL,
      JSON_VALUE(d.doc, N'$.Tags')  Tags
  FROM [dbo].[Documents] d
  CROSS APPLY OPENJSON (d.doc, N'$.Owners')
  WITH (
      [OwnerType] VARCHAR(MAX)
  ) AS owners
  where d.type = 'Catalog.Attachment.Type'
      and d.deleted = 0
      and owners.[OwnerType] = @p1
  ORDER by AttachmentTypeDescription`;
    if (jetti_middle_1.Type.isCatalog(owner.type))
        query = query.replace('.AllDocuments', '.AllCatalogs');
    const qRes = await tx.manyOrNone(query, [owner.type]);
    if (!qRes.length)
        return [];
    return [...new Set(qRes.map(e => {
            return Object.assign(Object.assign({}, e), { Tags: [...new Set(e.Tags.split(';').map(tag => tag.trim()).filter(tag => tag))] });
        }))];
}
async function movementsByDoc(type, doc, tx) {
    const queryText = `
  SELECT * FROM [Accumulation] WHERE type = @p1 AND document = @p2`;
    return await tx.manyOrNone(queryText, [type, doc]);
}
exports.movementsByDoc = movementsByDoc;
async function bankStatementUnloadById(docsID, tx) {
    return await BankStatementUnloader_1.BankStatementUnloader.getBankStatementAsString(docsID, tx);
}
async function getUserRoles(user) {
    return (await UsersPermissions_1.getUserPermissions(user)).Roles;
}
async function isRoleAvailable(role, tx) {
    return tx && tx.user && tx.user.roles && tx.user.roles && tx.user.roles.includes(role);
}
async function closeMonth(company, date, tx) {
    // const sdb = new MSSQL(TASKS_POOL, { email: '', isAdmin: true, env: {}, description: '', roles: []} );
    await tx.none(`
    EXEC [Invetory.Close.Month-MEM] @company = '${company}', @date = '${date.toJSON()}'`);
}
async function closeMonthErrors(company, date, tx) {
    const result = await tx.manyOrNone(`
    SELECT q.*, Storehouse.Department Department FROM (
      SELECT Storehouse, SKU, SUM([Cost]) [Cost]
      FROM [dbo].[Register.Accumulation.Inventory] r
      WHERE date < DATEADD(DAY, 1, EOMONTH(@p1)) AND company = @p2
      GROUP BY Storehouse, SKU
      HAVING SUM([Qty]) = 0 AND SUM([Cost]) <> 0) q
    LEFT JOIN [Catalog.Storehouse.v] Storehouse WITH (NOEXPAND) ON Storehouse.id = q.Storehouse`, [date, company]);
    return result;
}
async function getObjectPropertyById(id, propPath, tx) {
    // https://github.com/tediousjs/tedious/blob/820dd2390dd6d119463822df3d7612c623db21ea/src/data-types/uniqueidentifier.ts
    const isGUID2 = (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
    const isGUID = (val) => {
        return val.length === 36 && val.split('-').length === 5 && val.split('-')[0].length === 8;
    };
    let curVal, result = null;
    let ob = await exports.lib.doc.byId(id, tx);
    if (!ob)
        return result;
    const path = propPath.split('.');
    let i = 0;
    for (i = 0; i < path.length; i++) {
        if (!ob)
            break;
        curVal = ob[path[i]];
        if (curVal && isGUID(curVal.toString()))
            ob = await byId(curVal, tx);
        else
            ob = null;
    }
    if (i === path.length)
        result = curVal;
    if (result && isGUID(result.toString()))
        result = await byId(result, tx);
    return result;
}
function exchangeDB() {
    return new mssql_1.MSSQL(sql_pool_exchange_1.EXCHANGE_POOL);
}
//# sourceMappingURL=std.lib.js.map