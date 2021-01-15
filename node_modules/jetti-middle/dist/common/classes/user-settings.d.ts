import { FormListSettings } from './form-list';
export declare class UserDefaultsSettings {
    company: string;
    department: string;
}
export declare class UserSettings {
    formListSettings: {
        [x: string]: FormListSettings;
    };
    defaults: UserDefaultsSettings;
}
