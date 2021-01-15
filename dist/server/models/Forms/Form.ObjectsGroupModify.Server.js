"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDocumentFromJSON = exports.insertDocumentsFromJSON = void 0;
const filterBuilder_1 = require("./../../fuctions/filterBuilder");
const Form_ObjectsGroupModify_1 = require("./Form.ObjectsGroupModify");
const mssql_1 = require("../../mssql");
const sql_pool_tasks_1 = require("../../sql.pool.tasks");
const documents_factory_1 = require("../documents.factory");
const documents_factory_server_1 = require("../documents.factory.server");
const jetti_middle_1 = require("jetti-middle");
const std_lib_1 = require("../../std.lib");
const list_1 = require("../../routes/utils/list");
// tslint:disable: max-line-length
// tslint:disable: no-shadowed-variable
async function insertDocumentsFromJSON(jsonDoc, tx) {
    await tx.none(`
    INSERT INTO Documents(
      [id], [type], [date], [code], [description], [posted], [deleted],
      [parent], [isfolder], [company], [user], [info], [doc])
    SELECT
      [id], [type], [date], [code], [description], [posted], [deleted],
      [parent], [isfolder], [company], [user], [info], [doc]
    FROM OPENJSON(@p1) WITH (
      [id] UNIQUEIDENTIFIER,
      [date] DATETIME,
      [type] NVARCHAR(100),
      [code] NVARCHAR(36),
      [description] NVARCHAR(150),
      [posted] BIT,
      [deleted] BIT,
      [parent] UNIQUEIDENTIFIER,
      [isfolder] BIT,
      [company] UNIQUEIDENTIFIER,
      [user] UNIQUEIDENTIFIER,
      [info] NVARCHAR(max),
      [doc] NVARCHAR(max) N'$.doc' AS JSON
    )
   `, [jsonDoc]);
}
exports.insertDocumentsFromJSON = insertDocumentsFromJSON;
async function updateDocumentFromJSON(jsonDoc, tx) {
    await tx.none(`
    UPDATE Documents
      SET
        type = i.type, parent = i.parent,
        date = i.date, code = i.code, description = i.description,
        posted = i.posted, deleted = i.deleted, isfolder = i.isfolder,
        "user" = i."user", company = i.company, info = i.info, timestamp = GETDATE(),
        doc = i.doc
      FROM (
        SELECT *
        FROM OPENJSON(@p1) WITH (
          [id] UNIQUEIDENTIFIER,
          [date] DATETIME,
          [type] NVARCHAR(100),
          [code] NVARCHAR(36),
          [description] NVARCHAR(150),
          [posted] BIT,
          [deleted] BIT,
          [isfolder] BIT,
          [company] UNIQUEIDENTIFIER,
          [user] UNIQUEIDENTIFIER,
          [info] NVARCHAR(max),
          [parent] UNIQUEIDENTIFIER,
          [doc] NVARCHAR(max) N'$.doc' AS JSON
        )
      ) i
    WHERE Documents.id = i.id`, [jsonDoc]);
}
exports.updateDocumentFromJSON = updateDocumentFromJSON;
class FormObjectsGroupModifyServer extends Form_ObjectsGroupModify_1.FormObjectsGroupModify {
    constructor() {
        super(...arguments);
        this.checkedOnTypes = [];
        this.getRecieverProps = async () => (await this.getRecieverServDoc()).Props();
        this.getRecieverProp = async () => (await this.getRecieverServDoc()).Prop();
        this.loadingTable = () => this['LoadingTable'];
        this.getTX = () => {
            if (!this.tx)
                this.createTransaction();
            return this.tx;
        };
        this.createTransaction = () => {
            if (this.tx)
                return;
            // this.user.isAdmin = this.SaveInAdminMode;
            this.tx = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, this.user);
        };
        this.isGUID = (value) => {
            return value.length === 36 && value.split('-').length === 5 && value.split('-')[0].length === 8;
        };
        this.checkType = async (value, type) => {
            if (!value || type === 'string')
                return true;
            const checked = this.checkedOnTypes.find(e => e.value === value);
            if (checked && checked.type === type)
                return checked.correct;
            const correct = await this.isValueTypeOf(value, type);
            this.checkedOnTypes.push({ value: value, type: type, correct: correct });
            return correct;
        };
        // TODO check ENUM!
        this.isValueTypeOf = async (value, type) => {
            if (!value || type === 'string')
                return true;
            if (jetti_middle_1.Type.isRefType(type)) {
                if (!this.isGUID(value))
                    return false;
                const ob = await std_lib_1.lib.doc.byId(value, this.getTX());
                return !!ob && ob.type === type;
            }
            switch (type) {
                case 'number':
                    return value.trim() === '0' || Number.parseFloat(value) !== 0;
                case 'date':
                case 'datetime':
                case 'time':
                    return Date.parse(value) > 0;
                default:
                    return true;
            }
        };
        this.fillPropMatching = () => {
            const head = this.ColumnsMatching.filter(e => e.ColumnFrom && e.ColumnTo && !e.TablePartTo);
            const tablesCol = this.ColumnsMatching.filter(e => e.ColumnFrom && e.ColumnTo && e.TablePartTo);
            const tables = {};
            const tableNames = [...tablesCol.map(e => e.TablePartTo)];
            for (const tableName of tableNames) {
                tables[tableName] = tablesCol.filter(e => e.TablePartTo === tableName);
            }
            this.propMatching = { Head: head, Tables: tables };
        };
        this.addError = (kind, text, rowNumber = 0, objectId = '') => {
            this.Errors.push({ RowNumber: rowNumber, ErrorKind: kind, Text: text, Time: new Date, ObjectId: objectId });
        };
    }
    async Execute() {
        return this;
    }
    async saveToJSON() {
        this.createTransaction();
        const docIDs = this['ObjectsList'].map(el => '\'' + el['id'] + '\'').join(',');
        const query = `SELECT * FROM Documents WHERE id IN(${docIDs})`;
        this['exportString'] = JSON.stringify(await this.tx.manyOrNone(query));
        const setId = 'exportToFile';
        if (!this.dynamicProps.find(e => e.SetId === setId)) {
            this.DynamicPropsPush('add', 'type', 'string', 'exportString', '', setId);
            this.DynamicPropsPush('add', 'controlType', 'textarea', 'exportString', '', setId);
            this.DynamicPropsPush('add', 'panel', 'Список объектов', 'exportString', '', setId);
        }
    }
    async loadFromJSON() {
        this.createTransaction();
        if (!this.Text)
            return;
        if (!this.UsePreview) {
            const docsAll = JSON.parse(this.Text);
            const docsIDs = docsAll.map(el => '\'' + el['id'] + '\'').join(',');
            const query = `SELECT id FROM Documents WHERE id IN(${docsIDs})`;
            const existId = await this.tx.manyOrNone(query);
            const docs = {
                update: docsAll.filter(e => existId.find(el => el.id === e.id)),
                insert: docsAll.filter(e => !existId.find(el => el.id === e.id))
            };
            if (docs.insert.length)
                await insertDocumentsFromJSON(JSON.stringify(docs.insert), this.tx);
            if (docs.update.length)
                await updateDocumentFromJSON(JSON.stringify(docs.update), this.tx);
        }
    }
    async Modify() {
        this.createTransaction();
        for (const row of this['ObjectsList']) {
            const servDoc = await std_lib_1.lib.doc.createDocServerById(row.id, this.tx);
            if (!servDoc)
                throw new Error('Doc not exist ' + row.id);
            let saveDoc = false;
            const modFields = this.PropSettings.filter(e => e.isModify).map(e => e.PropName);
            for (const propName of modFields) {
                if (servDoc[propName] === this[propName + '_value'])
                    continue;
                servDoc[propName] = this[propName + '_value'];
                saveDoc = true;
            }
            if (saveDoc)
                try {
                    await std_lib_1.lib.doc.saveDoc(servDoc, this.tx);
                }
                catch (e) {
                    throw new Error(`On save doc ${row.id}:\n${e}`);
                }
        }
    }
    async fillPropSettings() {
        const props = await this.getRecieverProps();
        this.PropSettings = Object.keys(props)
            .filter(key => props[key].type !== 'table')
            .map(e => ({ PropName: e, PropLabel: props[e].label || e, PropType: props[e].type, isFilter: false, isModify: false, isVisibly: false }));
    }
    async createFilterAndModifyElements() {
        await this.createFilterElements();
        await this.createModifyElements();
    }
    async createFilterElements() {
        const setId = 'createFilterElements';
        const filterFields = this.PropSettings.filter(e => e.isFilter).map(e => e.PropName);
        const matchOperator = ['=', '>=', '<=', '<', '>', 'like', 'in', 'beetwen', 'is null'];
        const storageType = !!filterFields.includes('parent') &&
            jetti_middle_1.Type.isCatalog(await this.getRecieverType()) &&
            (await this.getRecieverProp()).hierarchy || null;
        const props = await this.getRecieverProps();
        const panel = 'Фильтр';
        this.DynamicPropsClearSet(setId);
        for (const filterField of filterFields) {
            const prop = Object.assign(Object.assign({}, props[filterField]), { key: filterField });
            this.DynamicPropsPush('add', 'type', prop.type, `${prop.key}_right`, '', setId);
            this.DynamicPropsPush('add', 'label', `Значение: ${prop.label || prop.key}`, `${prop.key}_right`, '', setId);
            this.DynamicPropsPush('add', 'panel', panel, `${prop.key}_right`, '', setId);
            this.DynamicPropsPush('add', 'type', 'enum', `${prop.key}_center`, '', setId);
            this.DynamicPropsPush('add', 'value', matchOperator, `${prop.key}_center`, '', setId);
            this.DynamicPropsPush('add', 'label', `Вид сравнения: ${prop.label || prop.key}`, `${prop.key}_center`, '', setId);
            this.DynamicPropsPush('add', 'panel', panel, `${prop.key}_center`, '', setId);
            if (storageType || prop.storageType) {
                this.DynamicPropsPush('add', 'storageType', storageType || prop.storageType, `${prop.key}_right`, '', setId);
            }
        }
    }
    async createModifyElements() {
        const setId = 'createModifyElements';
        const modFields = this.PropSettings.filter(e => e.isModify).map(e => e.PropName);
        const storageType = !!modFields.includes('parent') &&
            jetti_middle_1.Type.isCatalog(await this.getRecieverType()) &&
            (await this.getRecieverProp()).hierarchy || null;
        const props = await this.getRecieverProps();
        const panel = 'Новые значения реквизитов';
        this.DynamicPropsClearSet(setId);
        for (const modField of modFields) {
            const prop = Object.assign(Object.assign({}, props[modField]), { key: modField });
            this.DynamicPropsPush('add', 'type', prop.type, `${prop.key}_value`, '', setId);
            this.DynamicPropsPush('add', 'label', prop.label || prop.key, `${prop.key}_value`, '', setId);
            this.DynamicPropsPush('add', 'panel', panel, `${prop.key}_value`, '', setId);
            if (storageType || prop.storageType) {
                this.DynamicPropsPush('add', 'storageType', storageType || prop.storageType, `${prop.key}_value`, '', setId);
            }
        }
    }
    async selectFilter() {
        const setId = 'selectFilter';
        const filterFields = this.PropSettings.filter(e => e.isFilter).map(e => e.PropName);
        const listFilter = [];
        const props = await this.getRecieverProps();
        this.DynamicPropsClearSet(setId);
        for (const filterField of filterFields) {
            const prop = props[filterField];
            if (!prop)
                continue;
            listFilter.push({ left: filterField, center: this[`${filterField}_center`], right: this[`${filterField}_right`] });
        }
        if (this.OperationType)
            listFilter.push({
                left: 'Operation',
                center: '=',
                right: this.OperationType
            });
        const complexProps = ['Object'];
        this.DynamicPropsPush('add', 'panel', 'Список объектов', '', 'ObjectsList', setId);
        this.DynamicPropsPush('add', 'type', await this.getRecieverType(), 'Object', 'ObjectsList', setId);
        this.DynamicPropsPush('add', 'label', 'Object', 'Object', 'ObjectsList', setId);
        let visibleFields = this.PropSettings.filter(e => e.isVisibly).map(e => e.PropName);
        if (!visibleFields.length)
            visibleFields = this.PropSettings.map(e => e.PropName);
        Object.keys(props)
            .filter(propKey => props[propKey].type !== 'table' && visibleFields.find(e => e === propKey))
            .forEach(propName => {
            const prop = props[propName];
            if (jetti_middle_1.Type.isRefType(prop.type.toString()))
                complexProps.push(propName);
            this.DynamicPropsPush('add', 'type', prop.type, propName, 'ObjectsList', setId);
            this.DynamicPropsPush('add', 'label', prop.label || propName, propName, 'ObjectsList', setId);
            if (prop.type === 'enum') {
                this.DynamicPropsPush('add', 'value', prop.value || [], propName, 'ObjectsList', setId);
            }
        });
        let resData;
        if (jetti_middle_1.Type.isCatalog(await this.getRecieverType())) {
            const filterBody = {
                id: '',
                type: await this.getRecieverType(),
                command: 'first',
                count: 1000,
                offset: 0,
                filter: listFilter,
                order: [new jetti_middle_1.FormListOrder('description')]
            };
            resData = (await list_1.List(filterBody, this.getTX())).data
                .map(e => {
                const res = Object.assign(Object.assign({}, e), { Object: e.id });
                complexProps
                    .filter(colName => e[colName] && e[colName].id)
                    .forEach(cp => {
                    res[cp] = e[cp].id;
                });
                return res;
            });
        }
        else {
            const query = this.getSelectQueryText(props, listFilter);
            resData = await this.getTX().manyOrNone(query);
        }
        this['ObjectsList'] = resData;
    }
    getSelectQueryText(schema, listFilter) {
        const jsonProp = (prop, type) => {
            if (type === 'boolean') {
                return `ISNULL(CAST(JSON_VALUE(d.doc, N'$."${prop}"') AS BIT), 0) "${prop}"`;
            }
            if (type === 'number') {
                return `CAST(JSON_VALUE(d.doc, N'$."${prop}"') AS MONEY) "${prop}"`;
            }
            return `JSON_VALUE(d.doc, N'$."${prop}"') "${prop}"`;
        };
        const leftJoin = (prop, type) => ` LEFT JOIN "Documents" "${prop}" ON "${prop}".id = CAST(JSON_VALUE(d.doc, N'$."${prop}"') AS UNIQUEIDENTIFIER)`;
        const simlePropertyField = (prop, type, isCommon) => {
            if (isCommon)
                return `d.${prop}`;
            if (type === 'boolean') {
                return `ISNULL(CAST(JSON_VALUE(d.doc, N'$."${prop}"') AS BIT), 0)`;
            }
            if (type === 'number') {
                return `CAST(JSON_VALUE(d.doc, N'$."${prop}"') AS MONEY)`;
            }
            return `JSON_VALUE(d.doc, N'$."${prop}"')`;
        };
        const complexPropertyField = (prop, isCommon) => isCommon ? `d.${prop}` : `JSON_VALUE(d.doc, N'$."${prop}"')`;
        const queryOb = { fields: [], joins: [] };
        const commonProps = Object.keys(new jetti_middle_1.DocumentBase);
        commonProps.push('type');
        const props = Object.keys(schema)
            .filter(key => schema[key].type !== 'table' && key !== 'workflow')
            .map(key => ({
            key: key,
            type: schema[key].type.toString(),
            isCommon: commonProps.includes(key),
            isComplex: jetti_middle_1.Type.isRefType(schema[key].type.toString()),
            filter: listFilter.find(filter => filter.left === key)
        }));
        for (const prop of props) {
            if (prop.filter)
                prop.filter.left = prop.isComplex ? complexPropertyField(prop.key, prop.isCommon) : simlePropertyField(prop.key, prop.type, prop.isCommon);
            if (prop.isCommon)
                queryOb.fields.push(`d."${prop.key}" "${prop.key}"`);
            else
                queryOb.fields.push(jsonProp(prop.key, prop.type));
            if (prop.isComplex)
                queryOb.joins.push(leftJoin(prop.key, prop.type));
        }
        return `
    SELECT
    d.id "Object",
    ${queryOb.fields.join(`,\n`)}
    FROM "Documents" d
    ${queryOb.joins.join(`\n`)}
    WHERE ${filterBuilder_1.filterBuilder(listFilter).where}`.trim();
    }
    async getRecieverType() {
        if (this.OperationType)
            return 'Document.Operation';
        let result = '';
        if (this.CatalogType) {
            const ob = await std_lib_1.lib.doc.byId(this.CatalogType, this.getTX());
            if (ob)
                result = ob.type;
        }
        return result;
    }
    async getRecieverServDoc() {
        const type = await this.getRecieverType();
        const Operation = this.OperationType || undefined;
        if (!type)
            throw new Error('Не задан тип приемника');
        const sdbl = new mssql_1.MSSQL(sql_pool_tasks_1.TASKS_POOL, this.user);
        const doc = (Operation ? Object.assign(Object.assign({}, documents_factory_1.createDocument(type)), { Operation }) :
            documents_factory_1.createDocument(type));
        const ServerDoc = await documents_factory_server_1.createDocumentServer(type, doc, sdbl);
        if (!ServerDoc)
            throw new Error(`wrong type ${type}`);
        return ServerDoc;
    }
    async ReadRecieverStructure() {
        const type = await this.getRecieverType();
        const recieverProps = await this.getRecieverProps();
        this.ColumnsMatching = [];
        const getСolumnMatching = (propName, prop, tablePartTo = '') => {
            let Role = '';
            if (propName === 'id' && !tablePartTo) {
                prop.type = type;
                Role = 'Object id';
            }
            return {
                LoadEmptyValues: false,
                LoadIfEmptyInObject: false,
                ColumnRole: Role,
                ColumnTo: propName,
                ColumnToLabel: prop.label || propName,
                TablePartTo: tablePartTo,
                ColumnFrom: '',
                ColumnToType: prop.type
            };
        };
        Object.keys(recieverProps).forEach(key => {
            const prop = recieverProps[key];
            if (prop.type === 'table')
                Object.keys(prop[key]).forEach(tableCol => this.ColumnsMatching.push(getСolumnMatching(tableCol, prop[key][tableCol], key)));
            else
                this.ColumnsMatching.push(getСolumnMatching(key, prop));
        });
        await this.fillColumnsFrom();
        return this;
    }
    async saveDataIntoDB() {
        await this.createComparedTable();
        const objectIdCol = this.ColumnsMatching.find(e => e.ColumnRole === 'Object id');
        if (!objectIdCol)
            throw new Error('Не задана колонка - идентфикатор объекта (Column role = "Object id")');
        this.fillPropMatching();
        this.createTransaction();
        const objects = [...new Set(this['LoadingTable'].filter(e => e[objectIdCol.ColumnTo]).map(e => e[objectIdCol.ColumnTo]))];
        for (const ob of objects) {
            const servDoc = await std_lib_1.lib.doc.createDocServerById(ob, this.tx);
            const rows = this['LoadingTable'].filter(e => e[objectIdCol.ColumnTo] === ob);
            const rowNumber = this['LoadingTable'].indexOf(rows[0]);
            if (!servDoc) {
                this.addError('ObjectNotFound', `Не удалось получить объект по ${ob}`, rowNumber, ob);
                continue;
            }
            if (servDoc.type !== objectIdCol.ColumnToType) {
                this.addError('IncorrectType', `Тип полученного объекта ${servDoc.type}, ожидается тип ${objectIdCol.ColumnToType}`, rowNumber, ob);
                continue;
            }
            try {
                if (await this.fillDocument(servDoc, rows))
                    await std_lib_1.lib.doc.saveDoc(servDoc, this.tx);
            }
            catch (error) {
                this.addError('OnSave', JSON.stringify(error), rowNumber, ob);
            }
        }
    }
    async fillDocument(doc, data) {
        let result = await this.fillDocumentHead(doc, data);
        for (const tableName of Object.keys(this.propMatching.Tables)) {
            result = await this.fillDocumentTablePart(doc, data, tableName) || result;
        }
        return result;
    }
    async fillDocumentHead(doc, data) {
        let result = false;
        for (const col of this.propMatching['Head']) {
            for (const row of data) {
                result = await this.setDocPropValue(doc, col, row[col.ColumnTo]) || result;
            }
        }
        return result;
    }
    async fillDocumentTablePart(doc, data, tablePartName = '') {
        let result = false;
        const table = doc[tablePartName];
        if (this.ClearTableParts) {
            if (table.length) {
                table.length = 0;
                result = true;
            }
            for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
                const docRow = {};
                for (const col of this.propMatching[tablePartName]) {
                    result = await this.setDocPropValue(docRow[col.ColumnTo], col, data[rowIndex][col.ColumnTo]) || result;
                }
                table.push(docRow);
            }
        }
        else {
            const findRowById = this.propMatching[tablePartName].find(e => e.ColumnRole === 'Table part row id'); // find by row nomber
            if (findRowById) {
                if (table.length < data.length) {
                    this.addError('IncorrectTablePartLength', `Количество строк ТЧ ${tablePartName} - ${table.length}, не меньше количества загружаемых строк ${data.length}`, 0, doc.id);
                    return false;
                }
                for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
                    for (const col of this.propMatching[tablePartName]) {
                        result = await this.setDocPropValue(table[rowIndex][col.ColumnTo], col, data[rowIndex][col.ColumnTo]) || result;
                    }
                }
            }
        }
        doc[tablePartName] = table;
        return result;
    }
    async setDocPropValue(doc, col, value) {
        if (col.ColumnRole
            || doc[col.ColumnTo] === value
            || (!value && !col.LoadEmptyValues)
            || (doc[col.ColumnTo] && col.LoadIfEmptyInObject))
            return false;
        if (this.CheckTypes && !await this.checkType(value, col.ColumnToType))
            return false;
        doc[col.ColumnTo] = value;
        return true;
    }
    async prepareToLoading() {
        await this.ReadRecieverStructure();
        await this.matchColumnsByName();
        await this.loadToTempTable();
        await this.fillLoadingTable();
    }
    async compareLoadingDataWithCurrent() {
        await this.createComparedTable();
    }
    async createComparedTable() {
        const machCol = this.ColumnsMatching.filter(e => e.ColumnFrom && e.ColumnTo);
        if (!machCol.length)
            throw new Error('Не задано соответствие колонок');
        const setId = 'createComparedTable';
        this.DynamicPropsClearSet(setId);
        this.DynamicPropsPush('add', 'type', 'table', '', 'ComparedTable', setId);
        this.DynamicPropsPush('add', 'label', 'Compare', '', 'ComparedTable', setId);
        for (const col of machCol) {
            this.DynamicPropsPush('add', 'type', col.ColumnToType, `${col.ColumnTo}Current`, 'ComparedTable', setId);
            this.DynamicPropsPush('add', 'type', col.ColumnToType, `${col.ColumnTo}New`, 'ComparedTable', setId);
        }
        this['ComparedTable'] = [];
    }
    async fillLoadingTable() {
        this['LoadingTable'] = this['TempTable'];
        if (!this['LoadingTable'].length)
            return;
        const cols = Object.keys(this['LoadingTable'][0]).filter(e => e !== 'Errors');
        const refColumns = this.ColumnsMatching.filter(e => e.ColumnFrom && e.ColumnTo && jetti_middle_1.Type.isRefType(e.ColumnToType)).map(e => e.ColumnTo);
        for (let index = 0; index < this['TempTable'].length; index++) {
            const rowTemp = this['TempTable'][index];
            const rowLoad = this['LoadingTable'][index];
            rowTemp.Errors = 0;
            for (const col of cols) {
                if (rowTemp[col] && !rowLoad[col])
                    rowTemp.Errors++;
                if (rowLoad[col] && refColumns.includes(col) && !this.isGUID(rowLoad[col]))
                    rowLoad[col] = null;
            }
            rowLoad.Errors = rowTemp.Errors;
        }
    }
    async loadToTempTable() {
        await this.createLoadingTable();
        const pastedValue = this.Text;
        if (!pastedValue)
            return new Set;
        const sep = await this.getSeparators();
        const rows = pastedValue.split(sep.rows);
        if (!rows.length)
            throw new Error('Не найден разделитель строк');
        const cols = rows[0].split(sep.columns);
        if (!cols.length)
            throw new Error('Не найден разделитель колонок');
        const colsSet = new Set();
        for (const col of cols) {
            const matCol = this.ColumnsMatching.find(e => e.ColumnFrom === col && e.ColumnTo);
            if (matCol)
                colsSet.add({ colProp: matCol, index: cols.indexOf(col) });
        }
        const colSep = sep.columns;
        for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
            const row = rows[rowIndex].split(colSep);
            const rowOb = {};
            colsSet.forEach(col => { rowOb[col.colProp.ColumnTo] = row[col.index]; });
            this['TempTable'].push(rowOb);
        }
        // for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
        //   const row = rows[rowIndex];
        //   const rowOb = {};
        //   colsSet.forEach(async (col) => {
        //     rowOb[col.colProp.ColumnTo] = await this.getDataFromString(row[col.index], col.colProp.ColumnToType);
        //   });
        //   this['LoadingTable'].push(rowOb);
        // }
    }
    async getDataFromString(value, type) {
        if (!value || !type)
            return value;
        const res = this['cache'].find(e => value === e.valueIn && type === e.type);
        if (res)
            return res.valueOut;
        switch (type) {
            case 'boolean':
                break;
            default:
                break;
        }
    }
    async createLoadingTable() {
        const machCol = this.ColumnsMatching.filter(e => e.ColumnFrom && e.ColumnTo);
        if (!machCol.length)
            throw new Error('Не задано соответствие колонок');
        const setId = 'createLoadingTable';
        this.DynamicPropsClearSet(setId);
        this.DynamicPropsPush('add', 'label', 'Temp table', '', 'TempTable', setId);
        this.DynamicPropsPush('add', 'label', 'Loading table', '', 'LoadingTable', setId);
        for (const col of machCol) {
            this.DynamicPropsPush('add', 'type', 'string', col.ColumnTo, 'TempTable', setId);
            this.DynamicPropsPush('add', 'type', col.ColumnToType, col.ColumnTo, 'LoadingTable', setId);
            this.DynamicPropsPush('add', 'label', col.ColumnToLabel, col.ColumnTo, 'TempTable', setId);
            this.DynamicPropsPush('add', 'label', col.ColumnToLabel, col.ColumnTo, 'LoadingTable', setId);
        }
        this.DynamicPropsPush('add', 'type', 'number', 'Errors', 'TempTable', setId);
        this.DynamicPropsPush('add', 'type', 'number', 'Errors', 'LoadingTable', setId);
        this.DynamicPropsPush('add', 'totals', 1, 'Errors', 'TempTable', setId);
        this.DynamicPropsPush('add', 'totals', 1, 'Errors', 'LoadingTable', setId);
        this['TempTable'] = [];
        this['LoadingTable'] = [];
    }
    async fillColumnsFrom() {
        this.DynamicPropsClearSet('fillColumnsFrom');
        this.DynamicPropsPush('mod', 'value', await this.getColumnsFrom(), 'ColumnFrom', 'ColumnsMatching', 'fillColumnsFrom');
    }
    async matchColumnsByName() {
        if (!this.ColumnsMatching.length)
            throw new Error('Не загружена структура приемника');
        const columns = await this.getColumnsFrom();
        if (!columns)
            throw new Error('Не удалось прочитать колонки из текста');
        for (const col of columns) {
            const matchedCol = this.ColumnsMatching.find(e => e.ColumnTo === col);
            if (matchedCol)
                matchedCol.ColumnFrom = col;
        }
    }
    async getColumnsFrom() {
        const pastedValue = this.Text;
        if (!pastedValue)
            return [];
        const sep = await this.getSeparators();
        const rows = pastedValue.split(sep.rows);
        if (!rows.length)
            throw new Error('Не найден разделитель строк');
        const cols = rows[0].split(sep.columns);
        if (!cols.length)
            throw new Error('Не найден разделитель колонок');
        cols.unshift('');
        return cols;
    }
    getSeparators() {
        return { rows: this.RowsSeparator || '\n', columns: this.ColumnsSeparator || '\t' };
    }
}
exports.default = FormObjectsGroupModifyServer;
//# sourceMappingURL=Form.ObjectsGroupModify.Server.js.map