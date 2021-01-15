"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
class Type {
    static isOperation(type) {
        return !!(type && type.startsWith('Operation.'));
    }
    static isDocument(type) {
        return !!(type && (type.startsWith('Document.') || this.isOperation(type)));
    }
    static isCatalog(type) {
        return !!(type && type.startsWith('Catalog.'));
    }
    static isType(type) {
        return !!(type && type.startsWith('Types.'));
    }
    static isJournal(type) {
        return !!(type && type.startsWith('Journal.'));
    }
    static isForm(type) {
        return !!(type && type.startsWith('Form.'));
    }
    // stored types
    static isRefType(type) {
        return this.isDocument(type) || this.isCatalog(type);
    }
}
exports.Type = Type;
//# sourceMappingURL=type.js.map