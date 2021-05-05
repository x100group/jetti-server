import { DocumentBase, JDocument, Props, Ref } from 'jetti-middle';

@JDocument({
  type: 'Catalog.ReasonTypes',
  description: 'Вид причины',
  icon: 'fa fa-list',
  menu: 'Виды причин',
  hierarchy: 'folders'
})
export class CatalogReasonTypes extends DocumentBase {

  @Props({ type: 'Catalog.ReasonTypes' })
  parent: Ref = null;

  @Props({ type: 'boolean' })
  WriteOff = false;

  @Props({ type: 'Catalog.ExpenseOrIncome' })
  Expense: Ref = null;

  @Props({ type: 'Catalog.Expense.Analytics', owner: [{ dependsOn: 'Expense', filterBy: 'parent' }] })
  ExpenseAnalynic: Ref = null;

}
