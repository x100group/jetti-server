"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMenu = exports.getUser = exports.router = void 0;
const environment_1 = require("./../env/environment");
const UsersPermissions_1 = require("./../fuctions/UsersPermissions");
const express = require("express");
const axios_1 = require("axios");
const jwt = require("jsonwebtoken");
const environment_2 = require("../env/environment");
const check_auth_1 = require("./middleware/check-auth");
const mssql_1 = require("../mssql");
const sql_pool_jetti_1 = require("../sql.pool.jetti");
const std_lib_1 = require("../std.lib");
const documents_factory_1 = require("../models/documents.factory");
const form_factory_1 = require("../models/Forms/form.factory");
exports.router = express.Router();
function getUserEnviroment(user) {
    return {
        id: user.id, code: user.code, type: user.type, value: user.description,
        LOGIC_USECASHREQUESTAPPROVING: environment_1.LOGIC_USECASHREQUESTAPPROVING
    };
}
const sdba = new mssql_1.MSSQL(sql_pool_jetti_1.JETTI_POOL, { email: 'service@service.com', isAdmin: true, description: 'service account', env: {}, roles: [] });
async function getUser(email) {
    let user = null;
    const userID = await std_lib_1.lib.doc.byCode('Catalog.User', email, sdba);
    if (userID)
        user = await std_lib_1.lib.doc.byIdT(userID, sdba);
    return user;
}
exports.getUser = getUser;
exports.router.post('/login', async (req, res, next) => {
    try {
        const instance = axios_1.default.create({ baseURL: 'https://graph.microsoft.com' });
        instance.defaults.headers.common['Authorization'] = `Bearer ${req.body.token}`;
        const me = (await instance.get('/v1.0/me/')).data;
        const mail = req.body.email;
        const user = await getUser(mail);
        if (!user) {
            return res.status(401).json({ message: 'Auth failed' });
        }
        let photoArraybuffer;
        let photo;
        try {
            photoArraybuffer = (await instance.get('/v1.0/me/photos/48x48/$value', { responseType: 'arraybuffer' })).data;
            photo = Buffer.from(photoArraybuffer, 'binary').toString('base64');
        }
        catch (_a) { }
        const payload = {
            email: me.userPrincipalName,
            description: me.displayName,
            isAdmin: user.isAdmin === true ? true : false,
            roles: await UsersPermissions_1.getUserRoles(user),
            env: getUserEnviroment(user),
        };
        const token = jwt.sign(payload, environment_2.JTW_KEY, { expiresIn: '72h' });
        return res.json({ account: payload, token, photo });
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/account', check_auth_1.authHTTP, async (req, res, next) => {
    try {
        const user = await getUser(req.user.email);
        if (!user) {
            return res.status(401).json({ message: 'Auth failed' });
        }
        const payload = {
            email: user.code,
            description: user.description,
            isAdmin: user.isAdmin === true ? true : false,
            roles: await UsersPermissions_1.getUserRoles(user),
            env: getUserEnviroment(user),
        };
        res.json(payload);
    }
    catch (err) {
        next(err);
    }
});
exports.router.post('/refresh', check_auth_1.authHTTP, async (req, res, next) => {
    try {
        const payload = req.user;
        const user = await getUser(payload.email);
        if (!user) {
            return res.status(401).json({ message: 'Auth failed' });
        }
        const new_payload = {
            email: user.id,
            description: user.description,
            isAdmin: user.isAdmin === true ? true : false,
            roles: await UsersPermissions_1.getUserRoles(user),
            env: { id: user.id, code: user.code, type: user.type, value: user.description },
        };
        const token = jwt.sign(new_payload, environment_2.JTW_KEY, { expiresIn: '72h' });
        return res.json({ account: user, token });
    }
    catch (err) {
        next(err);
    }
});
const RolesQuery = `
  DROP TABLE IF EXISTS #UserOrGroup;
  SELECT @p1 id INTO #UserOrGroup
  UNION ALL
  SELECT id FROM Documents
  CROSS APPLY OPENJSON (doc, N'$.Users')
  WITH
  (
    [UsersGroup.User] UNIQUEIDENTIFIER N'$.User'
  ) AS Users
  WHERE (1=1) AND
    type = 'Catalog.UsersGroup' AND
    [UsersGroup.User] = @p1;

  DROP TABLE IF EXISTS #Roles;
  SELECT [Role] INTO #Roles FROM Documents
  CROSS APPLY OPENJSON (doc, N'$.RoleList')
  WITH
  (
    [Role] UNIQUEIDENTIFIER N'$.Role'
  ) AS Roles
  INNER JOIN #UserOrGroup ON #UserOrGroup.id = CAST(JSON_VALUE(doc, N'$.UserOrGroup') AS UNIQUEIDENTIFIER)
  WHERE (1=1) AND
  posted = 1 AND
  type = 'Document.UserSettings';

  DROP TABLE IF EXISTS #Subsystems;
  SELECT SubSystem INTO #Subsystems FROM Documents r
  CROSS APPLY OPENJSON (doc, N'$.Subsystems')
  WITH
  (
    SubSystem  UNIQUEIDENTIFIER N'$.SubSystem'
  ) AS Subsystems
  WHERE (1=1) AND
    type = 'Catalog.Role' AND
    id IN (SELECT [Role] FROM #Roles);

  SELECT * FROM Documents r
  WHERE (1=1) AND
    type = 'Catalog.SubSystem' AND posted = 1 AND
  (id IN (SELECT SubSystem FROM #Subsystems) OR @p2 = 1)
  ORDER BY code;
`;
exports.router.get('/subsystems', check_auth_1.authHTTP, async (req, res, next) => {
    try {
        const payload = req.user;
        const existing = await getUser(payload.email);
        if (!existing) {
            return res.status(401).json({ message: 'Auth failed' });
        }
        const SubSystemsRaw = await sdba.manyOrNone(RolesQuery, [existing.id, existing.isAdmin]);
        const result = SubSystemsRaw.map(s => std_lib_1.lib.doc.flatDocument(s));
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.router.get('/subsystems/menu', check_auth_1.authHTTP, async (req, res, next) => {
    try {
        const payload = req.user;
        const existing = await getUser(payload.email);
        if (!existing) {
            return [];
        }
        const result = await buildMenu(existing);
        res.json(result || []);
    }
    catch (err) {
        next(err);
    }
});
async function buildMenu(user) {
    const SubSystemsRaw = await sdba.manyOrNone(RolesQuery, [user.id, user.isAdmin]);
    const sub = SubSystemsRaw.map(async (s) => {
        const flat = std_lib_1.lib.doc.flatDocument(s);
        const SubSystem = documents_factory_1.createDocument('Catalog.SubSystem', flat);
        return {
            type: SubSystem.type,
            icon: SubSystem.icon,
            label: SubSystem.description,
            items: await Promise.all([
                ...SubSystem.Documents.map(async (el) => {
                    const Group = await std_lib_1.lib.doc.byIdT(el.Group, sdba);
                    if (Group) {
                        return {
                            type: el.Document,
                            icon: Group.icon,
                            routerLink: [`/${el.Document}/group/${Group.id}`], label: Group.menu
                        };
                    }
                    else {
                        const prop = documents_factory_1.createDocument(el.Document).Prop();
                        return { type: prop.type, icon: prop.icon, routerLink: ['/' + prop.type], label: prop.menu };
                    }
                }),
                ...SubSystem.Catalogs.map(async (el) => {
                    const prop = documents_factory_1.createDocument(el.Catalog).Prop();
                    return { type: prop.type, icon: prop.icon, routerLink: ['/' + prop.type], label: prop.menu };
                }),
                ...SubSystem.Forms.filter(el => el.Form).map(async (el) => {
                    const prop = form_factory_1.createForm({ type: el.Form }).Prop();
                    return { type: prop.type, icon: prop.icon, routerLink: ['/' + prop.type], label: prop.menu };
                }),
            ])
        };
    });
    const subs = await Promise.all(sub);
    return subs;
}
exports.buildMenu = buildMenu;
//# sourceMappingURL=auth.js.map