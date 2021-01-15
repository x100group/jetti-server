"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentUserSettingsServer = void 0;
const std_lib_1 = require("../../std.lib");
const RLS_1 = require("../Registers/Info/RLS");
const Document_UserSettings_1 = require("./Document.UserSettings");
class DocumentUserSettingsServer extends Document_UserSettings_1.DocumentUserSettings {
    async AddDescendantsCompany(tx) {
        if (!this.company)
            throw new Error(`Empty company!`);
        const query = `SELECT id company FROM dbo.[Descendants](@p1, '')`;
        const companyItems = await tx.manyOrNone(query, [this.company]);
        for (const CompanyItem of companyItems) {
            if (this.CompanyList.filter(ci => (ci.company === CompanyItem.company)).length === 0) {
                this.CompanyList.push(CompanyItem);
            }
        }
    }
    async ClearCompanyList(tx) {
        this.CompanyList = [];
    }
    async onValueChanged(prop, value, tx) {
        switch (prop) {
            case 'company':
                return this;
            default:
                return this;
        }
    }
    async onCommand(command, args, tx) {
        switch (command) {
            case 'company':
                return {};
            case 'AddDescendantsCompany':
                await this.AddDescendantsCompany(tx);
                return this;
            case 'ClearCompanyList':
                await this.ClearCompanyList(tx);
                return this;
            default:
                return {};
        }
    }
    async beforeDelet(tx) {
        await this.deleteRLSMovements(tx);
        return this;
    }
    async onUnPost(tx) {
        await this.deleteRLSMovements(tx);
        return this;
    }
    async deleteRLSMovements(tx) {
        await tx.none(`DELETE FROM [rls].[company] WHERE [document] = @p1`, [this.id]);
    }
    async onPost(tx) {
        const Registers = { Account: [], Accumulation: [], Info: [] };
        await std_lib_1.lib.util.adminMode(true, tx);
        try {
            await this.deleteRLSMovements(tx);
            const Users = await tx.manyOrNone(`
        SELECT code FROM  Documents WHERE deleted = 0 AND id IN (
          SELECT @p1 id
          UNION ALL
          SELECT [UsersGroup.User] id FROM Documents
          CROSS APPLY OPENJSON (doc, N'$.Users')
          WITH
          (
            [UsersGroup.User] UNIQUEIDENTIFIER N'$.User'
          ) AS Users
          WHERE (1=1) AND
          [posted] = 1 AND
          [type] = N'Catalog.UsersGroup' AND
          [id] = @p1
        );`, [this.UserOrGroup]);
            for (const user of Users) {
                for (const row of this.CompanyList) {
                    Registers.Info.push(new RLS_1.RegisterInfoRLS({
                        company: row.company,
                        user: user.code,
                    }));
                    // await tx.none(`INSERT INTO [rls].[company]([user],[company],[document]) VALUES(@p1, @p2, @p3)`,
                    //   [user.code, row.company, this.id]);
                }
            }
            const query = Registers.Info
                .map(e => `INSERT INTO [rls].[company]([user],[company],[document]) VALUES('${e.user}', '${e.company}', '${this.id}')`)
                .join(';');
            await tx.none(query);
            return Registers;
        }
        catch (ex) {
            throw new Error(ex);
        }
        finally {
            await std_lib_1.lib.util.adminMode(false, tx);
        }
    }
}
exports.DocumentUserSettingsServer = DocumentUserSettingsServer;
//# sourceMappingURL=Document.UserSettings.server.js.map