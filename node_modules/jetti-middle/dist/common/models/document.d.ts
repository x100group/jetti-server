import 'reflect-metadata';
import { DocumentOptions, IFlatDocument, PropOptions } from '../interfaces/document';
import { Ref } from '../types/document-types';
export declare const symbolProps: unique symbol;
export declare function Props(props: PropOptions): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function JDocument(props: DocumentOptions): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        type: string;
    };
} & T;
export declare class DocumentBase {
    id: string;
    type: string;
    date: Date;
    code: string;
    description: string;
    company: Ref;
    user: Ref;
    posted: boolean;
    deleted: boolean;
    parent: Ref;
    isfolder: boolean;
    info: string;
    timestamp: Date | null;
    workflow: Ref;
    private targetProp;
    Prop(propertyKey?: string): PropOptions | DocumentOptions;
    get isDoc(): boolean;
    get isCatalog(): boolean;
    get isType(): boolean;
    get isJornal(): boolean;
    Props(): {
        [x: string]: PropOptions;
    };
    map(doc: IFlatDocument): void;
    getPropsWithOption(propOptions: keyof PropOptions, propsValue: any): {
        [x: string]: PropOptions;
    };
}
