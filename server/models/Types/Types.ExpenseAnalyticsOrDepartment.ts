import { RegisteredDocumentsTypes } from '../documents.factory';
import { TypesBase } from './TypesBase';

export class TypesExpenseAnalyticsOrDepartment extends TypesBase {

  getTypes() {
    return RegisteredDocumentsTypes(type => ['Catalog.Expense.Analytics', 'Catalog.Department'].includes(type));
  }

}
