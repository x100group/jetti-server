"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesBase = void 0;
const documents_factory_1 = require("../documents.factory");
const jetti_middle_1 = require("jetti-middle");
class TypesBase {
    QueryList() {
        const select = this.getTypes()
            .map(el => ({ type: el, description: documents_factory_1.createDocument(el).Prop().description }));
        return jetti_middle_1.buildTypesQueryList(select);
    }
    getTypes() {
        throw new Error('Method not implemented.');
    }
}
exports.TypesBase = TypesBase;
//# sourceMappingURL=TypesBase.js.map