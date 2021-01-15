import { FormListFilter, FormListOrder } from '../classes/form-list';
import { Ref } from '../types/document-types';

export interface DocListRequestBody {
    id: string; type: string; command: string; count: number; offset: number;
    filter: FormListFilter[];
    order: FormListOrder[];
    listOptions?: DocListOptions;
}
export interface DocListOptions {
    withHierarchy: boolean;
    hierarchyDirectionUp: boolean;
}

export interface Continuation {
    first: { id: Ref, type: string } | null;
    last: { id: Ref, type: string } | null;
}

export interface DocListResponse {
    data: any[];
    continuation: Continuation;
}
