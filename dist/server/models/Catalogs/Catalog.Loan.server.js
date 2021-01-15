"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogLoanServer = void 0;
const Catalog_Loan_1 = require("./Catalog.Loan");
const std_lib_1 = require("../../std.lib");
const x100_lib_1 = require("../../x100.lib");
class CatalogLoanServer extends Catalog_Loan_1.CatalogLoan {
    constructor() {
        super(...arguments);
        this.beforeSave = async (tx) => {
            const departmentCompanyID = await x100_lib_1.x100.info.companyByDepartment(this.Department, new Date, tx);
            if (this.company === departmentCompanyID)
                return this;
            const company = await std_lib_1.lib.doc.byIdT(this.company, tx);
            const departmentCompany = await std_lib_1.lib.doc.byIdT(departmentCompanyID, tx);
            if (company && departmentCompany && company.currency !== departmentCompany.currency)
                throw new Error(`Валюта баланса организации подразделения договора не совпадает с валютой баланса организации договора`);
            return this;
        };
    }
}
exports.CatalogLoanServer = CatalogLoanServer;
//# sourceMappingURL=Catalog.Loan.server.js.map