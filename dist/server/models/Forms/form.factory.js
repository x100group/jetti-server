"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisteredForms = exports.createForm = void 0;
const Form_ObjectsGroupModify_1 = require("./Form.ObjectsGroupModify");
const Form_PostAfterEchange_1 = require("./Form.PostAfterEchange");
const Form_BusinessProcessTasks_1 = require("./Form.BusinessProcessTasks");
const Form_SearchAndReplace_1 = require("./Form.SearchAndReplace");
const Form_QueueManager_1 = require("./Form.QueueManager");
function createForm(init) {
    if (init && init.type) {
        const doc = exports.RegisteredForms.get(init.type);
        if (doc) {
            const result = new doc();
            Object.assign(result, init);
            return result;
        }
    }
    throw new Error(`createForm: FORM type ${init && init.type} is not registered.`);
}
exports.createForm = createForm;
exports.RegisteredForms = new Map([
    ['Form.PostAfterEchange', Form_PostAfterEchange_1.PostAfterEchange],
    ['Form.SearchAndReplace', Form_SearchAndReplace_1.FormSearchAndReplace],
    ['Form.BusinessProcessTasks', Form_BusinessProcessTasks_1.FormBusinessProcessTasks],
    ['Form.ObjectsGroupModify', Form_ObjectsGroupModify_1.FormObjectsGroupModify],
    ['Form.QueueManager', Form_QueueManager_1.FormQueueManager],
]);
//# sourceMappingURL=form.factory.js.map