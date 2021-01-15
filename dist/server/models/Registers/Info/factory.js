"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRegisterInfo = exports.RegisterRegisterInfo = exports.createRegisterInfo = void 0;
const TaxCheck_1 = require("./TaxCheck");
const dynamic_prototype_1 = require("./../../Dynamic/dynamic.prototype");
const ShareEmission_1 = require("./ShareEmission");
const CompanyPrice_1 = require("./CompanyPrice");
const RoyaltySales_1 = require("./RoyaltySales");
const DepartmentStatus_1 = require("./DepartmentStatus");
const Holiday_1 = require("./Holiday");
const CompanyResponsiblePersons_1 = require("./CompanyResponsiblePersons");
const RLS_Period_1 = require("./RLS.Period");
const Depreciation_1 = require("./Depreciation");
const ExchangeRates_1 = require("./ExchangeRates");
const PriceList_1 = require("./PriceList");
const RLS_1 = require("./RLS");
const Settings_1 = require("./Settings");
const BudgetItemRule_1 = require("./BudgetItemRule");
const DepartmentCompanyHistory_1 = require("./DepartmentCompanyHistory");
const CounterpartiePriceList_1 = require("./CounterpartiePriceList");
const SettlementsReconciliation_1 = require("./SettlementsReconciliation");
const ProductSpecificationByDepartment_1 = require("./ProductSpecificationByDepartment");
const IntercompanyHistory_1 = require("./IntercompanyHistory");
const IncomeDocumentRegistry_1 = require("./IncomeDocumentRegistry");
const LoanOwner_1 = require("./LoanOwner");
const EmployeeHistory_1 = require("./EmployeeHistory");
const ExchangeRates_National_1 = require("./ExchangeRates.National");
const ProductModifier_1 = require("./ProductModifier");
const SelfEmployed_1 = require("./SelfEmployed");
const StaffingTableHistory_1 = require("./StaffingTableHistory");
const EmploymentType_1 = require("./EmploymentType");
const Intl_1 = require("./Intl");
const BusinessCalendar_1 = require("./BusinessCalendar");
const BusinessCalendar_Months_1 = require("./BusinessCalendar.Months");
const RegisteredRegisterInfo = [
    { type: 'Register.Info.Dynamic', Class: dynamic_prototype_1.RegisterInfoDynamic },
    { type: 'Register.Info.Holiday', Class: Holiday_1.RegisterInfoHoliday },
    { type: 'Register.Info.BusinessCalendar', Class: BusinessCalendar_1.RegisterInfoBusinessCalendar },
    { type: 'Register.Info.BusinessCalendar.Months', Class: BusinessCalendar_Months_1.RegisterInfoBusinessCalendarMonths },
    { type: 'Register.Info.PriceList', Class: PriceList_1.RegisterInfoPriceList },
    { type: 'Register.Info.SelfEmployed', Class: SelfEmployed_1.RegisterInfoSelfEmployed },
    { type: 'Register.Info.ProductModifier', Class: ProductModifier_1.RegisterInfoProductModifier },
    { type: 'Register.Info.SettlementsReconciliation', Class: SettlementsReconciliation_1.RegisterInfoSettlementsReconciliation },
    { type: 'Register.Info.ExchangeRates', Class: ExchangeRates_1.RegisterInfoExchangeRates },
    { type: 'Register.Info.ExchangeRates.National', Class: ExchangeRates_National_1.RegisterInfoExchangeRatesNational },
    { type: 'Register.Info.ProductSpecificationByDepartment', Class: ProductSpecificationByDepartment_1.RegisterInfoProductSpecificationByDepartment },
    { type: 'Register.Info.Settings', Class: Settings_1.RegisterInfoSettings },
    { type: 'Register.Info.Depreciation', Class: Depreciation_1.RegisterInfoDepreciation },
    { type: 'Register.Info.RLS.Period', Class: RLS_Period_1.RegisterInfoRLSPeriod },
    { type: 'Register.Info.RLS', Class: RLS_1.RegisterInfoRLS },
    { type: 'Register.Info.BudgetItemRule', Class: BudgetItemRule_1.RegisterInfoBudgetItemRule },
    { type: 'Register.Info.IntercompanyHistory', Class: IntercompanyHistory_1.RegisterInfoIntercompanyHistory },
    { type: 'Register.Info.DepartmentCompanyHistory', Class: DepartmentCompanyHistory_1.DepartmentCompanyHistory },
    { type: 'Register.Info.DepartmentStatus', Class: DepartmentStatus_1.RegisterInfoDepartmentStatus },
    { type: 'Register.Info.CounterpartiePriceList', Class: CounterpartiePriceList_1.RegisterInfoCounterpartiePriceList },
    { type: 'Register.Info.CompanyResponsiblePersons', Class: CompanyResponsiblePersons_1.RegisterInfoCompanyResponsiblePersons },
    { type: 'Register.Info.IncomeDocumentRegistry', Class: IncomeDocumentRegistry_1.RegisterInfoIncomeDocumentRegistry },
    { type: 'Register.Info.CompanyPrice', Class: CompanyPrice_1.RegisterInfoCompanyPrice },
    { type: 'Register.Info.ShareEmission', Class: ShareEmission_1.RegisterInfoShareEmission },
    { type: 'Register.Info.LoanOwner', Class: LoanOwner_1.RegisterInfoLoanOwner },
    { type: 'Register.Info.Intl', Class: Intl_1.RegisterInfoIntl },
    { type: 'Register.Info.RoyaltySales', Class: RoyaltySales_1.RegisterInfoRoyaltySales },
    { type: 'Register.Info.EmployeeHistory', Class: EmployeeHistory_1.RegisterInfoEmployeeHistory },
    { type: 'Register.Info.EmploymentType', Class: EmploymentType_1.RegisterInfoEmploymentType },
    { type: 'Register.Info.StaffingTableHistory', Class: StaffingTableHistory_1.RegisterInfoStaffingTableHistory },
    { type: 'Register.Info.TaxCheck', Class: TaxCheck_1.RegisterInfoTaxCheck },
];
function createRegisterInfo(init) {
    const doc = RegisteredRegisterInfo.find(el => el.type === init.type);
    if (doc)
        return new doc.Class(init);
    else
        throw new Error(`createRegisterInfo: can't create type! ${init.type} is not registered`);
}
exports.createRegisterInfo = createRegisterInfo;
function RegisterRegisterInfo(Register) {
    RegisteredRegisterInfo.push(Register);
}
exports.RegisterRegisterInfo = RegisterRegisterInfo;
function GetRegisterInfo() {
    return RegisteredRegisterInfo;
}
exports.GetRegisterInfo = GetRegisterInfo;
//# sourceMappingURL=factory.js.map