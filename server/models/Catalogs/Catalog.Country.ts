import { DocumentBase, JDocument, Props, Ref } from 'jetti-middle';

@JDocument({
  type: 'Catalog.Country',
  description: 'Страна',
  icon: 'fa fa-list',
  menu: 'Страны',
})
export class CatalogCountry extends DocumentBase {

  @Props({ type: 'Catalog.Country', hiddenInList: true, order: -1 })
  parent: Ref = null;

  @Props({ type: 'Catalog.Currency' })
  Currency: Ref = null;

  @Props({ type: 'string' })
  Alpha2Code = '';

  @Props({ type: 'string' })
  PhoneCode = '';

  @Props({ type: 'string' })
  Language = '';
}
