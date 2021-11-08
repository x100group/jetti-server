import { DocumentBase, JDocument, Props, Ref } from 'jetti-middle';

@JDocument({
  type: 'Catalog.MoneyDocument',
  description: 'Денежный документ',
  icon: 'fa fa-list',
  menu: 'Денежные документы',
  hierarchy: 'folders',
})
export class CatalogMoneyDocument extends DocumentBase {

  @Props({ type: 'Catalog.MoneyDocument', hiddenInList: true, order: -1, storageType: 'folders' })
  parent: Ref = null;

  @Props({ type: 'Catalog.Operation.Type', required: true, label: 'Тип документа' })
  kind: Ref = null;

  @Props({ type: 'Catalog.Currency', required: true, label: 'Валюта' })
  currency: Ref = null;

  @Props({ type: 'TypesCounterpartieOrPerson', required: true, dimension: true, label: 'Владелец/Получатель' })
  Owner: Ref = null;

  @Props({ type: 'number', label: 'Цена' })
  Price = 0;

  @Props({ type: 'date', label: 'Действует до...' })
  ExpiredAt = new Date();

}
