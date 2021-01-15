"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogStaffingTableServer = void 0;
const Catalog_StaffingTable_1 = require("./Catalog.StaffingTable");
const std_lib_1 = require("../../std.lib");
class CatalogStaffingTableServer extends Catalog_StaffingTable_1.CatalogStaffingTable {
    constructor() {
        super(...arguments);
        this.beforeSave = async (tx) => {
            if (this.isfolder)
                return this;
            const defVal = '<пусто>';
            const getDescription = async (id) => {
                if (!id)
                    return defVal;
                const ob = await std_lib_1.lib.doc.byId(id, tx);
                return ob && ob.description ? ob.description : defVal;
            };
            this.description =
                `${this.CloseDate ? '(closed) ' : ''}${await getDescription(this.JobTitle)} / ${await getDescription(this.DepartmentCompany)} (${await getDescription(this.Currency)})`;
            return this;
        };
    }
}
exports.CatalogStaffingTableServer = CatalogStaffingTableServer;
//# sourceMappingURL=Catalog.StaffingTable.server.js.map