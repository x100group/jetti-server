"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSheduledTasks = void 0;
const Form_PostAfterEchange_server_1 = require("../Forms/Form.PostAfterEchange.server");
async function startSheduledTasks() {
    const user = {
        description: 'user for task sheduler',
        email: '',
        isAdmin: true,
        env: {},
        roles: ['Admin']
    };
    const PostAfterEchangeServerForm = new Form_PostAfterEchange_server_1.default(user);
    // await PostAfterEchangeServerForm.Execute();
}
exports.startSheduledTasks = startSheduledTasks;
//# sourceMappingURL=sheduled.js.map