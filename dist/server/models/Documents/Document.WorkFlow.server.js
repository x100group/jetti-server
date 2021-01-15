"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentWorkFlowServer = void 0;
const std_lib_1 = require("../../std.lib");
const documents_factory_server_1 = require("../documents.factory.server");
const Document_WokrFlow_1 = require("./Document.WokrFlow");
class DocumentWorkFlowServer extends Document_WokrFlow_1.DocumentWorkFlow {
    async onValueChanged(prop, value, tx) {
        switch (prop) {
            case 'company':
                return this;
            default:
                return this;
        }
    }
    async onCommand(command, args, tx) {
        switch (command) {
            case 'company':
                return {};
            default:
                return {};
        }
    }
    async baseOn(source, tx) {
        const ISource = await std_lib_1.lib.doc.byId(source, tx);
        if (!ISource)
            return this;
        const documentOperation = await documents_factory_server_1.createDocumentServer(ISource.type, ISource, tx);
        this.parent = ISource.id;
        this.Document = ISource.id;
        this.company = documentOperation.company;
        this.user = documentOperation.user;
        this.Status = 'PREPARED';
        this.posted = false;
        return this;
    }
    async onPost(tx) {
        const Registers = { Account: [], Accumulation: [], Info: [] };
        return Registers;
    }
}
exports.DocumentWorkFlowServer = DocumentWorkFlowServer;
//# sourceMappingURL=Document.WorkFlow.server.js.map