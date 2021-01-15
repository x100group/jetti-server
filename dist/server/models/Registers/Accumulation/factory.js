"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegisterAccumulation = exports.RegisteredRegisterAccumulation = void 0;
const PaymentBatch_1 = require("./PaymentBatch");
const StaffingTable_1 = require("./StaffingTable");
const Acquiring_1 = require("./Acquiring");
const Intercompany_1 = require("./Intercompany");
const Salary_1 = require("./Salary");
const Balance_Reports_1 = require("./Balance.Reports");
const AccountablePersons_1 = require("./AccountablePersons");
const AP_1 = require("./AP");
const AR_1 = require("./AR");
const Balance_1 = require("./Balance");
const Bank_1 = require("./Bank");
const Cash_1 = require("./Cash");
const Cash_Transit_1 = require("./Cash.Transit");
const Depreciation_1 = require("./Depreciation");
const Inventory_1 = require("./Inventory");
const Loan_1 = require("./Loan");
const PL_1 = require("./PL");
const Sales_1 = require("./Sales");
const BudgetItemTurnover_1 = require("./BudgetItemTurnover");
const CashToPay_1 = require("./CashToPay");
const OrderPayment_1 = require("./OrderPayment");
const Balance_RC_1 = require("./Balance.RC");
const PL_RC_1 = require("./PL.RC");
const Investment_Analytics_1 = require("./Investment.Analytics");
const EmployeeTimekeeping_1 = require("./EmployeeTimekeeping");
exports.RegisteredRegisterAccumulation = [
    { type: 'Register.Accumulation.AccountablePersons', Class: AccountablePersons_1.RegisterAccumulationAccountablePersons },
    { type: 'Register.Accumulation.PaymentBatch', Class: PaymentBatch_1.RegisterAccumulationPaymentBatch },
    { type: 'Register.Accumulation.Investment.Analytics', Class: Investment_Analytics_1.RegisterAccumulationInvestmentAnalytics },
    { type: 'Register.Accumulation.OrderPayment', Class: OrderPayment_1.RegisterAccumulationOrderPayment },
    { type: 'Register.Accumulation.AP', Class: AP_1.RegisterAccumulationAP },
    { type: 'Register.Accumulation.AR', Class: AR_1.RegisterAccumulationAR },
    { type: 'Register.Accumulation.Bank', Class: Bank_1.RegisterAccumulationBank },
    { type: 'Register.Accumulation.Balance', Class: Balance_1.RegisterAccumulationBalance },
    { type: 'Register.Accumulation.Balance.RC', Class: Balance_RC_1.RegisterAccumulationBalanceRC },
    { type: 'Register.Accumulation.Balance.Report', Class: Balance_Reports_1.RegisterAccumulationBalanceReport },
    { type: 'Register.Accumulation.Cash', Class: Cash_1.RegisterAccumulationCash },
    { type: 'Register.Accumulation.Cash.Transit', Class: Cash_Transit_1.RegisterAccumulationCashTransit },
    { type: 'Register.Accumulation.EmployeeTimekeeping', Class: EmployeeTimekeeping_1.RegisterAccumulationEmployeeTimekeeping },
    { type: 'Register.Accumulation.Inventory', Class: Inventory_1.RegisterAccumulationInventory },
    { type: 'Register.Accumulation.Loan', Class: Loan_1.RegisterAccumulationLoan },
    { type: 'Register.Accumulation.PL', Class: PL_1.RegisterAccumulationPL },
    { type: 'Register.Accumulation.PL.RC', Class: PL_RC_1.RegisterAccumulationPLRC },
    { type: 'Register.Accumulation.Sales', Class: Sales_1.RegisterAccumulationSales },
    { type: 'Register.Accumulation.Salary', Class: Salary_1.RegisterAccumulationSalary },
    { type: 'Register.Accumulation.Depreciation', Class: Depreciation_1.RegisterAccumulationDepreciation },
    { type: 'Register.Accumulation.CashToPay', Class: CashToPay_1.RegisterAccumulationCashToPay },
    { type: 'Register.Accumulation.BudgetItemTurnover', Class: BudgetItemTurnover_1.RegisterAccumulationBudgetItemTurnover },
    { type: 'Register.Accumulation.Intercompany', Class: Intercompany_1.RegisterAccumulationIntercompany },
    { type: 'Register.Accumulation.Acquiring', Class: Acquiring_1.RegisterAccumulationAcquiring },
    { type: 'Register.Accumulation.StaffingTable', Class: StaffingTable_1.RegisterAccumulationStaffingTable },
];
function createRegisterAccumulation(init) {
    const doc = exports.RegisteredRegisterAccumulation.find(el => el.type === init.type);
    if (doc)
        return new doc.Class(Object.assign({ type: init.type }, init));
    else
        throw new Error(`createRegisterAccumulation: Can't create type! ${init.type} is not registered`);
}
exports.createRegisterAccumulation = createRegisterAccumulation;
//# sourceMappingURL=factory.js.map