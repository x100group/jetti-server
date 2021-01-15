"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form_list_1 = require("./form-list");
class UserDefaultsSettings {
}
exports.UserDefaultsSettings = UserDefaultsSettings;
class UserSettings {
    constructor() {
        this.formListSettings = { '': new form_list_1.FormListSettings() };
        this.defaults = new UserDefaultsSettings();
    }
}
exports.UserSettings = UserSettings;
//# sourceMappingURL=user-settings.js.map