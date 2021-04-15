import { DocumentBase, JDocument, Props, Ref } from 'jetti-middle';

@JDocument({
  type: 'Catalog.Person',
  description: 'Физлицо',
  icon: 'fa fa-list',
  menu: 'Физлица',
  prefix: 'PERS-',
  relations: [
    { name: 'Contract', type: 'Catalog.Person.Contract', field: 'owner' },
    { name: 'BankAccount', type: 'Catalog.Person.BankAccount', field: 'owner' },
    { name: 'Employee', type: 'Catalog.Employee', field: 'Person' },
    { name: 'Loan', type: 'Catalog.Loan', field: 'owner' }
  ],
  dimensions: [
    { Department: 'Catalog.Department' },
    { JobTitle: 'Catalog.JobTitle' }
  ]
})
export class CatalogPerson extends DocumentBase {

  @Props({ type: 'Catalog.Person', hiddenInList: true, order: -1 })
  parent: Ref = null;

  @Props({ type: 'enum', value: ['MALE', 'FEMALE', 'SELF'] })
  Gender = null;

  @Props({ type: 'string' })
  FirstName = '';

  @Props({ type: 'string' })
  LastName = '';

  @Props({ type: 'string' })
  MiddleName = '';

  @Props({ type: 'string', isIndexed: true })
  Code1 = '';

  @Props({ type: 'string' })
  Code2 = '';

  @Props({ type: 'string' })
  Address = '';

  @Props({ type: 'string' })
  AddressResidence = '';

  @Props({ type: 'string' })
  City = '';

  @Props({ type: 'string' })
  Phone = '';

  @Props({ type: 'string' })
  PersonalPhone = '';

  @Props({ type: 'string' })
  Email = '';

  @Props({ type: 'string' })
  PersonalEmail = '';

  @Props({ type: 'date' })
  Birthday = null;

  @Props({ type: 'date' })
  EmploymentDate = null;

  @Props({ type: 'Catalog.Department', isIndexed: true })
  Department: Ref = null;

  @Props({ type: 'Catalog.JobTitle' })
  JobTitle: Ref = null;

  @Props({ type: 'Catalog.Country' })
  Country: Ref = null;

  @Props({ type: 'string', isIndexed: true })
  Profile = '';

  @Props({ type: 'Catalog.PersonIdentity' })
  DocumentType: Ref = null;

  @Props({ type: 'string' })
  DocumentCode = '';

  @Props({ type: 'string' })
  DocumentNumber = '';

  @Props({ type: 'date' })
  DocumentDate = null;

  @Props({ type: 'string' })
  DocumentAuthority = '';

  @Props({ type: 'string', isAdditional: true, isIndexed: true, isUnique: true })
  AccountAD = '';

  @Props({ type: 'string', label: 'SM/Account', isAdditional: true, isUnique: true })
  SMAccount = '';

  @Props({ type: 'string', label: 'Pincode', validators: [{ key: 'maxLength', value: 4 }] })
  Pincode = '';

  @Props({ type: 'boolean', hiddenInList: false, isAdditional: true })
  Fired = false;

}
