import { DocumentBase, JDocument, Props, Ref } from 'jetti-middle';

@JDocument({
  type: 'Catalog.Operation.Type',
  description: 'Тип операции/свойства',
  icon: 'fa fa-list',
  menu: 'Типы операций/свойств',
  prefix: 'OPERT-',
  hierarchy: 'folders'
})
export class CatalogOperationType extends DocumentBase {

  @Props({ type: 'Catalog.Operation.Type', hiddenInList: true, order: -1 })
  parent: Ref = null;

  @Props({ type: 'string', label: 'Type', panel: 'Additional prop' })
  PropType: Ref = null;

  @Props({
    type: 'json', label: 'Props', hiddenInList: true,
    style: { width: '100%' }, controlType: 'json', panel: 'Additional prop'
  })
  PropProps = '';

}
