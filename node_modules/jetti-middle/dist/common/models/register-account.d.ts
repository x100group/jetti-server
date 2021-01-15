import { Ref } from "../types/document-types";
export interface SubCount {
    id: string;
    code: string;
    type: string;
    value: string;
}
export interface Account {
    account: string;
    description: string;
    subcount1: SubCount;
    subcount2: SubCount;
    subcount3: SubCount;
    subcount4: SubCount;
    currency: string;
    qty: number;
}
export interface AccountRegister {
    document: {
        id: string;
        value: string;
        code: string;
        type: string;
    };
    date: string;
    debit: Account;
    kredit: Account;
    sum: number;
    company: string;
}
export interface RegisterAccount {
    debit: {
        account: Ref;
        subcounts: any[];
        qty?: number;
        currency?: Ref;
        sum?: number;
    };
    kredit: {
        account: Ref;
        subcounts: any[];
        qty?: number;
        currency?: Ref;
        sum?: number;
    };
    operation?: Ref;
    company?: Ref;
    sum: number;
}
