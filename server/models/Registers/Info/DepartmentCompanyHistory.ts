import { Props, Ref } from 'jetti-middle';
import { JRegisterInfo, RegisterInfo } from 'jetti-middle';

@JRegisterInfo({
  type: 'Register.Info.DepartmentCompanyHistory',
  description: 'История изменения организации в подразделении',
})
export class DepartmentCompanyHistory extends RegisterInfo {

  @Props({ type: 'Catalog.Department', required: true, unique: true, order: 1 })
  Department: Ref = null;

  @Props({ type: 'Catalog.Department', order: 1 })
  Department2: Ref = null;

  @Props({ type: 'Catalog.Company', required: true, unique: true, order: 2 })
  company: Ref = null;

  @Props({ type: 'Catalog.Company', unique: true, order: 3 })
  company2: Ref = null;

  @Props({ type: 'Catalog.InvestorGroup', unique: true, order: 4 })
  InvestorGroup: Ref = null;

  @Props({ type: 'enum', value: ['Own organization', 'Classic franchise', 'Management franchise' ], order: 4 })
  TypeFranchise = 'Own organization';

  constructor(init: Partial<DepartmentCompanyHistory>) {
    super(init);
    Object.assign(this, init);

  }
}
