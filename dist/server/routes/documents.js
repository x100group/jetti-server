"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildViewModel = exports.router = void 0;
const x100_lib_1 = require("./../x100.lib");
const express = require("express");
const documents_factory_server_1 = require("../models/documents.factory.server");
const std_lib_1 = require("./../std.lib");
const list_1 = require("./utils/list");
const post_1 = require("./utils/post");
const db_sessions_1 = require("./middleware/db-sessions");
const indexedOperation_1 = require("../models/indexedOperation");
const global_1 = require("../models/global");
// tslint:disable-next-line: max-line-length
const jetti_middle_1 = require("jetti-middle");
const documents_factory_1 = require("../models/documents.factory");
exports.router = express.Router();
async function buildViewModel(ServerDoc, tx) {
    const viewModelQuery = jetti_middle_1.SQLGenegator.QueryObjectFromJSON(ServerDoc.Props());
    const NoSqlDocument = JSON.stringify(std_lib_1.lib.doc.noSqlDocument(ServerDoc));
    return await tx.oneOrNone(viewModelQuery, [NoSqlDocument]);
}
exports.buildViewModel = buildViewModel;
// Select documents list for UI (grids/list etc)
exports.router.post('/list', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const params = req.body;
        res.json(await list_1.List(params, sdb));
    }
    catch (err) {
        next(err);
    }
});
const viewAction = async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const params = req.body;
        const id = params.id;
        const type = params.type;
        const Operation = req.query.Operation || params.operation || undefined;
        const isFolder = req.query.isfolder === 'true';
        const Group = params.group ? params.group : Operation ? (await std_lib_1.lib.util.getObjectPropertyById(Operation, 'Group', sdb)).id : null;
        let doc = null;
        if (id)
            doc = await std_lib_1.lib.doc.byId(id, sdb);
        if (!doc) {
            doc = Object.assign(Object.assign({}, documents_factory_1.createDocument(type)), { Operation, Group });
            doc.isfolder = isFolder;
        }
        const ServerDoc = await documents_factory_server_1.createDocumentServer(type, doc, sdb);
        if (!ServerDoc)
            throw new Error(`wrong type ${type}`);
        if (id)
            ServerDoc.id = id;
        let model = {};
        const settings = new jetti_middle_1.FormListSettings();
        const userID = sdb.user.env.id;
        if (id) {
            const addIncomeParamsIntoDoc = async (prm, d) => {
                for (const k in prm) {
                    if (k === 'type' || k === 'id' || k === 'new' || k === 'base' || k === 'copy' || k === 'history') {
                        continue;
                    }
                    if (typeof params[k] !== 'boolean')
                        d[k] = params[k];
                    else
                        d[k] = params[k];
                }
            };
            const command = req.query.new ? 'new' : req.query.copy ? 'copy' : req.query.base ? 'base' : req.query.history ? 'history' : '';
            switch (command) {
                case 'new':
                    // init default values from metadata
                    const schema = ServerDoc.Props();
                    Object.keys(schema).filter(p => schema[p].value !== undefined).forEach(p => ServerDoc[p] = schema[p].value);
                    addIncomeParamsIntoDoc(params, ServerDoc);
                    if (userID)
                        ServerDoc.user = userID;
                    if (ServerDoc.onCreate) {
                        await ServerDoc.onCreate(sdb);
                    }
                    break;
                case 'copy':
                    const copy = await std_lib_1.lib.doc.byId(req.query.copy, sdb);
                    if (!copy)
                        throw new Error(`base document ${req.query.copy} for copy is not found!`);
                    const copyDoc = await documents_factory_server_1.createDocumentServer(type, copy, sdb);
                    copyDoc.id = id;
                    copyDoc.date = ServerDoc.date;
                    copyDoc.code = '';
                    copyDoc.posted = false;
                    copyDoc.deleted = false;
                    copyDoc.timestamp = null;
                    copyDoc.parent = copyDoc.parent;
                    if (userID)
                        copyDoc.user = userID;
                    ServerDoc.map(copyDoc);
                    addIncomeParamsIntoDoc(params, ServerDoc);
                    ServerDoc.description = 'Copy: ' + ServerDoc.description;
                    if (ServerDoc.onCopy)
                        await ServerDoc.onCopy(sdb);
                    break;
                case 'base':
                    if (ServerDoc.baseOn)
                        await ServerDoc.baseOn(req.query.base, sdb);
                    if (userID)
                        ServerDoc.user = userID;
                    break;
                case 'history':
                    const history = await std_lib_1.lib.doc.historyById(req.query.history, sdb);
                    if (!history)
                        throw new Error(`history version of document ${req.query.history} is not found!`);
                    const histDoc = await documents_factory_server_1.createDocumentServer(type, history, sdb);
                    ServerDoc.map(histDoc);
                    addIncomeParamsIntoDoc(params, ServerDoc);
                    ServerDoc.description = 'History: ' + ServerDoc.description;
                    break;
                default:
                    break;
            }
            model = (await buildViewModel(ServerDoc, sdb));
        }
        const columnsDef = jetti_middle_1.buildColumnDef(ServerDoc.Props(), settings);
        const metadata = ServerDoc.Prop();
        if (params.operation)
            metadata['Operation'] = await std_lib_1.lib.doc.formControlRef(params.operation, sdb);
        else if (params.group)
            metadata['Group'] = await std_lib_1.lib.doc.formControlRef(params.group, sdb);
        const result = { schema: ServerDoc.Props(), model, columnsDef, metadata, settings };
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
// restore object from his history version
exports.router.get('/restore/:type/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const id = req.params.id;
        const type = req.params.type;
        const settings = new jetti_middle_1.FormListSettings();
        const history = await std_lib_1.lib.doc.historyById(id, sdb);
        const ServerDoc = await documents_factory_server_1.createDocumentServer(type, history, sdb);
        ServerDoc.timestamp = new Date();
        const model = (await buildViewModel(ServerDoc, sdb));
        const columnsDef = jetti_middle_1.buildColumnDef(ServerDoc.Props(), settings);
        const metadata = ServerDoc.Prop();
        const result = { schema: ServerDoc.Props(), model, columnsDef, metadata, settings };
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/view', viewAction);
// Delete or UnDelete document
exports.router.delete('/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            await std_lib_1.lib.util.adminMode(true, tx);
            try {
                const id = req.params.id;
                const doc = await std_lib_1.lib.doc.byId(id, tx);
                if (!doc)
                    throw new Error(`API - Delete: document with id '${id}' not found.`);
                const serverDoc = await documents_factory_server_1.createDocumentServer(doc.type, doc, tx);
                if (!doc.deleted) {
                    const beforeDelete = serverDoc['serverModule']['beforeDelete'];
                    if (typeof beforeDelete === 'function')
                        await beforeDelete(tx);
                    if (serverDoc.beforeDelete)
                        await serverDoc.beforeDelete(tx);
                }
                serverDoc.deleted = !!!serverDoc.deleted;
                serverDoc.posted = false;
                await tx.none(`UPDATE "Documents" SET deleted = @p3, posted = @p4, timestamp = GETDATE() WHERE id = @p1;
        ${serverDoc.isDoc ? `
          DELETE FROM "Register.Account" WHERE document = @p1;
          DELETE FROM "Register.Info" WHERE document = @p1;
          DELETE FROM "Accumulation" WHERE document = @p1;` : ''}
        `, [id, serverDoc.date, serverDoc.deleted, 0]);
                if (!doc.deleted) {
                    const afterDelete = serverDoc['serverModule']['afterDelete'];
                    if (typeof afterDelete === 'function')
                        await afterDelete(tx);
                    if (serverDoc && serverDoc.afterDelete)
                        await serverDoc.afterDelete(tx);
                }
                const view = await buildViewModel(serverDoc, tx);
                res.json(view);
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
exports.router.post('/save', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            await std_lib_1.lib.util.adminMode(true, tx);
            try {
                const doc = JSON.parse(JSON.stringify(req.body), jetti_middle_1.dateReviverUTC);
                if (!doc.code)
                    doc.code = await std_lib_1.lib.doc.docPrefix(doc.type, tx);
                const serverDoc = await documents_factory_server_1.createDocumentServer(doc.type, doc, tx);
                if (doc.ExchangeBase) {
                    serverDoc['ExchangeBase'] = doc.ExchangeBase;
                    serverDoc['ExchangeCode'] = doc.ExchangeCode;
                }
                if (serverDoc.timestamp) {
                    await post_1.updateDocument(serverDoc, tx);
                    if (serverDoc.posted && serverDoc.isDoc) {
                        await post_1.unpostDocument(serverDoc, tx);
                        await post_1.postDocument(serverDoc, tx);
                    }
                }
                else {
                    await post_1.insertDocument(serverDoc, tx);
                }
                res.json((await buildViewModel(serverDoc, tx)));
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
exports.router.post('/savepost', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            const doc = JSON.parse(JSON.stringify(req.body), jetti_middle_1.dateReviverUTC);
            if (doc && doc.deleted)
                throw new Error('Cant POST deleted document');
            doc.posted = true;
            await std_lib_1.lib.util.adminMode(true, tx);
            try {
                if (!doc.code)
                    doc.code = await std_lib_1.lib.doc.docPrefix(doc.type, tx);
                const serverDoc = await documents_factory_server_1.createDocumentServer(doc.type, doc, tx);
                await post_1.unpostDocument(serverDoc, tx);
                if (serverDoc.timestamp) {
                    await post_1.updateDocument(serverDoc, tx);
                }
                else {
                    await post_1.insertDocument(serverDoc, tx);
                }
                await post_1.postDocument(serverDoc, tx);
                res.json((await buildViewModel(serverDoc, tx)));
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
exports.router.post('/post', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            const doc = JSON.parse(JSON.stringify(req.body), jetti_middle_1.dateReviverUTC);
            if (doc && doc.deleted)
                throw new Error('Cant POST deleted document');
            doc.posted = true;
            await std_lib_1.lib.util.adminMode(true, tx);
            try {
                const serverDoc = await documents_factory_server_1.createDocumentServer(doc.type, doc, tx);
                await post_1.unpostDocument(serverDoc, tx);
                if (serverDoc.timestamp) {
                    await post_1.updateDocument(serverDoc, tx);
                }
                else {
                    await post_1.insertDocument(serverDoc, tx);
                }
                await post_1.postDocument(serverDoc, tx);
                res.json((await buildViewModel(serverDoc, tx)));
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
// Post by id (without returns posted object to client, for post in cicle many docs)
exports.router.get('/post/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            const { id, posted } = await std_lib_1.lib.doc.postById(req.params.id, tx);
            res.json({ id, posted });
        });
    }
    catch (err) {
        next(err);
    }
});
// unPost by id (without returns posted object to client, for post in cicle many docs)
exports.router.get('/unpost/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            const { id, posted } = await std_lib_1.lib.doc.unPostById(req.params.id, tx);
            res.json({ id, posted });
        });
    }
    catch (err) {
        next(err);
    }
});
// Get raw document by id
exports.router.get('/byId/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            const result = await std_lib_1.lib.doc.byId(req.params.id, tx);
            res.json(result);
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/getObjectPropertyById/:id/:valuePath', async (req, res, next) => {
    try {
        res.json(await std_lib_1.lib.util.getObjectPropertyById(req.params.id, req.params.valuePath, db_sessions_1.SDB(req)));
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/getDocMetaByType/:type', async (req, res, next) => {
    try {
        const doc = global_1.Global.configSchema().get(req.params.type).doc;
        res.json({ Prop: doc.Prop(), Props: doc.Props() });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/getIndexedOperationType/:operationId', async (req, res, next) => {
    try {
        const indexedType = indexedOperation_1.getIndexedOperationType(req.params.operationId);
        res.json(indexedType || 'Document.Operation');
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/getDocPropValuesByType', async (req, res, next) => {
    try {
        const { type, propNames } = req.body;
        let propValues = [];
        if (type) {
            const cs = global_1.Global.configSchema().get(type);
            if (cs && cs.Prop) {
                const prop = cs.Prop;
                propValues = propNames
                    .filter(propName => Object.keys(prop).find(existProp => existProp === propName))
                    .map(key => ({ propName: key, propValue: prop[key] }));
            }
        }
        res.json(propValues);
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/valueChanges/:type/:property', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            await std_lib_1.lib.util.adminMode(true, tx);
            try {
                const doc = JSON.parse(JSON.stringify(req.body.doc), jetti_middle_1.dateReviverUTC);
                const value = JSON.parse(JSON.stringify(req.body.value), jetti_middle_1.dateReviverUTC);
                const property = req.params.property;
                const type = req.params.type;
                doc[property] = typeof value === 'object' && value !== null ? value.id : value;
                const serverDoc = await documents_factory_server_1.createDocumentServer(type, doc, tx);
                const OnChange = serverDoc['serverModule'][property + '_OnChangeServer'] ||
                    serverDoc['serverModule'][property + '_onChangeServer'];
                if (typeof OnChange === 'function')
                    await OnChange(value);
                if (typeof serverDoc.onValueChanged === 'function') {
                    await serverDoc.onValueChanged(property, value, tx);
                }
                const result = {
                    metadata: serverDoc.Prop(),
                    schema: serverDoc.Props(),
                    model: (await buildViewModel(serverDoc, tx)),
                    columnsDef: [],
                    settings: new jetti_middle_1.FormListSettings(),
                };
                res.json(result);
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
exports.router.post('/command/:type/:command', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            await std_lib_1.lib.util.adminMode(true, tx);
            try {
                const doc = JSON.parse(JSON.stringify(req.body.doc), jetti_middle_1.dateReviverUTC);
                const command = req.params.command;
                const type = req.params.type;
                const args = req.params.args;
                const serverDoc = await documents_factory_server_1.createDocumentServer(type, doc, tx);
                const docModule = serverDoc['serverModule'][command];
                if (typeof docModule === 'function')
                    await docModule(args);
                if (serverDoc.onCommand)
                    await serverDoc.onCommand(command, args, tx);
                const result = {
                    metadata: serverDoc.Prop(),
                    schema: serverDoc.Props(),
                    model: (await buildViewModel(serverDoc, tx)),
                    columnsDef: [],
                    settings: new jetti_middle_1.FormListSettings(),
                };
                res.json(result);
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
exports.router.get('/ancestors/:id/:level', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        res.json(await std_lib_1.lib.doc.Ancestors(req.params.id, sdb, req.params.level));
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/descendants/:id/', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        res.json(await std_lib_1.lib.doc.Descendants(req.params.id, sdb));
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/haveDescendants/:id/', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        res.json(await std_lib_1.lib.doc.haveDescendants(req.params.id, sdb));
    }
    catch (err) {
        next(err);
    }
});
// Get history list by object id
exports.router.get('/getHistoryById/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            const query = `
      SELECT
        hist.id
        ,hist.posted
        ,hist.deleted
        ,hist.description
        ,hist.date
        ,hist.code
        ,hist.isfolder
        ,users.[description] as userName
        ,hist._timestamp as timestamp
        FROM [dbo].[Documents.Hisroty] hist
      LEFT JOIN [dbo].[Documents] users
        ON users.id = hist.[_user]
      WHERE _id = @p1
      ORDER BY [_timestamp] desc`;
            res.json(await tx.manyOrNone(query, [req.params.id]));
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/getDescedantsObjects/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            const ob = await std_lib_1.lib.doc.byId(req.params.id, tx);
            const isCatalog = jetti_middle_1.Type.isCatalog(ob.type);
            const firstLimit = isCatalog ? 20 : 0;
            const getQueryText = (DocSelectText) => `
      select
      res.id,
      res.type,
      res.date,
      res.code,
      res.description,
      res.posted,
      res.deleted,
      CAST(ISNULL(res.amount, 0) AS money) amount,
      ISNULL(res.info,'') info,
      ISNULL(us.[User],'') N'user',
      comp.Company company
  from
      (select
        id, type, date, code, description, posted, deleted, company as companyID, JSON_VALUE(doc, N'$.Amount') amount, JSON_VALUE(doc, N'$.info') info, [user] as userID
      from Documents
      where id in (${DocSelectText})) res
      left join [Catalog.User] us on us.id = userID
      left join [Catalog.Company] comp on comp.id = companyID
  order by res.date, res.type, res.description`;
            let queryDocSelectText = isCatalog ?
                `select distinct TOP ${firstLimit} document
      from Accumulation
      where contains(data, @p1)`
                :
                    ` select id
          from Documents
          where parent = @p1
      union
      select id
          from Documents
          where contains(doc, @p1)
      UNION
      SELECT parent
          from Documents
          WHERE id = @p1`;
            let resData = await tx.manyOrNone(getQueryText(queryDocSelectText), [req.params.id]);
            if (false && isCatalog && resData.length < firstLimit) {
                queryDocSelectText =
                    `select TOP ${firstLimit - resData.length} id
      from Documents
      where contains(doc, @p1)`;
                // queryDocSelectText
                // .replace('Accumulation', 'Documents')
                // .replace('data', 'doc')
                // .replace('' + firstLimit, (firstLimit - resData.length).toString());
                resData = [...resData, ...await tx.manyOrNone(getQueryText(queryDocSelectText), [req.params.id])];
            }
            res.json(resData);
        });
    }
    catch (err) {
        next(err);
    }
});
// Get formControlRef
exports.router.get('/formControlRef/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            res.json(await std_lib_1.lib.doc.formControlRef(req.params.id, tx));
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/startWorkFlow/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            const sourse = await std_lib_1.lib.doc.byId(req.params.id, tx);
            if (sourse) {
                if (!sourse.timestamp)
                    throw new Error('source document not saved');
                if (sourse['workflow'])
                    throw new Error('workflow exists');
                const serverDoc = await documents_factory_server_1.createDocumentServer('Document.WorkFlow', undefined, tx);
                await serverDoc.baseOn(sourse.id, tx);
                await post_1.insertDocument(serverDoc, tx);
                await post_1.postDocument(serverDoc, tx);
                res.json(serverDoc);
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/setApprovingStatus/:id/:Status', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            const sourse = await std_lib_1.lib.doc.byId(req.params.id, tx);
            if (sourse) {
                if (!sourse.timestamp)
                    throw new Error('source document not saved');
                sourse['Status'] = req.params.Status;
                const serverDoc = await documents_factory_server_1.createDocumentServer(sourse.type, sourse, tx);
                await post_1.unpostDocument(serverDoc, tx);
                if (serverDoc.timestamp) {
                    await post_1.updateDocument(serverDoc, tx);
                }
                else {
                    await post_1.insertDocument(serverDoc, tx);
                }
                await post_1.postDocument(serverDoc, tx);
                res.json((await buildViewModel(serverDoc, tx)));
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/createDocument/:type', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            const body = req.body;
            let flatDoc;
            let servDoc;
            const resOb = { id: '', code: '', error: '' };
            if (req.params.type !== 'Document.CashRequest')
                resOb.error = `Unsupported doc type: ${req.params.type}`;
            else {
                if (body.Id) {
                    flatDoc = await std_lib_1.lib.doc.byId(body.Id, tx);
                    if (!flatDoc)
                        resOb.error = `Cant find doc with id: ${body.Id}`;
                    else
                        servDoc = await std_lib_1.lib.doc.createDocServer(req.params.type, flatDoc, tx);
                }
                else
                    servDoc = await std_lib_1.lib.doc.createDocServer(req.params.type, undefined, tx);
                if (!resOb.error) {
                    await servDoc.FillByWebAPIBody(body, tx);
                    resOb.id = servDoc.id;
                    resOb.code = servDoc.code;
                    res.json(resOb);
                }
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/updateOperationTaxCheck', async (req, res, next) => {
    try {
        res.json(await x100_lib_1.x100.util.updateOperationTaxCheck(req.body));
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/attachments/del', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            res.json(await std_lib_1.lib.util.delAttachments(req.body, tx));
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/attachments/add', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            res.json(await std_lib_1.lib.util.addAttachments(req.body, tx));
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/attachments/getByOwner/:id/:withDeleted', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            res.json(await std_lib_1.lib.util.getAttachmentsByOwner(req.params.id, req.params.withDeleted === 'true', tx));
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/attachments/getAttachmentStorageById/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            res.json(await std_lib_1.lib.util.getAttachmentStorageById(req.params.id, tx));
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/attachments/getAttachmentsSettingsByOwner/:id', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            res.json(await std_lib_1.lib.util.getAttachmentsSettingsByOwner(req.params.id, tx));
        });
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/documentsDataAsJSON', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        await sdb.tx(async (tx) => {
            const docIDs = req.body.map(el => '\'' + el + '\'').join(',');
            const query = `SELECT * FROM Documents WHERE id IN(${docIDs})`;
            res.json(JSON.stringify(await tx.manyOrNone(query)));
        });
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=documents.js.map