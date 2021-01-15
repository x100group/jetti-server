"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormListFilter {
    constructor(left, center = '=', right = null, isFixed) {
        this.left = left;
        this.center = center;
        this.right = right;
        this.isFixed = isFixed;
    }
}
exports.FormListFilter = FormListFilter;
class FormListOrder {
    constructor(field) {
        this.field = field;
        this.order = '';
    }
}
exports.FormListOrder = FormListOrder;
class FormListSettings {
    constructor() {
        this.filter = [];
        this.order = [];
    }
}
exports.FormListSettings = FormListSettings;
//# sourceMappingURL=form-list.js.map