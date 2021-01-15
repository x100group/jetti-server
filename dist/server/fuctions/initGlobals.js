"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x100_lib_1 = require("../x100.lib");
const std_lib_1 = require("../std.lib");
const moment = require("moment");
const dynamic_common_1 = require("../models/Dynamic/dynamic.common");
exports.initGlobal = async () => {
    global['x100'] = x100_lib_1.x100;
    global['lib'] = std_lib_1.lib;
    global['DOC'] = std_lib_1.lib.doc;
    global['byCode'] = std_lib_1.lib.doc.byCode;
    global['moment'] = moment;
    global['isProd'] = process.env.NODE_ENV === 'production';
    global['dynamicMeta'] = await dynamic_common_1.getDynamicMeta();
};
//# sourceMappingURL=initGlobals.js.map