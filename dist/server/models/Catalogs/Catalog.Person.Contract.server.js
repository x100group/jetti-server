"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonContract = exports.CatalogPersonContractServer = void 0;
const std_lib_1 = require("../../std.lib");
const Catalog_Person_Contract_1 = require("./Catalog.Person.Contract");
class CatalogPersonContractServer extends Catalog_Person_Contract_1.CatalogPersonContract {
    constructor() {
        super(...arguments);
        this.beforeSave = async (tx) => {
            if (!this.owner || !this.StartDate || !this.EndDate || !this.currency)
                throw new Error('Заполнены не все обязательные реквизиты');
            const owner = await std_lib_1.lib.doc.byIdT(this.owner, tx);
            if (!owner || !owner.Code1)
                throw new Error(`Не указан ИНН у владельца ${owner.description}`);
            this.description = `Договор №${this.code} от ${std_lib_1.lib.util.formatDate(this.StartDate)} (${owner.Code1} - ${owner.description})`;
            return this;
        };
    }
}
exports.CatalogPersonContractServer = CatalogPersonContractServer;
exports.getPersonContract = async (params, tx) => {
    const query = `SELECT TOP 1 id
  FROM [dbo].[Catalog.Person.Contract.v]
  where [owner] = @p1
  and [company] = @p2
  and [Status] = 'OPEN'
  and @p3 between [StartDate] and [EndDate]`;
    const res = await tx.oneOrNone(query, params);
    return res ? res.id : null;
};
//# sourceMappingURL=Catalog.Person.Contract.server.js.map