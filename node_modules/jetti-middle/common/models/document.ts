import 'reflect-metadata';
import { v1 } from 'uuid';
import { Type } from '../helpers/type';
import { DocumentOptions, IFlatDocument, PropOptions } from '../interfaces/document';
import { Ref } from '../types/document-types';

export const symbolProps = Symbol('Props');

export function Props(props: PropOptions) {
  return Reflect.metadata(symbolProps, props);
}

export function JDocument(props: DocumentOptions) {
  return function classDecorator<T extends new (...args: any[]) => {}>(constructor: T) {
    Reflect.defineMetadata(symbolProps, props, constructor);
    return class extends constructor {
      type = props.type;
    };
  };
}

export class DocumentBase {

  @Props({ type: 'string', hidden: true, hiddenInList: true })
  id = v1().toLocaleUpperCase();

  @Props({ type: 'string', hidden: true, hiddenInList: true })
  type: string;

  @Props({ type: 'datetime', order: 1 })
  date = new Date();

  @Props({ type: 'string', required: true, order: 2, style: { width: '135px' } })
  code = '';

  @Props({ type: 'string', order: 3, required: true, style: { width: '300px' } })
  description = '';

  @Props({ type: 'Catalog.Company', required: false, order: 4, style: { width: '250px' } })
  company: Ref = null;

  @Props({ type: 'Catalog.User', hiddenInList: true, order: -1 })
  user: Ref = null;

  @Props({ type: 'boolean', hidden: true, hiddenInList: true })
  posted = false;

  @Props({ type: 'boolean', hidden: true, hiddenInList: true })
  deleted = false;

  @Props({ type: 'Types.Subcount', hidden: true, hiddenInList: true, order: -1 })
  parent: Ref = null;

  @Props({ type: 'boolean', hidden: true, hiddenInList: true })
  isfolder = false;

  @Props({ type: 'string', hiddenInList: true, order: -1, controlType: 'textarea' })
  info = '';

  @Props({ type: 'datetime', hiddenInList: true, order: -1, hidden: true })
  timestamp: Date | null = null;

  @Props({ type: 'Document.WorkFlow', hiddenInList: true, order: -1, hidden: true })
  workflow: Ref = null;

  private targetProp(target: Object, propertyKey: string): PropOptions {
    const result = Reflect.getMetadata(symbolProps, target, propertyKey);
    return result;
  }

  Prop(propertyKey: string = 'this'): PropOptions | DocumentOptions {
    if (propertyKey === 'this') {
      return Reflect.getMetadata(symbolProps, this.constructor);
    } else {
      return Reflect.getMetadata(symbolProps, this.constructor.prototype, propertyKey);
    }
  }

  get isDoc() { return Type.isDocument(this.type); }
  get isCatalog() { return Type.isCatalog(this.type); }
  get isType() { return Type.isType(this.type); }
  get isJornal() { return Type.isJournal(this.type); }

  Props() {

    const proto = new this.constructor.prototype.constructor;

    this.targetProp(proto, 'description').hidden = proto.isDoc;
    this.targetProp(proto, 'date').hidden = proto.isCatalog;
    this.targetProp(proto, 'date').required = proto.isDoc;
    const p = this.Prop() as DocumentOptions;
    if (p && p.hierarchy === 'folders') this.targetProp(proto, 'parent').storageType = 'folders';
    else if (p && p.hierarchy === 'elements') this.targetProp(proto, 'parent').storageType = 'elements';
    else if (p && p.hierarchy === 'all') this.targetProp(proto, 'parent').storageType = 'all';
    else this.targetProp(proto, 'parent').storageType = 'elements';

    const result: { [x: string]: PropOptions } = {};
    // const commonProps = `id,type,date,code,description,company,user,posted,deleted,parent,isfolder,info,timestamp`.split(',');
    const commonProps = Object.keys(new DocumentBase);
    commonProps.push('type');
    for (const prop of Object.keys(proto)) {
      const Prop = proto.targetProp(this, prop) as PropOptions;
      if (!Prop ||
        (commonProps.indexOf(prop) === -1 && (
          (Prop.useIn === 'folders' && !this.isfolder) ||
          ((Prop.useIn === 'elements' || !Prop.useIn) && this.isfolder)))) { continue; }
      result[prop] = Object.assign({}, Prop);
      const metadata = proto.Prop() as DocumentOptions;
      if (metadata && metadata.hierarchy === undefined) metadata.hierarchy = 'elements';
      if (prop === 'code') {
        if (metadata && metadata.prefix) {
          result[prop].label = (Prop.label || prop) + ' (auto)';
          result[prop].required = false;
        }
      }
      for (const el in result[prop]) {
        if (typeof result[prop][el] === 'function') result[prop][el] = result[prop][el].toString();
      }
      const value = (proto as any)[prop];
      if (Array.isArray(value) && value.length) {
        const arrayProp: { [x: string]: any } = {};
        for (const arrProp of Object.keys(value[0])) {
          const PropArr = proto.targetProp(value[0], arrProp);
          if (!PropArr) { continue; }
          arrayProp[arrProp] = Object.assign({}, PropArr);
          for (const el in arrayProp[arrProp]) {
            if (typeof arrayProp[arrProp][el] === 'function') arrayProp[arrProp][el] = arrayProp[arrProp][el].toString();
          }
        }
        result[prop][prop] = arrayProp;
      }
    }
    if (this.isDoc) result['company'].required = true;
    this.Props = () => result;
    return result;
  }

  map(doc: IFlatDocument) {
    if (doc) Object.assign(this, doc);
  }

  getPropsWithOption(propOptions: keyof PropOptions, propsValue: any): { [x: string]: PropOptions } {
    const props = this.Props();
    const res = {};
    Object.keys(props)
      .filter(propsName => Object.keys(props[propsName])
        .find(propOpt => propOpt === propOptions && props[propsName][propOpt] === propsValue))
      .forEach(propsName => res[propsName] = props[propsName]);
    return res;
  }

}
