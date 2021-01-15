"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegisteredDocuments = exports.ConfigSchemaFromRegisteredDocument = exports.getConfigSchema = exports.configSchema = void 0;
const jetti_middle_1 = require("jetti-middle");
const documents_factory_1 = require("./documents.factory");
const global_1 = require("./global");
const std_lib_1 = require("../std.lib");
const Types_factory_1 = require("./Types/Types.factory");
function configSchema() {
    return global_1.Global.configSchema();
}
exports.configSchema = configSchema;
function getConfigSchema() {
    if (!documents_factory_1.RegisteredDocuments().size)
        return new Map;
    const docs = ConfigSchemaFromRegisteredDocument([...documents_factory_1.RegisteredDocuments().values()])
        .map((i) => [i.type, i]);
    const types = Types_factory_1.RegisteredTypes.map(el => {
        const doc = Types_factory_1.createTypes(el.type);
        const fakeDoc = new jetti_middle_1.DocumentBase();
        fakeDoc.type = el.type;
        return ([el.type, {
                type: el.type,
                QueryList: doc.QueryList(),
                Props: fakeDoc.Props()
            }]);
    });
    return new Map([...docs, ...types]);
}
exports.getConfigSchema = getConfigSchema;
function ConfigSchemaFromRegisteredDocument(documents) {
    return [
        ...documents.map(el => {
            const doc = documents_factory_1.createDocument(el.type);
            const Prop = doc.Prop();
            const Props = doc.Props();
            const result = ({
                type: el.type,
                description: Prop.description,
                icon: Prop.icon,
                menu: Prop.menu,
                prefix: Prop.prefix,
                dimensions: Prop.dimensions,
                // QueryObject: SQLGenegator.QueryObject(Props, el.type),
                QueryList: jetti_middle_1.SQLGenegator.QueryList(Props, el.type),
                Props: Props,
                Prop: Prop,
                copyTo: Prop.copyTo,
                doc: doc
            });
            if (el.type === 'Catalog.Subcount') {
                result.QueryList = doc.QueryList();
            }
            if (el.type === 'Catalog.Documents') {
                result.QueryList = doc.QueryList();
            }
            if (el.type === 'Catalog.Catalogs') {
                result.QueryList = doc.QueryList();
            }
            if (el.type === 'Catalog.Objects') {
                result.QueryList = doc.QueryList();
            }
            if (el.type === 'Catalog.Forms') {
                result.QueryList = doc.QueryList();
            }
            return result;
        })
    ];
}
exports.ConfigSchemaFromRegisteredDocument = ConfigSchemaFromRegisteredDocument;
async function getRegisteredDocuments() {
    const dynamicTypes = global_1.Global.RegisteredDocumentDynamic();
    const res = new Map();
    const allTypes = std_lib_1.lib.util.groupArray([...dynamicTypes.map(e => e.type),
        ...documents_factory_1.RegisteredDocumentStatic.map(e => e.type)]).sort();
    allTypes.forEach(type => {
        const dynamicType = dynamicTypes.find(e => e.type === type);
        if (dynamicType)
            res.set(type, dynamicType);
        else {
            const staticType = documents_factory_1.RegisteredDocumentStatic.find(e => e.type === type);
            res.set(type, Object.assign(Object.assign({}, staticType), { dynamic: false }));
        }
    });
    return res;
}
exports.getRegisteredDocuments = getRegisteredDocuments;
//# sourceMappingURL=config.js.map