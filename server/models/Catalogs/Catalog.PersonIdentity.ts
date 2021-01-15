import { DocumentBase, JDocument, Props, Ref } from 'jetti-middle';

@JDocument({
  type: 'Catalog.PersonIdentity',
  description: 'Тип документа',
  icon: 'fa fa-list',
  menu: 'Типы документов'
})
export class CatalogPersonIdentity extends DocumentBase {

  @Props({ type: 'Catalog.PersonIdentity', hiddenInList: true, order: -1 })
  parent: Ref = null;

}
