import { matchOperator } from '../types/common';
export declare class FormListFilter {
    left: string;
    center: matchOperator;
    right: any;
    isFixed?: boolean | undefined;
    constructor(left: string, center?: matchOperator, right?: any, isFixed?: boolean | undefined);
}
export declare class FormListOrder {
    field: string;
    order: 'asc' | 'desc' | '';
    constructor(field: string);
}
export declare class FormListSettings {
    filter: FormListFilter[];
    order: FormListOrder[];
}
