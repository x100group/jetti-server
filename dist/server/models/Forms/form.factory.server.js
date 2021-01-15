"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFormServer = void 0;
const jetti_middle_1 = require("jetti-middle");
const Form_PostAfterEchange_server_1 = require("./Form.PostAfterEchange.server");
const Form_BusinessProcessTasks_1 = require("./Form.BusinessProcessTasks");
const Form_SearchAndReplace_Server_1 = require("./Form.SearchAndReplace.Server");
const Form_ObjectsGroupModify_Server_1 = require("./Form.ObjectsGroupModify.Server");
const Form_QueueManager_server_1 = require("./Form.QueueManager.server");
function createFormServer(init) {
    if (init && init.type) {
        const doc = RegisteredServerForms.get(init.type);
        if (doc) {
            const result = new doc(init.user);
            Object.assign(result, JSON.parse(JSON.stringify(init), jetti_middle_1.dateReviverUTC));
            return result;
        }
    }
    throw new Error(`createFormServer: FORM type ${init.type} is not registered`);
}
exports.createFormServer = createFormServer;
const RegisteredServerForms = new Map([
    ['Form.PostAfterEchange', Form_PostAfterEchange_server_1.default],
    ['Form.BusinessProcessTasks', Form_BusinessProcessTasks_1.FormBusinessProcessTasks],
    ['Form.SearchAndReplace', Form_SearchAndReplace_Server_1.default],
    ['Form.ObjectsGroupModify', Form_ObjectsGroupModify_Server_1.default],
    ['Form.QueueManager', Form_QueueManager_server_1.default],
]);
//# sourceMappingURL=form.factory.server.js.map