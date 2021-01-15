"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogProductServer = void 0;
const std_lib_1 = require("../../std.lib");
const Catalog_Product_1 = require("./Catalog.Product");
class CatalogProductServer extends Catalog_Product_1.CatalogProduct {
    async onCommand(command, args, tx) {
        if (this[command])
            await this[command](tx);
        return this;
    }
    async SavePropsValuesInChilds(tx) {
        const childs = await std_lib_1.lib.doc.Descendants(this.id, tx);
        if (!childs)
            return;
        const props = this.Props();
        const propNames = Object.keys(props).filter(e => props[e].useIn === 'all');
        for (const child of childs) {
            const ob = await std_lib_1.lib.doc.createDocServerById(child.id, tx);
            let modify = false;
            for (const propName of propNames) {
                modify = modify || ob[propName] !== this[propName];
                ob[propName] = this[propName];
            }
            if (modify)
                await std_lib_1.lib.doc.saveDoc(ob, tx);
        }
        // this.PropsAdd('afterSavePropsValuesInChildsText', { value: `Saved in ${childs.length} elements` });
    }
    async onValueChanged(prop, value, tx) {
        const methodName = `onValueChanged_${prop}`;
        if (this[methodName])
            await this[methodName](value.id, tx);
        return this;
    }
    async onCreate(tx) {
        await this.onValueChanged_ProductKind(this.ProductKind, tx);
        return this;
    }
    async onValueChanged_ProductKind(kindId, tx) {
        if (!kindId)
            return this;
        const kind = await std_lib_1.lib.doc.byIdT(kindId, tx);
        const props = this.Props();
        const propNames = Object.keys(props).filter(e => props[e].order === 666);
        for (const propName of propNames) {
            const param = kind['Parameters'] ? kind['Parameters'].find(e => e.PropName === propName) : null;
            props[propName].hidden = !param || !param.Visible;
            props[propName].readOnly = !!(param && param.Readonly);
            props[propName].required = !!(param && param.Required && param.Visible);
        }
        this.Props = () => props;
    }
}
exports.CatalogProductServer = CatalogProductServer;
//# sourceMappingURL=Catalog.Product.server.js.map