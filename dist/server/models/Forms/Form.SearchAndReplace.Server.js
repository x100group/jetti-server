"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const std_lib_1 = require("../../std.lib");
const mssql_1 = require("../../mssql");
const Form_SearchAndReplace_1 = require("./Form.SearchAndReplace");
const sql_pool_tasks_1 = require("../../sql.pool.tasks");
class FormSearchAndReplaceServer extends Form_SearchAndReplace_1.FormSearchAndReplace {
    async Execute() {
        return this;
    }
    async getExchangeData(id, tx) {
        const sdbq = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, this.user);
        const query = `select ExchangeCode, ExchangeBase from dbo.[Documents] where id = @p1`;
        return await sdbq.oneOrNone(query, [id]);
    }
    // tslint:disable
    async Search() {
        if (!this.OldValue)
            throw new Error('Searched value is not defined');
        const sdbq = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, this.user);
        await this.FillExchangeData(sdbq);
        const ob = await std_lib_1.lib.doc.byId(this.NewValue, sdbq);
        const isCompany = ob && ob.type === 'Catalog.Company' || false;
        this.NewValueExchangeBase;
        const query = `
    -- old val Catalog.Person/CF7D06C0-E7D1-11EA-8F63-E1159173AA45
    -- new val 300880BA-41BE-EA11-A95C-ADB4CBE992FE
    -- DECLARE @P1 VARCHAR(50) = 'CF7D06C0-E7D1-11EA-8F63-E1159173AA45';
    -- DECLARE @P2 VARCHAR(50) = '300880BA-41BE-EA11-A95C-ADB4CBE992FE';
    ${isCompany ? `
    BEGIN
       SELECT
          COUNT(ID) Records,
          TYPE Type,
          'Documents.doc' Source 
       FROM
          DOCUMENTS 
       WHERE
          CONTAINS(DOC, @P1) 
       GROUP BY
          TYPE 
       UNION
       SELECT
          COUNT(ID) RECORDS,
          TYPE,
          'Documents.company' SOURCE 
       FROM
          DOCUMENTS 
       WHERE
          COMPANY = @P1 
       GROUP BY
          TYPE 
       UNION
       SELECT
          COUNT(ID) RECORDS,
          TYPE,
          'Accumulation.data' SOURCE 
       FROM
          ACCUMULATION 
       WHERE
          CONTAINS(DATA, @P1) 
       GROUP BY
          TYPE 
       UNION
       SELECT
          COUNT(ID) RECORDS,
          TYPE,
          'Accumulation.company' SOURCE 
       FROM
          ACCUMULATION 
       WHERE
          COMPANY = @P1 
       GROUP BY
          TYPE 
       UNION
       SELECT
          COUNT(ID) RECORDS,
          TYPE,
          'Accumulation.document' SOURCE 
       FROM
          ACCUMULATION 
       WHERE
          DOCUMENT = @P1 
       GROUP BY
          TYPE 
       UNION
       SELECT
          COUNT(ID) RECORDS,
          TYPE,
          'Register.Info.data' SOURCE 
       FROM
          [REGISTER.INFO] 
       WHERE
          CONTAINS(DATA, @P1) 
       GROUP BY
          TYPE 
       UNION
       SELECT
          COUNT(ID) RECORDS,
          TYPE,
          'Register.Info.company' SOURCE 
       FROM
          [REGISTER.INFO] 
       WHERE
          COMPANY = @P1 
       GROUP BY
          TYPE 
       UNION
       SELECT
          COUNT(ID) RECORDS,
          TYPE,
          'Register.Info.document' SOURCE 
       FROM
          [REGISTER.INFO] 
       WHERE
          DOCUMENT = @P1 
       GROUP BY
          TYPE;
    
    ` : ` 
    SELECT
       COUNT(ID) Records,
       TYPE Type,
       'Documents.doc' Source 
    FROM
       DOCUMENTS 
    WHERE
       CONTAINS(DOC, @P1) 
    GROUP BY
       TYPE 
    
    UNION
    SELECT
       COUNT(ID) RECORDS,
       TYPE,
       'Accumulation.data' SOURCE 
    FROM
       ACCUMULATION 
    WHERE
       CONTAINS(DATA, @P1) 
    GROUP BY
       TYPE 
    UNION
    SELECT
       COUNT(ID) RECORDS,
       TYPE,
       'Accumulation.document' SOURCE 
    FROM
       ACCUMULATION 
    WHERE
       DOCUMENT = @P1 
    GROUP BY
       TYPE 
    UNION
    SELECT
       COUNT(ID) RECORDS,
       TYPE,
       'Register.Info.data' SOURCE 
    FROM
       [REGISTER.INFO] 
    WHERE
       CONTAINS(DATA, @P1) 
    GROUP BY
       TYPE 
    UNION
    SELECT
       COUNT(ID) RECORDS,
       TYPE,
       'Register.Info.document' SOURCE 
    FROM
       [REGISTER.INFO] 
    WHERE
       DOCUMENT = @P1 
    GROUP BY
       TYPE;
 
 `}`;
        const searchRes = await sdbq.manyOrNone(query, [this.OldValue]);
        this.SearchResult = [];
        for (const row of searchRes) {
            this.SearchResult.push({
                Records: row.Records,
                Type: row.Type,
                Source: row.Source
            });
        }
        return this;
    }
    async FillExchangeData(tx) {
        this.OldValueExchangeBase = '';
        this.OldValueExchangeCode = '';
        this.NewValueExchangeBase = '';
        this.NewValueExchangeCode = '';
        if (this.NewValue) {
            const ExchangeData = await this.getExchangeData(this.NewValue, tx);
            if (ExchangeData) {
                this.NewValueExchangeBase = ExchangeData.ExchangeBase;
                this.NewValueExchangeCode = ExchangeData.ExchangeCode;
            }
        }
        if (this.OldValue) {
            const ExchangeData = await this.getExchangeData(this.OldValue, tx);
            if (ExchangeData) {
                this.OldValueExchangeBase = ExchangeData.ExchangeBase;
                this.OldValueExchangeCode = ExchangeData.ExchangeCode;
            }
        }
    }
    async Replace() {
        const sdbq = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, this.user);
        this.user.isAdmin = true;
        await sdbq.tx(async (tx) => {
            await std_lib_1.lib.util.adminMode(true, tx);
            try {
                await this.ReplaceInTx(tx);
            }
            catch (ex) {
                throw new Error(ex);
            }
            finally {
                await std_lib_1.lib.util.adminMode(false, tx);
            }
        });
    }
    async ReplaceInTx(tx) {
        if (!this.OldValue)
            throw new Error('Old value is not defined');
        if (!this.NewValue)
            throw new Error('New value is not defined');
        if (this.NewValue === this.OldValue)
            throw new Error('Bad params: The new value cannot be equal to the old value');
        const NewValue = await std_lib_1.lib.doc.byId(this.NewValue, tx);
        const OldValue = await std_lib_1.lib.doc.byId(this.OldValue, tx);
        if (NewValue.type !== OldValue.type)
            throw new Error(`Bad params: The new value type ${NewValue.type} mast be same type ${OldValue.type} as old value`);
        let query = `
        declare @isCompany int = (SELECT COUNT(*) FROM Documents WHERE id = @p2 AND type = N'Catalog.Company')
        update documents set doc = REPLACE(doc, @p1, @p2), timestamp = getdate()
        where id in (select id from documents where contains(doc, @p1));
        RAISERROR('REPLACE DOC', 0 ,1) WITH NOWAIT;
        DROP TABLE IF EXISTS #Exchange;
        select ExchangeBase, ExchangeCode into #Exchange from Documents where id = @p1;
        RAISERROR('#Exchange', 0 ,1) WITH NOWAIT;
        IF (select ExchangeBase from #Exchange) <> ''
        BEGIN
            if ((select top 1 coalesce(d.ExchangeCode,'') from Documents d where d.id=@p2)='' or @p3=1)
            begin
                update documents set
                    ExchangeBase = (select ExchangeBase from #Exchange),
                    ExchangeCode = (select ExchangeCode from #Exchange)
                where id = @p2;
                RAISERROR('set ExchangeBase', 0 ,1) WITH NOWAIT;
                update documents set
                    ExchangeBase = null,
                    ExchangeCode = null
                where id = @p1;
                RAISERROR('clear ExchangeBase', 0 ,1) WITH NOWAIT;
            end
        END
        update CatalogMatching  set id = @p2 where id = @p1;
        RAISERROR('id', 0 ,1) WITH NOWAIT;
        if @isCompany > 0 update documents set company = @p2 where company = @p1;
        RAISERROR('company', 0 ,1) WITH NOWAIT;
        update documents set parent = @p2 where parent = @p1;
        RAISERROR('parent', 0 ,1) WITH NOWAIT;
        declare @isUser int = (SELECT COUNT(*) FROM Documents WHERE id = @p2 AND type = N'Catalog.User')
        if @isUser > 0 update documents set [user] = @p2 where [user] = @p1;
        RAISERROR('[user]', 0 ,1) WITH NOWAIT;
        update documents set deleted = 1, timestamp = getdate() where id = @p1 and deleted <> 1;
        RAISERROR('deleted', 0 ,1) WITH NOWAIT;
        update Accumulation set data = REPLACE(data, @p1, @p2)
        where id in (select id from Accumulation where contains(data, @p1));
        RAISERROR('REPLACE Accumulation', 0 ,1) WITH NOWAIT;
        if @isCompany > 0 update Accumulation set company = @p2 where company = @p1;
        RAISERROR('company', 0 ,1) WITH NOWAIT;
        update [Register.Info] set data = REPLACE(data, @p1, @p2)
        where id in (select id from [Register.Info] where contains(data, @p1));
        RAISERROR('REPLACE [Register.Info]', 0 ,1) WITH NOWAIT;
        if @isCompany > 0 update [Register.Info] set company = @p2 where company = @p1;
        RAISERROR('company', 0 ,1) WITH NOWAIT;`;
        await tx.none(query, [this.OldValue, this.NewValue, this.ReplaceExchangeCode]);
        return this;
    }
}
exports.default = FormSearchAndReplaceServer;
//# sourceMappingURL=Form.SearchAndReplace.Server.js.map