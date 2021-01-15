"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogOperationServer = void 0;
const Catalog_Operation_1 = require("./Catalog.Operation");
const mssql_1 = require("../../mssql");
const std_lib_1 = require("../../std.lib");
const dynamic_common_1 = require("../Dynamic/dynamic.common");
const sql_pool_x100_DATA_1 = require("../../sql.pool.x100-DATA");
class CatalogOperationServer extends Catalog_Operation_1.CatalogOperation {
    async onCreate(tx) {
        if (!this.script)
            this.script = `/*
// Account
Registers.Account.push({
    debit: { account: lib.account.byCode('50.01'), subcounts: [$.CashRegister, lib.doc.byCode('Catalog.CashFlow', 'IN.CUSTOMER', tx)] },
    kredit: { account: lib.account.byCode('62.01'), subcounts: [$.Customer] },
    sum: AmountInBalance
});

// Balance
Registers.Accumulation.push({
    kind: false,
    type: "Register.Accumulation.Balance",
    data: {
        Department: $.Department,
        Balance: lib.doc.byCode('Catalog.Balance', 'AR', tx),
        Analytics: $.Customer,
        Amount: AmountInBalance
    }
});

Registers.Accumulation.push({
    kind: true,
    type: "Register.Accumulation.Balance",
    data: {
        Department: $.Department,
        Balance: lib.doc.byCode('Catalog.Balance', 'CASH', tx),
        Analytics: $.CashRegister,
        Amount: AmountInBalance
    }
});

// PL
Registers.Accumulation.push({
    kind: true,
    type: "Register.Accumulation.PL",
    data: {
        Department: $.Department,
        PL: $.Expense,
        Analytics: $.Analytics,
        Amount: $.Amount,
    }`;
        return this;
    }
    async onCommand(command, args, tx) {
        await this[command](args, tx);
        return this;
    }
    async updateSQLViews() {
        await std_lib_1.lib.meta.updateSQLViewsByOperationId(this.id);
    }
    async createSequence(tx) {
        if (!this.shortName)
            throw Error('"shortName" is not defined!');
        const err = await tx.metaSequenceCreate(`Sq.Operation.${this.shortName}`);
        if (err)
            throw Error(err);
    }
    async updateSQLViewsX100DATA() {
        await std_lib_1.lib.meta.updateSQLViewsByOperationId(this.id, new mssql_1.MSSQL(sql_pool_x100_DATA_1.x100DATA_POOL), false);
    }
    async riseUpdateMetadataEvent() {
        await dynamic_common_1.riseUpdateMetadataEvent();
    }
    async getDynamicMetadata(tx) {
        return { type: this.getType(), Prop: await this.getPropFunc(tx), Props: await this.getPropsFunc(tx) };
    }
    getType() { return `Operation.${this.shortName}`; }
    async createDocServer(tx) {
        const type = 'Document.Operation';
        return await std_lib_1.lib.doc.createDocServer(type, { id: this.id, Operation: this.id }, tx);
    }
    async getPropsFunc(tx) {
        const doc = await this.createDocServer(tx);
        const props = Object.assign({}, doc.Props());
        props.type = { type: 'string', hidden: true, hiddenInList: true };
        props.Operation.value = this.id;
        return () => props;
    }
    async getPropFunc(tx) {
        const doc = await this.createDocServer(tx);
        return () => (Object.assign(Object.assign({}, doc.Prop()), { type: this.getType() }));
    }
}
exports.CatalogOperationServer = CatalogOperationServer;
//# sourceMappingURL=Catalog.Operation.server.js.map