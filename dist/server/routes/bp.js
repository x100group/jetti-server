"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProcess = exports.router = void 0;
// tslint:disable: max-line-length
const express = require("express");
const db_sessions_1 = require("./middleware/db-sessions");
const user_settings_1 = require("./user.settings");
const axios_1 = require("axios");
const environment_1 = require("../env/environment");
const std_lib_1 = require("../std.lib");
exports.router = express.Router();
async function DeleteProcess(processID) {
    if (!processID)
        return;
    const instance = axios_1.default.create({ baseURL: environment_1.bpApiHost });
    const query = `/Processes/pwd/DeleteProcess/CashApplication?ProcessID=${processID}`;
    await instance.get(query);
}
exports.DeleteProcess = DeleteProcess;
exports.router.get('/BP/GetUserTasksByMail', async (req, res, next) => {
    try {
        const email = user_settings_1.User(req).email;
        const instance = axios_1.default.create({ baseURL: environment_1.bpApiHost });
        const query = `/Query/pwd/GetUserTasksByMail?UserMail=${email}&CountOfCompleted=${req.query.CountOfCompleted}`;
        return res.json((await instance.get(query)).data);
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/BP/CompleteTask', async (req, res, next) => {
    try {
        const instance = axios_1.default.create({ baseURL: environment_1.bpApiHost });
        const query = `/Tasks/pwd/CompleteTask`;
        req.body.UserID = user_settings_1.User(req).email;
        return res.json((await instance.post(query, req.body)).data);
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/BP/GetUsersByProcessID', async (req, res, next) => {
    try {
        const instance = axios_1.default.create({ baseURL: environment_1.bpApiHost });
        const query = `/Processes/pwd/GetUsersByProcessID/CashApplication?ProcessID=${req.query.ProcessID}`;
        return res.json((await instance.get(query)).data);
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/BP/GetMapByProcessID', async (req, res, next) => {
    try {
        const instance = axios_1.default.create({ baseURL: environment_1.bpApiHost });
        const query = `/Processes/pwd/GetMapByProcessID/CashApplication?ProcessID=${req.query.ProcessID}`;
        return (await instance.get(query)).data;
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/BP/isUserCurrentExecutant', async (req, res, next) => {
    try {
        const instance = axios_1.default.create({ baseURL: environment_1.bpApiHost });
        const query = `/Processes/pwd/isUserCurrentExecutant/CashApplication?UserMail=${user_settings_1.User(req).email}&ProcessID=${req.query.ProcessID}`;
        return res.json((await instance.get(query)).data);
    }
    catch (err) {
        if (err.response)
            return res.json(err.response.data);
        next(err);
    }
});
// StartProcess/CashApplication?AuthorID=dbez@outlook.com&DocumentID=049fe234-7b46-4b7e-b414-9dee0a8cd4da&SubdivisionID=959680e5-1523-11ea-ae46-d8e1ce3b07c9&Sum=100000&ItemID=1942b9df-1524-11ea-ae46-d8e1ce3b07c9
exports.router.post('/BP/StartProcess', async (req, res, next) => {
    try {
        const { OperationTypeID, DocumentID } = req.body;
        if (OperationTypeID === 'Выплата заработной платы без ведомости' && DocumentID) {
            const tx = db_sessions_1.SDB(req);
            const servDoc = await std_lib_1.lib.doc.createDocServerById(DocumentID, tx);
            const err = await servDoc['checkTaxCheck'](tx);
            if (err)
                return res.json({ error: true, message: err });
        }
        const instance = axios_1.default.create({ baseURL: environment_1.bpApiHost });
        const query = `/Processes/pwd/StartProcess/CashApplication`;
        return res.json((await instance.post(query, req.body)).data);
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/BP/ModifyProcess', async (req, res, next) => {
    try {
        const instance = axios_1.default.create({ baseURL: environment_1.bpApiHost });
        const query = `/Processes/pwd/ModifyProcess/CashApplication`;
        return res.json((await instance.post(query, req.body)).data);
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/CashRequestDesktop', async (req, res, next) => {
    try {
        const sdb = db_sessions_1.SDB(req);
        const query = `SELECT r.*,
    Company.Company [company_name],
    CashRequest.description [CashRequest_name],
    [CashOrBank].description [CashOrBank_name],
    [CashRecipient].description [CashRecipient_name],
    [currency].description [currency_name],
    'false' [Selected]
    FROM
    (select  [company], [CashRequest],[CashOrBank], [CashRecipient], [currency],
    -SUM(Amount) [Amount],
    -SUM(Amount) [AmountToPay]
    FROM [dbo].[Register.Accumulation.CashToPay] r -- WITH (NOEXPAND)
    GROUP BY [company], [CashRequest],[CashOrBank], [CashRecipient], [currency]
    HAVING SUM(Amount) < 0) r
    LEFT JOIN [Catalog.Company] Company ON Company.id =r.[company]
    LEFT JOIN Documents CashRequest ON CashRequest.id =r.[CashRequest]
    LEFT JOIN Documents [CashOrBank] ON [CashOrBank].id =r.[CashOrBank]
    LEFT JOIN Documents [CashRecipient] ON [CashRecipient].id =r.[CashRecipient]
    LEFT JOIN Documents [currency] ON [currency].id =r.[currency]`;
        const result = await sdb.manyOrNone(query);
        return res.json(result);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=bp.js.map