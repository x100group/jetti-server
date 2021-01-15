import { FormListSettings } from '../classes/form-list';
import { ColumnDef } from '../interfaces/column';
import { PropOptions } from '../interfaces/document';
export declare let NUMBER_STYLE: {
    'width': string;
    'text-align': string;
};
export declare let BOOLEAN_STYLE: {
    'width': string;
    'text-align': string;
};
export declare let DATETIME_STYLE: {
    'width': string;
    'text-align': string;
};
export declare let DEFAULT_STYLE: {
    'width': string;
    'min-width': string;
    'max-width': string;
};
export declare let ENUM_STYLE: {
    'width': string;
};
export declare function buildColumnDef(view: {
    [x: string]: PropOptions;
}, settings: FormListSettings): ColumnDef[];
