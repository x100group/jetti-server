import { Props, Ref } from 'jetti-middle';
import { JRegisterInfo, RegisterInfo } from 'jetti-middle';

@JRegisterInfo({
  type: 'Register.Info.ShareEmission',
  description: 'Акции и оционы',
})
export class RegisterInfoShareEmission extends RegisterInfo {

  @Props({ type: 'Catalog.Operation.Type' })
  OperationType: Ref = null;

  @Props({ type: 'boolean' })
  isActive = false;

  @Props({ type: 'Catalog.InvestorGroup' })
  InvestorGroup: Ref = null;

  @Props({ type: 'Catalog.Company.Group' })
  CompanyGroup: Ref = null;

  @Props({ type: 'Catalog.Loan' })
  Loan: Ref = null;

  @Props({ type: 'Catalog.Person' })
  Person: Ref = null;

  @Props({ type: 'Catalog.Currency' })
  currency: Ref = null;

  @Props({ type: 'number' })
  Qty = 0;

  @Props({ type: 'number' })
  Price = 0;

  @Props({ type: 'number' })
  Amount = 0;

  @Props({ type: 'number' })
  Share = 0;

  @Props({ type: 'number' })
  ShareAmount = 0;

  constructor(init: Partial<RegisterInfoShareEmission>) {
    super(init);
    Object.assign(this, init);
  }
}
