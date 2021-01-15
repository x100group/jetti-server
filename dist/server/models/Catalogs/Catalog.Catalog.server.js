"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogCatalogServer = void 0;
const Catalog_Catalog_1 = require("./Catalog.Catalog");
const mssql_1 = require("../../mssql");
const jetti_middle_1 = require("jetti-middle");
const std_lib_1 = require("../../std.lib");
const dynamic_common_1 = require("../Dynamic/dynamic.common");
const sql_pool_x100_DATA_1 = require("../../sql.pool.x100-DATA");
const jetti_middle_2 = require("jetti-middle");
class CatalogCatalogServer extends Catalog_Catalog_1.CatalogCatalog {
    async onCommand(command, args, tx) {
        await this[command](args, tx);
        return this;
    }
    async updateSQLViews() {
        await std_lib_1.lib.meta.updateSQLViewsByType(this.typeString);
    }
    async createSequence() {
        if (!this.prefix)
            throw new Error('Prefix must be specified');
        const err = await std_lib_1.getAdminTX().metaSequenceCreate(`Sq.${this.typeString}`);
        if (err)
            throw Error(err);
    }
    async updateSQLViewsX100DATA() {
        await std_lib_1.lib.meta.updateSQLViewsByType(this.typeString, new mssql_1.MSSQL(sql_pool_x100_DATA_1.x100DATA_POOL), false);
    }
    async riseUpdateMetadataEvent() {
        await dynamic_common_1.riseUpdateMetadataEvent();
    }
    getPropsAsParameter(propsName, props) {
        const res = new Catalog_Catalog_1.Parameter;
        const paramPropsKeys = Object.keys(res);
        const paramProps = {};
        res.parameter = propsName;
        res.type = props.type.toString();
        res.label = props.label || propsName;
        res.required = props.required || false;
        res.order = props.order || 0;
        res.change = props.change || '';
        Object.keys(props)
            .filter(key => !paramPropsKeys.includes(key) && key !== propsName)
            .forEach(key => paramProps[key] = props[key]);
        if (Object.keys(paramProps).length) {
            res.Props = JSON.stringify(paramProps);
        }
        if (res.type === 'table')
            res.tableDef = JSON.stringify(props[propsName]);
        return res;
    }
    async fillByType(tx) {
        if (!this.typeString)
            throw new Error('Type is not defined');
        const mapDimension = (dimension) => ({ name: Object.keys(dimension)[0], type: dimension[Object.keys(dimension)[0]] });
        const doc = await std_lib_1.lib.doc.createDocServer(this.typeString, undefined, tx);
        const prop = doc.Prop();
        const thisProp = this.Prop();
        const thisPropKeys = Object.keys(thisProp).filter(e => e !== 'type');
        Object.keys(prop)
            .filter(key => thisPropKeys.includes(key))
            .forEach(key => this[key] = prop[key]);
        this.relations = prop['relations'];
        this.dimensions = prop['dimensions'] ? prop['dimensions'].map(e => mapDimension(e)) : [];
        this.Parameters = [];
        const props = doc.Props();
        const commonProps = [...Object.keys((new jetti_middle_1.DocumentBase).Props()).filter(key => key !== 'parent'), 'type'];
        const propsKeys = Object.keys(props).filter(key => !commonProps.includes(key));
        this.Parameters = propsKeys.map(key => this.getPropsAsParameter(key, props[key]));
        return this;
    }
    async beforeDelete(tx) { return this; }
    async getDynamicMetadata() {
        return { type: this.typeString, Prop: await this.getProp(), Props: await this.getProps() };
    }
    async getProp() {
        return () => {
            const mapDimension = (dimension) => {
                const res = {};
                res[dimension.name] = dimension.name;
                res['type'] = dimension.type;
                return res;
            };
            const props = {
                type: this.typeString,
                description: this.description,
                presentation: this.presentation,
                icon: this.icon,
                menu: this.menu,
                prefix: this.prefix,
                hierarchy: this.hierarchy === 'none' ? undefined : this.hierarchy,
                module: this.module,
                dimensions: this.dimensions ? this.dimensions.map(e => mapDimension(e)) : [],
                relations: this.relations || [],
                copyTo: this.CopyTo || [],
                commands: this.commandsOnServer
            };
            return props;
        };
    }
    async getProps() {
        const res = (new jetti_middle_1.DocumentBase()).Props();
        if (jetti_middle_2.Type.isCatalog(this.typeString) && Object.keys(res).includes('date'))
            res.date.hidden = true;
        const getParameterAsProps = (param) => {
            let props = { label: param.label, type: param.type, order: param.order, required: param.required };
            if (param.Props)
                props = Object.assign(Object.assign({}, props), JSON.parse(param.Props));
            if (!param.tableDef)
                return props;
            props[param.parameter] = JSON.parse(param.tableDef);
            return props;
        };
        for (const param of this.Parameters) {
            res[param.parameter] = getParameterAsProps(param);
        }
        if (Object.keys(res).includes('code')) {
            const metadata = (await this.getProp())();
            if (metadata && metadata.prefix) {
                res.code.label = (res.code.label || 'code') + ' (auto)';
                res.code.required = false;
            }
        }
        res['type'] = { type: 'string', hidden: true, hiddenInList: true };
        return () => res;
    }
}
exports.CatalogCatalogServer = CatalogCatalogServer;
//# sourceMappingURL=Catalog.Catalog.server.js.map