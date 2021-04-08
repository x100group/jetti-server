import { DocumentBase, JDocument, Props, Ref } from 'jetti-middle';

@JDocument({
  type: 'Catalog.Department.Company',
  description: 'Подразделение организации',
  icon: 'fa fa-list',
  menu: 'Подразделения организаций',
  prefix: 'DEPC-',
  hierarchy: 'folders',
  relations: [
    { name: 'Employee history', type: 'Register.Info.EmployeeHistory', field: 'DepartmentCompany.id' },
  ],
  dimensions: [
    { company: 'Catalog.Company' }
  ],
  module: `{const onOpen = async () => {this.readonly = this.readonly || !this.auth.isRoleAvailableDepartmentCompanyEditor()}; return {onOpen};}`,
})
export class CatalogDepartmentCompany extends DocumentBase {

  @Props({ type: 'Catalog.Department.Company', hiddenInList: true, order: -1 })
  parent: Ref = null;


  @Props({ type: 'boolean', hidden: false, hiddenInList: true, order: 6, isIndexed: true })
  isfolder = false;

  @Props({
    type: 'enum', useIn: 'all',
    value: ['COMPANY', 'DEPARTMENT', 'DIRECTION', 'UNIT', 'NETWORK', 'REGION', 'GROUP', 'TEAM', 'BRANCH', 'SALEPOINT', 'NONE']
  })
  kind = 'NONE';

  @Props({
    type: 'string', required: false, hiddenInList: false
    , label: 'Short name (max 30 symbols)', order: 4, validators: [{ key: 'maxLength', value: 30 }]
  })
  ShortName = '';

  @Props({ type: 'string', required: false, hiddenInList: false, label: 'Security group', order: 4, useIn: 'all' })
  SecurityGroup = '';

  @Props({ type: 'Catalog.StaffingTable', label: 'Должность руководителя', useIn: 'all', order: 5 })
  StaffingPositionManager: Ref = null;

  @Props({ type: 'Catalog.StaffingTable', label: 'Должность помощника руководителя', useIn: 'all', order: 6 })
  StaffingPositionAssistant: Ref = null;
}
