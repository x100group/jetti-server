import { Props, Ref } from 'jetti-middle';
import { JRegisterInfo, RegisterInfo } from 'jetti-middle';

@JRegisterInfo({
  type: 'Register.Info.DepartmentStatus',
  description: 'Статус подразделения',
})
export class RegisterInfoDepartmentStatus extends RegisterInfo {

  @Props({ type: 'Catalog.RetailNetwork', dimension: true })
  RetailNetwork: Ref = null;

  @Props({ type: 'Catalog.Department', dimension: true })
  Department: Ref = null;

  @Props({ type: 'date' })
  BeginDate = null;

  @Props({ type: 'date' })
  EndDate = null;

  @Props({ type: 'string' })
  Info = '';

  @Props({ type: 'Catalog.Department.StatusReason' })
  StatusReason: Ref = null;

  constructor(init: Partial<RegisterInfoDepartmentStatus>) {
    super(init);
    Object.assign(this, init);


  }
}
