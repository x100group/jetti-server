import { DocumentBase, JDocument, Props, Ref } from 'jetti-middle';

@JDocument({
  type: 'Catalog.ResponsibilityCenter',
  description: 'ЦФО',
  icon: 'fa fa-list',
  menu: 'ЦФО',
  hierarchy: 'folders',
  module: `{const onOpen = async () => {this.readonly = this.readonly || !this.auth.isRoleAvailableResponsibilityCenterEditor()}; return {onOpen};}`,
})
export class CatalogResponsibilityCenter extends DocumentBase {

  @Props({ type: 'Catalog.ResponsibilityCenter', hiddenInList: true, order: -1 })
  parent: Ref = null;

  @Props({ type: 'enum', order: 1, required: true, value: ['COST', 'REVENUE', 'PROFIT', 'INVESTMENT'] })
  kind = '';

  @Props({ type: 'Catalog.Person', order: 2, required: true, label: 'CEO' })
  ResponsiblePerson: Ref = null;

  @Props({ type: 'Catalog.Person', order: 2, required: true, label: 'CFO' })
  ResponsiblePersonFinance: Ref = null;

  @Props({ type: 'Catalog.Currency', required: true, isProtected: true })
  Currency: Ref = null;

  @Props({ type: 'string', required: true, order: 2, style: { width: '135px' }, isProtected: true })
  code = '';

}
