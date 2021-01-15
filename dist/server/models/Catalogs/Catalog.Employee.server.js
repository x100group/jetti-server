"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogEmployeeServer = void 0;
const Catalog_Employee_1 = require("./Catalog.Employee");
const std_lib_1 = require("../../std.lib");
class CatalogEmployeeServer extends Catalog_Employee_1.CatalogEmployee {
    constructor() {
        super(...arguments);
        this.beforeSave = async (tx) => {
            const defVal = '<пусто>';
            const getDescription = async (id) => {
                if (!id)
                    return defVal;
                const ob = await std_lib_1.lib.doc.byId(id, tx);
                return ob && ob.description ? ob.description : defVal;
            };
            this.description = `${await getDescription(this.Person)} (${await getDescription(this.company)})`;
            return this;
        };
    }
}
exports.CatalogEmployeeServer = CatalogEmployeeServer;
//# sourceMappingURL=Catalog.Employee.server.js.map