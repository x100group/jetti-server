import { DocumentBase, JDocument, Props, Ref } from 'jetti-middle';

@JDocument({
  type: 'Catalog.Expense',
  description: 'Статья расходов',
  icon: 'fa fa-list',
  menu: 'Статьи расходов',
  hierarchy: 'folders',
  relations: [
    { name: 'Expense analytics', type: 'Catalog.Expense.Analytics', field: 'parent' }
  ]
})
export class CatalogExpense extends DocumentBase {

  @Props({ type: 'Catalog.Expense', hiddenInList: true, order: -1, storageType: 'folders' })
  parent: Ref = null;

  /*   @Props({ type: 'Catalog.Account' })
    Account: Ref = null; */

  @Props({ type: 'Catalog.BudgetItem', required: true })
  BudgetItem: Ref = null;

  @Props({ type: 'enum', value: ['FINRES', 'INVEST', 'COST', 'NOTASSIGN'] })
  Assign = 'FINRES';

  @Props({ type: 'string' })
  DescriptionENG = '';

}
