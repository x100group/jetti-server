import { buildSubcountQueryList, DocumentBase, DocumentOptions, JDocument, Props, Ref, Type } from 'jetti-middle';
import { createDocument, RegisteredDocumentsTypes } from '../documents.factory';

@JDocument({
  type: 'Catalog.Catalogs',
  description: 'Catalogs types',
  icon: '',
  menu: 'Catalogs types',
})
export class CatalogCatalogs extends DocumentBase {
  @Props({ type: 'Catalog.Documents', hiddenInList: true, order: -1 })
  parent: Ref = null;


  QueryList() {
    const select = RegisteredDocumentsTypes(type => Type.isCatalog(type))
      .map(type => ({ type, description: (<DocumentOptions>(createDocument(type).Prop())).description }));

    return buildSubcountQueryList(select);
  }

}
