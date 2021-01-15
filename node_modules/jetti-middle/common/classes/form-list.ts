import { matchOperator } from '../types/common';

export class FormListFilter {
    constructor(
        public left: string,
        public center: matchOperator = '=',
        public right: any = null,
        public isFixed?: boolean) { }
}

export class FormListOrder {
    order: 'asc' | 'desc' | '' = '';

    constructor(public field: string) { }
}

export class FormListSettings {
    filter: FormListFilter[] = [];
    order: FormListOrder[] = [];
}
