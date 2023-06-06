import { CatalogSubcount } from './../models/Catalogs/Catalog.Subcount';
import { CatalogCatalogs } from './Catalogs/Catalog.Catalogs';
import { CatalogDocuments } from './Catalogs/Catalog.Documents';
import { CatalogObjects } from './Catalogs/Catalog.Objects';
import { DocumentBase, DocumentOptions, PropOptions, CopyTo, SQLGenegator } from 'jetti-middle';
import { createDocument, RegisteredDocumentStatic, RegisteredDocumentType, RegisteredDocuments } from './documents.factory';
import { ComplexTypes } from './documents.types';
import { CatalogForms } from './Catalogs/Catalog.Forms';
import { Global } from './global';
import { lib } from '../std.lib';
import { createTypes, RegisteredTypes } from './Types/Types.factory';

export interface IConfigSchema {
  type: string;
  description?: string;
  icon?: string;
  menu?: string;
  prefix?: string;
  QueryObject?: string;
  QueryList: string;
  dimensions?: { [x: string]: string }[];
  copyTo?: CopyTo[];
  Props: { [x: string]: PropOptions };
  Prop?: DocumentOptions;
  doc?: DocumentBase;
}

export function configSchema(): Map<string, IConfigSchema> {
  return Global.configSchema();
}

export function getConfigSchema() {
  if (!RegisteredDocuments().size) return new Map;

  const docs = ConfigSchemaFromRegisteredDocument([...RegisteredDocuments().values()])
    .map((i): [string, IConfigSchema] => [i.type, i]);

  const types = RegisteredTypes.map(el => {
    const doc = createTypes(el.type as ComplexTypes);
    const fakeDoc = new DocumentBase();
    fakeDoc.type = el.type as any;
    return ([el.type, {
      type: el.type as ComplexTypes,
      QueryList: doc.QueryList(),
      Props: fakeDoc.Props()
    }]);
  });

  return new Map([...docs, ...types as any]);
}

export function ConfigSchemaFromRegisteredDocument(documents: RegisteredDocumentType[]): IConfigSchema[] {
  SQLGenegator.storedInTablesTypes = Global.storedInTablesTypes();
  return [
    ...documents.map(el => {
      const doc = createDocument(el.type);
      const Prop = doc.Prop() as DocumentOptions;
      const Props = doc.Props();
      const result: IConfigSchema = ({
        type: el.type,
        description: Prop.description,
        icon: Prop.icon,
        menu: Prop.menu,
        prefix: Prop.prefix,
        dimensions: Prop.dimensions,
        // QueryObject: SQLGenegator.QueryObject(Props, el.type),
        QueryList: SQLGenegator.QueryList(Props, el.type),
        Props: Props,
        Prop: Prop,
        copyTo: Prop.copyTo,
        doc: doc
      });
      if (el.type === 'Catalog.Subcount') { result.QueryList = (doc as CatalogSubcount).QueryList(); }
      if (el.type === 'Catalog.Documents') { result.QueryList = (doc as CatalogDocuments).QueryList(); }
      if (el.type === 'Catalog.Catalogs') { result.QueryList = (doc as CatalogCatalogs).QueryList(); }
      if (el.type === 'Catalog.Objects') { result.QueryList = (doc as CatalogObjects).QueryList(); }
      if (el.type === 'Catalog.Forms') { result.QueryList = (doc as CatalogForms).QueryList(); }
      return result;
    })];
}

export async function storedInTablesTypes(): Promise<{ [x: string]: string }> {
  const allDocs = Global.RegisteredDocuments();
  const res = {};
  [...allDocs.values()]
    .filter(e => (createDocument(e.type).Prop() as DocumentOptions).storedIn === 'table')
    .forEach(e => res[e.type] = true);
  return res;
}

export async function getRegisteredDocuments(): Promise<Map<string, RegisteredDocumentType>> {
  const dynamicTypes = Global.RegisteredDocumentDynamic();
  const res = new Map<string, RegisteredDocumentType>();
  const allTypes = lib.util.groupArray<string>(
    [...dynamicTypes.map(e => e.type),
    ...RegisteredDocumentStatic.map(e => e.type)]).sort();
  allTypes.forEach(type => {
    const dynamicType = dynamicTypes.find(e => e.type === type);
    if (dynamicType) res.set(type, dynamicType);
    else {
      const staticType = RegisteredDocumentStatic.find(e => e.type === type);
      res.set(type, { ...staticType!, dynamic: false });
    }
  });
  return res;
}
