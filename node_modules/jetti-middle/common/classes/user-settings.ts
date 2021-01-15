import { FormListSettings } from './form-list';

export class UserDefaultsSettings {
    company: string;
    department: string;
}

export class UserSettings {
    formListSettings: { [x: string]: FormListSettings } = { '': new FormListSettings() };
    defaults = new UserDefaultsSettings();
}
