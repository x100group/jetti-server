"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormListSettings = exports.FormListOrder = exports.FormListFilter = exports.FilterInterval = exports.UserDefaultsSettings = exports.UserSettings = void 0;
class UserSettings {
    constructor() {
        this.formListSettings = { '': new FormListSettings() };
        this.defaults = new UserDefaultsSettings();
    }
}
exports.UserSettings = UserSettings;
class UserDefaultsSettings {
}
exports.UserDefaultsSettings = UserDefaultsSettings;
class FilterInterval {
}
exports.FilterInterval = FilterInterval;
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
//# sourceMappingURL=user.settings.js.map