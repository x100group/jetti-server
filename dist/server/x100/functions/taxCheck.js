"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOperationTaxCheck = exports.getTaxCheckFromURL = exports.saveTaxCheckAsAttachment = exports.findTaxCheckAttachmentsByOperationId = exports.findTaxCheckInRegisterInfo = exports.AttachmentType_apiHost = exports.AttachmentType_taxCheck = void 0;
const mssql_1 = require("./../../mssql");
const std_lib_1 = require("../../std.lib");
const sql_pool_jetti_1 = require("../../sql.pool.jetti");
const axios_1 = require("axios");
const https_1 = require("https");
const moment = require("moment");
exports.AttachmentType_taxCheck = '97B25D60-D171-11EA-8F9B-B93FB2CAD87D';
exports.AttachmentType_apiHost = 'https://lknpd.nalog.ru/api/v1/receipt';
async function findTaxCheckInRegisterInfo(taxCheck, tx) {
    const countTextTax = `
    USE sm
    SELECT COUNT(*) FROM [dbo].[Register.Info.TaxCheck]  where receiptId='' and inn=@p1
    `;
    const OperationCounterTax = await tx.oneOrNone(countTextTax, [
        taxCheck.inn
    ]);
    const queryText = `
    SELECT *
    FROM [dbo].[Register.Info.TaxCheck]
    WHERE clientInn = @p1
        and inn = @p2
        and totalAmount = cast(@p3 as money)
        and [date] <= @p5
        and receiptId=''
        ${taxCheck.operationId ? 'and [document] = @p4' : ''}`;
    return await tx.oneOrNone(queryText, [
        taxCheck.clientInn,
        taxCheck.inn,
        taxCheck.totalAmount.toString(),
        taxCheck.operationId,
        taxCheck.operationTime
    ]);
}
exports.findTaxCheckInRegisterInfo = findTaxCheckInRegisterInfo;
async function findTaxCheckAttachmentsByOperationId(operId, tx) {
    const attach = await std_lib_1.lib.util.getAttachmentsByOwner(operId, false, tx);
    return attach ? attach.filter(a => a.AttachmentType === exports.AttachmentType_taxCheck) : [];
}
exports.findTaxCheckAttachmentsByOperationId = findTaxCheckAttachmentsByOperationId;
async function saveTaxCheckAsAttachment(taxCheck, tx, attachmentId = '') {
    if (taxCheck.operationTime)
        taxCheck.operationTime = new Date(taxCheck.operationTime.toString());
    let attachment;
    if (attachmentId) {
        attachment = await std_lib_1.lib.doc.createDocServerById(attachmentId, tx);
    }
    else {
        if (taxCheck.operationId) {
            const attID = await findTaxCheckAttachmentsByOperationId(taxCheck.operationId, tx);
            if (attID.length)
                return saveTaxCheckAsAttachment(taxCheck, tx, attID[0].id);
        }
        attachment = await std_lib_1.lib.doc.createDoc('Catalog.Attachment');
    }
    attachment.description = getTaxCheckDescription(taxCheck);
    attachment.Storage = getTaxCheckURL(taxCheck);
    attachment.AttachmentType = exports.AttachmentType_taxCheck;
    attachment.owner = taxCheck.operationId;
    attachment.deleted = false;
    attachment.posted = true;
    const res = await std_lib_1.lib.util.addAttachments([attachment], tx);
    return res[0];
}
exports.saveTaxCheckAsAttachment = saveTaxCheckAsAttachment;
async function getTaxCheckFromURL(taxCheckURL) {
    // https://lknpd.nalog.ru/api/v1/receipt/598100160853/2001vsj3lh/json
    const host = taxCheckURL.replace('print', '');
    const instance = axios_1.default.create({ baseURL: host });
    const tcResp = await instance.get('json', { httpsAgent: new https_1.Agent({ rejectUnauthorized: false }) });
    if (tcResp.status !== 200)
        throw new Error(tcResp.statusText);
    return tcResp.data;
}
exports.getTaxCheckFromURL = getTaxCheckFromURL;
async function updateOperationTaxCheck(taxCheck) {
    const countTextTax = `
    USE sm
    SELECT COUNT(*) FROM [dbo].[Register.Info.TaxCheck]  where receiptId='' and inn=@p1`;
    if (taxCheck.operationTime && typeof taxCheck.operationTime === 'string')
        taxCheck.operationTime = new Date(taxCheck.operationTime);
    const tx = new mssql_1.MSSQL(sql_pool_jetti_1.JETTI_POOL);
    const result = { status: 'created', operationId: null, info: null };
    const tc = await findTaxCheckInRegisterInfo(taxCheck, tx);
    const OperationCounterTax = await tx.oneOrNone(countTextTax, [
        taxCheck.inn
    ]);
    let counter;
    const counterValue = OperationCounterTax[''];
    const computedValue = counterValue - 1;
    if (computedValue <= 0) {
        counter = 'У вас нет задолжностей по чекам.';
    }
    else {
        counter = `Количество не отправленных чеков: ${computedValue}`;
    }
    if (!tc) {
        result.status = 'error';
        result.info =
            `Не найден документ операции по реквизитам: ИНН плательщика ${taxCheck.inn}, ИНН получателя ${taxCheck.clientInn} на сумму ${taxCheck.totalAmount} ранне ${moment(taxCheck.operationTime).locale('ru').format('LLL')}!`;
        return result;
    }
    result.operationId = tc.document;
    if (tc.receiptId) {
        if (tc.receiptId !== taxCheck.receiptId) {
            result.status = 'updated';
            result.info = `Привязан к ${await std_lib_1.lib.util.getObjectPropertyById(tc.document, 'description', tx)}' вместо чека №${tc.receiptId}`;
            result.counter = counter;
        }
        else if (tc.totalAmount === taxCheck.totalAmount) {
            result.status = 'exist';
            result.info = `Запись существует. Чек отражен документом ${await std_lib_1.lib.util.getObjectPropertyById(tc.document, 'description', tx)}`;
            result.counter = counter;
            return result;
        }
    }
    const doc = await std_lib_1.lib.doc.createDocServerById(tc.document, tx);
    if (!doc) {
        result.status = 'error';
        result.info = `Отсутстует документ с ID ${tc.document}`;
        return result;
    }
    doc['receiptId'] = taxCheck.receiptId;
    doc['operationTime'] = taxCheck.operationTime;
    taxCheck.operationId = doc.id;
    try {
        if (result.status === 'updated' || result.status === 'created') {
            await saveTaxCheckAsAttachment(taxCheck, tx);
        }
        await std_lib_1.lib.doc.updateDoc(doc, tx);
        await std_lib_1.lib.doc.unPostById(doc.id, tx);
        await std_lib_1.lib.doc.postById(doc.id, tx);
    }
    catch (error) {
        result.status = 'error';
        result.info = `Ошибка при проведении документа ${doc.description}: \n ${error.message || ''}`;
        return result;
    }
    result.info = `Чек отражен документом ${await std_lib_1.lib.util.getObjectPropertyById(tc.document, 'description', tx)}`;
    result.counter = counter;
    return result;
}
exports.updateOperationTaxCheck = updateOperationTaxCheck;
function getTaxCheckDescription(taxCheck) {
    return `Чек ${taxCheck.receiptId} (${taxCheck.inn} => ${taxCheck.clientInn}) от ${std_lib_1.lib.util.formatDate(taxCheck.operationTime)} на сумму ${taxCheck.totalAmount}`;
}
function getTaxCheckURL(taxCheck, urlType = 'print' || 'json') {
    if (taxCheck.URL)
        return taxCheck.URL;
    return `${exports.AttachmentType_apiHost}/${taxCheck.inn}/${taxCheck.receiptId}/${urlType}`;
}
//# sourceMappingURL=taxCheck.js.map