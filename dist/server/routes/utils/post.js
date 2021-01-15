"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMode = exports.setPostedSate = exports.updateDocument = exports.insertDocument = exports.unpostDocument = exports.postDocument = void 0;
const std_lib_1 = require("../../std.lib");
const InsertRegistersIntoDB_1 = require("./InsertRegistersIntoDB");
const documents_factory_server_1 = require("../../models/documents.factory.server");
const jetti_middle_1 = require("jetti-middle");
async function postDocument(serverDoc, tx) {
    const beforePost = serverDoc['serverModule']['beforePost'];
    if (typeof beforePost === 'function')
        await beforePost(tx);
    if (serverDoc.beforePost)
        await serverDoc.beforePost(tx);
    if (serverDoc.isDoc && serverDoc.onPost) {
        const Registers = await serverDoc.onPost(tx);
        await InsertRegistersIntoDB_1.InsertRegistersIntoDB(serverDoc, Registers, tx);
    }
    const afterPost = serverDoc['serverModule']['afterPost'];
    if (typeof afterPost === 'function')
        await afterPost(tx);
    if (serverDoc.afterPost)
        await serverDoc.afterPost(tx);
}
exports.postDocument = postDocument;
async function unpostDocument(serverDoc, tx) {
    const onUnPost = serverDoc['serverModule']['onUnPost'];
    if (typeof onUnPost === 'function')
        await onUnPost(tx);
    if (serverDoc.onUnPost)
        await serverDoc.onUnPost(tx);
    await tx.none(`
    DELETE FROM "Register.Info" WHERE document = @p1;
    DELETE FROM "Register.Account" WHERE document = @p1;
    DELETE FROM "Accumulation" WHERE document = @p1;
  `, [serverDoc.id, serverDoc.date]);
}
exports.unpostDocument = unpostDocument;
async function insertDocument(serverDoc, tx, opts) {
    await beforeSaveDocument(serverDoc, tx);
    const noSqlDocument = std_lib_1.lib.doc.noSqlDocument(serverDoc);
    const jsonDoc = JSON.stringify(noSqlDocument);
    const withExchangeInfo = (opts && opts.withExchangeInfo) || serverDoc['ExchangeBase'];
    let response;
    response = await tx.oneOrNone(`
    INSERT INTO Documents(
      [id], [type], [date], [code], [description], [posted], [deleted],
      [parent], [isfolder], [company], [user], [info], [doc] ${withExchangeInfo ? ', [ExchangeCode], [ExchangeBase]' : ''})
    SELECT
      [id], [type], [date], [code], [description], [posted], [deleted],
      [parent], [isfolder], [company], [user], [info], [doc]
      ${withExchangeInfo ? ', [ExchangeCode], [ExchangeBase]' : ''}
    FROM OPENJSON(@p1) WITH (
      [id] UNIQUEIDENTIFIER,
      [date] DATETIME,
      [type] NVARCHAR(100),
      [code] NVARCHAR(36),
      [description] NVARCHAR(150),
      [posted] BIT,
      [deleted] BIT,
      [parent] UNIQUEIDENTIFIER,
      [isfolder] BIT,
      [company] UNIQUEIDENTIFIER,
      [user] UNIQUEIDENTIFIER,
      [info] NVARCHAR(max),
      [doc] NVARCHAR(max) N'$.doc' AS JSON
      ${withExchangeInfo ? `
      ,[ExchangeCode] NVARCHAR(50),
      [ExchangeBase] NVARCHAR(50)` : ''}
    );
    SELECT * FROM Documents WHERE id = @p2`, [jsonDoc, serverDoc.id]);
    await afterSaveDocument(serverDoc, tx);
    serverDoc.map(response);
    return serverDoc;
}
exports.insertDocument = insertDocument;
async function updateDocument(serverDoc, tx, opts) {
    await beforeSaveDocument(serverDoc, tx);
    const noSqlDocument = std_lib_1.lib.doc.noSqlDocument(serverDoc);
    const jsonDoc = JSON.stringify(noSqlDocument);
    const withExchangeInfo = (opts && opts.withExchangeInfo) || serverDoc['ExchangeBase'];
    let response;
    response = await tx.oneOrNone(`
    UPDATE Documents
      SET
        type = i.type, parent = i.parent,
        date = i.date, code = i.code, description = i.description,
        posted = i.posted, deleted = i.deleted, isfolder = i.isfolder,
        "user" = i."user", company = i.company, info = i.info, timestamp = GETDATE(),
        ${withExchangeInfo ? 'ExchangeCode = i.ExchangeCode,  ExchangeBase = i.ExchangeBase,' : ''} doc = i.doc
      FROM (
        SELECT *
        FROM OPENJSON(@p1) WITH (
          [id] UNIQUEIDENTIFIER,
          [date] DATETIME,
          [type] NVARCHAR(100),
          [code] NVARCHAR(36),
          [description] NVARCHAR(150),
          [posted] BIT,
          [deleted] BIT,
          [isfolder] BIT,
          [company] UNIQUEIDENTIFIER,
          [user] UNIQUEIDENTIFIER,
          [info] NVARCHAR(max),
          [parent] UNIQUEIDENTIFIER,
          ${withExchangeInfo ? `
          [ExchangeCode] NVARCHAR(50),
          [ExchangeBase] NVARCHAR(50),` : ''}
          [doc] NVARCHAR(max) N'$.doc' AS JSON
        )
      ) i
    WHERE Documents.id = i.id;
    SELECT * FROM Documents WHERE id = @p2`, [jsonDoc, serverDoc.id]);
    await afterSaveDocument(serverDoc, tx);
    serverDoc.map(response);
    return serverDoc;
}
exports.updateDocument = updateDocument;
async function setPostedSate(id, tx) {
    const doc = await tx.oneOrNone(`
    UPDATE Documents SET posted = 1 WHERE id = @p1 and deleted = @p2 and posted = @p3;
    SELECT * FROM Documents WHERE id = @p1`, [id, 0, 0]);
    const flatDoc = std_lib_1.lib.doc.flatDocument(doc);
    const serverDoc = documents_factory_server_1.createDocumentServer(flatDoc.type, flatDoc, tx);
    return serverDoc;
}
exports.setPostedSate = setPostedSate;
async function adminMode(mode, tx) {
    await tx.none(`EXEC sys.sp_set_session_context N'postMode', N'${mode}';`);
}
exports.adminMode = adminMode;
async function beforeSaveDocument(serverDoc, tx) {
    if (!tx.user.disableChecks) {
        await checkDocumentUnique(serverDoc, tx);
        await checkProtectedPropsModify(serverDoc, tx);
    }
    const beforeSave = serverDoc['serverModule']['beforeSave'];
    if (typeof beforeSave === 'function')
        await beforeSave(tx);
    if (serverDoc.beforeSave)
        await serverDoc.beforeSave(tx);
    serverDoc.timestamp = new Date();
}
async function afterSaveDocument(serverDoc, tx) {
    const afterSave = serverDoc['serverModule']['afterSave'];
    if (typeof afterSave === 'function')
        await afterSave(tx);
    if (serverDoc.afterSave)
        await serverDoc.afterSave(tx);
}
async function checkDocumentUnique(serverDoc, tx) {
    if (!serverDoc.isCatalog)
        return;
    const uniqueProps = serverDoc.getPropsWithOption('isUnique', true);
    const propsKeys = Object.keys(uniqueProps);
    if (!propsKeys.length)
        return;
    const propFilter = {};
    propsKeys.forEach(e => propFilter[e] = serverDoc[e]);
    const cat = await std_lib_1.lib.doc.findDocumentByProps(serverDoc.type, propFilter, tx, { matching: 'OR', selectedFields: [...propsKeys, 'description, id'].join(',') });
    const exist = cat.filter(e => e.id !== serverDoc.id);
    if (!exist.length)
        return;
    const getValueDescription = async (type, value) => {
        if (!value)
            return `<empty>`;
        if (!jetti_middle_1.Type.isRefType(type))
            return value;
        return (await std_lib_1.lib.doc.byId(value, tx)).description;
    };
    const existErrors = [];
    for (const propKey of propsKeys) {
        const descriptions = exist
            .filter(e => e[propKey] === serverDoc[propKey])
            .map(e => e.description)
            .join('\n');
        if (descriptions)
            existErrors.push(`field "${uniqueProps[propKey].label || propKey}" value
     "${await getValueDescription(uniqueProps[propKey].type, serverDoc[propKey])}" alredy exists:
     ${descriptions}`);
    }
    throw new Error(`"${serverDoc.description}" non unique by\n${existErrors.join('\n')}`);
}
async function checkProtectedPropsModify(serverDoc, tx) {
    if (!serverDoc.isCatalog || !serverDoc.timestamp || tx.isRoleAvailableModifyProtected())
        return;
    const protectedProps = serverDoc.getPropsWithOption('isProtected', true);
    if (!Object.keys(protectedProps).length)
        return;
    const savedDoc = await std_lib_1.lib.doc.byId(serverDoc.id, tx);
    if (!savedDoc)
        return;
    const modProps = Object.keys(protectedProps)
        .filter(key => serverDoc[key] !== savedDoc[key])
        .map(key => key);
    for (const modProp of modProps) {
        if (savedDoc[modProp] && await std_lib_1.lib.doc.isDocumentUsedInAccumulationWithPropValueById(serverDoc.id, tx))
            throw new Error(`"${serverDoc.description}" can't be changed by protected field "${protectedProps[modProp].label || modProp}":\n used in accumulation/info movements"`);
    }
}
//# sourceMappingURL=post.js.map