"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesSubcount = void 0;
const documents_factory_1 = require("../documents.factory");
const jetti_middle_1 = require("jetti-middle");
const TypesBase_1 = require("./TypesBase");
class TypesSubcount extends TypesBase_1.TypesBase {
    QueryList() {
        const select = documents_factory_1.RegisteredDocumentsTypes()
            .map(type => ({ type: type, description: (documents_factory_1.createDocument(type).Prop()).description }));
        select.push({ type: 'number', description: 'number' });
        select.push({ type: 'date', description: 'date' });
        select.push({ type: 'datetime', description: 'datetime' });
        select.push({ type: 'string', description: 'string' });
        select.push({ type: 'boolean', description: 'boolean' });
        select.push({ type: 'table', description: 'table' });
        return jetti_middle_1.buildTypesQueryList(select);
    }
    getTypes() {
        return [
            ...documents_factory_1.RegisteredDocumentsTypes(),
            'number',
            'date',
            'datetime',
            'string',
            'boolean',
            'table'
        ];
    }
}
exports.TypesSubcount = TypesSubcount;
//# sourceMappingURL=Types.Subcount.js.map