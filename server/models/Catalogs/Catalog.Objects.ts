import { buildSubcountQueryList, DocumentBase, DocumentOptions, JDocument, Props, Ref, Type } from 'jetti-middle';
import { createDocument, RegisteredDocumentsTypes } from '../documents.factory';

@JDocument({
  type: 'Catalog.Objects',
  description: 'Objects types',
  icon: '',
  menu: 'Obicts types',
})
export class CatalogObjects extends DocumentBase {
  @Props({ type: 'Catalog.Documents', hiddenInList: true, order: -1 })
  parent: Ref = null;


  QueryList() {
    const select = RegisteredDocumentsTypes(el => Type.isRefType(el.type))
      .map(type => ({ type, description: (<DocumentOptions>(createDocument(type).Prop())).description }));

    return buildSubcountQueryList(select);
  }

}
