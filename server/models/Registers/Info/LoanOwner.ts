import { Props, Ref } from 'jetti-middle';
import { JRegisterInfo, RegisterInfo } from 'jetti-middle';

@JRegisterInfo({
  type: 'Register.Info.LoanOwner',
  description: 'Loan owner',
})
export class RegisterInfoLoanOwner extends RegisterInfo {

  @Props({ type: 'Catalog.InvestorGroup', dimension: true })
  InvestorGroup: Ref = null;

  @Props({ type: 'Catalog.User', required: true })
  User: Ref = null;

  @Props({ type: 'Types.CounterpartieOrPerson', required: true })
  LoanOwner: Ref = null;

  constructor(init: Partial<RegisterInfoLoanOwner>) {
    super(init);
    Object.assign(this, init);
  }
}


