"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRoles = exports.getUserPermissions = exports.UserPermissions = void 0;
const mssql_1 = require("../mssql");
const sql_pool_jetti_1 = require("../sql.pool.jetti");
const sdba = new mssql_1.MSSQL(sql_pool_jetti_1.JETTI_POOL, { email: 'service@service.com', isAdmin: true, description: 'service account', env: {}, roles: [] });
class UserPermissions {
}
exports.UserPermissions = UserPermissions;
class UserPermissionsRow {
}
exports.getUserPermissions = async (user) => {
    const result = new UserPermissions;
    // const userId = await lib.doc.byCode('Catalog.User', (tx.user.email as string).substring(0, 36), tx);
    // if (!userId) throw new Error('Unknow user: ' + tx.user.email);
    // const user = await lib.doc.byIdT<CatalogUser>(userId as any, tx);
    // if (!user) throw new Error('Unknow user: ' + tx.user.email);
    result.User = user;
    const PermissionsData = await sdba.manyOrNone(PermissionsQuery, [result.User.id, result.User.isAdmin]);
    result.Subsystems = PermissionsData.filter(e => e.kind === 'Subsystem').map(k => ({ id: k.id, description: k.description }));
    result.UserGroups = PermissionsData.filter(e => e.kind === 'UserOrGroup' && e.id !== user.id).map(k => k.id);
    result.Roles = PermissionsData.filter(e => e.kind === 'Role').map(k => k.description);
    result.Documents = PermissionsData.filter(e => e.kind === 'Document').map(k => ({ DocType: k.DocType, read: !!k.read, write: !!k.write }));
    result.Catalogs = PermissionsData.filter(e => e.kind === 'Catalog').map(k => ({ DocType: k.DocType, read: !!k.read, write: !!k.write }));
    return result;
};
exports.getUserRoles = async (user) => {
    return (await exports.getUserPermissions(user)).Roles;
};
const PermissionsQuery = `
DROP TABLE IF EXISTS #UserOrGroup;
SELECT @p1 id
INTO #UserOrGroup
UNION ALL
SELECT id
FROM Documents
CROSS APPLY OPENJSON (doc, N'$.Users')
WITH
(
[UsersGroup.User] UNIQUEIDENTIFIER N'$.User'
) AS Users
WHERE (1=1) AND
    type = 'Catalog.UsersGroup' AND
    [UsersGroup.User] = @p1;
DROP TABLE IF EXISTS #Roles1;
SELECT [Role]
INTO #Roles1
FROM Documents
CROSS APPLY OPENJSON (doc, N'$.RoleList')
WITH
(
[Role] UNIQUEIDENTIFIER N'$.Role'
) AS Roles
INNER JOIN #UserOrGroup ON #UserOrGroup.id = CAST(JSON_VALUE(doc, N'$.UserOrGroup') AS UNIQUEIDENTIFIER)
WHERE (1=1) AND
posted = 1 AND
type = 'Document.UserSettings';
DROP TABLE IF EXISTS #Subsystems1;
SELECT SubSystem, [read] N'read'
INTO #Subsystems1
FROM Documents r
CROSS APPLY OPENJSON (doc, N'$.Subsystems')
WITH
(
SubSystem  UNIQUEIDENTIFIER N'$.SubSystem',
[read]  BIT N'$.read'
) AS Subsystems
WHERE (1=1) AND
type = 'Catalog.Role' AND
id IN (SELECT [Role]
FROM #Roles1);
DROP TABLE IF EXISTS #Subsystems;
SELECT r.id, r.description
INTO #Subsystems
FROM Documents r
WHERE (1=1) AND
type = 'Catalog.SubSystem' AND posted = 1 AND
(id IN (SELECT SubSystem
FROM #Subsystems1) OR @p2 = 1)
ORDER BY code;
DROP TABLE IF EXISTS #Roles;
SELECT r.id [Role], r.description
INTO #Roles
FROM Documents r
WHERE (1=1) AND
type = 'Catalog.Role' AND posted = 1 AND
id IN (SELECT [Role]
FROM #Roles1);
DROP TABLE IF EXISTS #Documents;
SELECT Document DocType, [read] N'read', [write] N'write'
INTO #Documents
FROM Documents r
CROSS APPLY OPENJSON (doc, N'$.Documents')
WITH
(
Document  VARCHAR(MAX) N'$.Document',
[read]  BIT N'$.read',
[write]  BIT N'$.write'
) AS Document
WHERE (1=1) AND
type = 'Catalog.Role' AND
id IN (SELECT [Role]
FROM #Roles);

DROP TABLE IF EXISTS #Catalogs;
SELECT Catalog DocType, [read] N'read', [write] N'write'
INTO #Catalogs
FROM Documents r
CROSS APPLY OPENJSON (doc, N'$.Catalogs')
WITH
(
Catalog  VARCHAR(MAX) N'$.Catalogs',
[read]  BIT N'$.read',
[write]  BIT N'$.write'
) AS Document
WHERE (1=1) AND
type = 'Catalog.Role' AND
id IN (SELECT [Role]
FROM #Roles);

SELECT 'UserOrGroup' kind, *
from #UserOrGroup;
SELECT 'Subsystem' kind, *
from #Subsystems;
SELECT 'Catalog' kind, *
from #Catalogs;
SELECT 'Document' kind, *
from #Documents;
SELECT 'Role' kind, [Role] id, description
from #Roles;`;
//# sourceMappingURL=UsersPermissions.js.map