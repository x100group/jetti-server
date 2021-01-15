"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Global = void 0;
const dynamic_common_1 = require("./Dynamic/dynamic.common");
const x100_lib_1 = require("../x100.lib");
const std_lib_1 = require("../std.lib");
const moment = require("moment");
const config_1 = require("./config");
const indexedOperation_1 = require("./indexedOperation");
const jetti_middle_1 = require("jetti-middle");
class Global {
    static async init() {
        global['x100'] = x100_lib_1.x100;
        global['lib'] = std_lib_1.lib;
        global['DOC'] = std_lib_1.lib.doc;
        global['byCode'] = std_lib_1.lib.doc.byCode;
        global['moment'] = moment;
        global['isProd'] = process.env.NODE_ENV === 'production';
        await this.updateDynamicMeta();
        // console.log(global['RegisteredDocuments']);
    }
    static async updateDynamicMeta() {
        Global._dynamicFields.forEach(field => delete global[field]);
        global['RegisteredDocuments'] = await config_1.getRegisteredDocuments(); // only static
        global['dynamicMeta'] = await dynamic_common_1.getDynamicMeta();
        global['indexedOperations'] = await indexedOperation_1.getIndexedOperationsMap();
        global['RegisteredDocuments'] = await config_1.getRegisteredDocuments(); // static + dynamic
        global['configSchema'] = config_1.getConfigSchema();
    }
}
exports.Global = Global;
Global._dynamicFields = ['RegisteredDocuments', 'dynamicMeta', 'indexedOperations', 'configSchema'];
Global.x100 = x100_lib_1.x100;
Global.lib = std_lib_1.lib;
Global.isProd = global['isProd'];
// static byCode = lib.doc.byCode;
Global.DocBase = jetti_middle_1.DocumentBase;
Global.indexedOperations = () => global['indexedOperations'];
Global.dynamicMeta = () => global['dynamicMeta'];
Global.configSchema = () => global['configSchema'] || new Map;
Global.RegisteredDocuments = () => global['RegisteredDocuments'] || new Map;
Global.RegisteredDocumentDynamic = () => (global['dynamicMeta'] ? global['dynamicMeta']['RegisteredDocument'] : []);
Global.moment = () => global['moment'];
//# sourceMappingURL=global.js.map