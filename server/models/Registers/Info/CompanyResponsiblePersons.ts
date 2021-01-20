import { Props, Ref } from 'jetti-middle';
import { JRegisterInfo, RegisterInfo } from 'jetti-middle';

@JRegisterInfo({
  type: 'Register.Info.CompanyResponsiblePersons',
  description: 'Ответственные лица организаций',
})
export class RegisterInfoCompanyResponsiblePersons extends RegisterInfo {

  @Props({ type: 'Catalog.Role', dimension: true })
  Role: Ref = null;

  @Props({ type: 'Types.CompanyOrCompanyGroup', dimension: true })
  companyOrGroup: Ref = null;

  @Props({ type: 'Catalog.Department', dimension: true })
  Department: Ref = null;

  @Props({ type: 'Types.CounterpartieOrPerson', resource: true })
  Loan: Ref = null;

  @Props({ type: 'Catalog.User', resource: true, required: true })
  User: Ref = null;

  @Props({ type: 'boolean', resource: true })
  isActive = false;

  constructor(init: Partial<RegisterInfoCompanyResponsiblePersons>) {
    super(init);
    Object.assign(this, init);
  }
}
