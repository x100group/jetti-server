import { IJWTPayload } from '../interfaces/auth';
import { PropOptions } from '../interfaces/document';
import { Ref } from '../types/document-types';
export interface FormOptions {
    type: string;
    description: string;
    icon: string;
    menu: string;
    commands?: {
        label: string;
        icon: string;
        command: () => any;
    }[];
}
export declare function JForm(props: FormOptions): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        type: string;
    };
} & T;
export declare type PropOption = keyof PropOptions;
export declare class DynamicProps {
    Kind: string;
    Table: string;
    Filed: string;
    Options: string;
    OptionsValue: string;
    SetId: string;
}
export declare class FormBase {
    constructor(user?: IJWTPayload);
    user: IJWTPayload;
    id: string;
    type: string;
    date: Date;
    code: string;
    description: string;
    company: Ref;
    posted: boolean;
    deleted: boolean;
    parent: Ref;
    isfolder: boolean;
    info: string;
    timestamp: Date | null;
    dynamicProps: DynamicProps[];
    private targetProp;
    Prop(propertyKey?: string): PropOptions | FormOptions;
    Props(): {
        [x: string]: PropOptions;
    };
    DynamicPropsAdd(props: {
        [x: string]: PropOptions;
    }): void;
    DynamicPropsMod(props: {
        [x: string]: PropOptions;
    }): void;
    DynamicPropsDel(props: {
        [x: string]: PropOptions;
    }): void;
    DynamicPropsPush(kind: 'add' | 'mod' | 'del', options: PropOption, optionsValue: any, filed?: string, table?: string, setId?: string): void;
    DynamicPropsClearSet(setId: any): void;
    DynamicPropsAddForObject(object: any, propName: string, setId: string): void;
    DynamicPropsAddForArray(object: Array<any>, propName: string, setId: string): void;
}
export declare function getInnerSimpleTypeByObject(obj: any): string;
