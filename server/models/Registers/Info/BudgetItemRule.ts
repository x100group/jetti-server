import { Props, Ref } from 'jetti-middle';
import { JRegisterInfo, RegisterInfo } from 'jetti-middle';

@JRegisterInfo({
  type: 'Register.Info.BudgetItemRule',
  description: 'Budget item rules history',
})
export class RegisterInfoBudgetItemRule extends RegisterInfo {

  @Props({ type: 'Catalog.BudgetItem', required: true })
  BudgetItem: Ref = null;

  @Props({ type: 'Catalog.Scenario', required: true })
  Scenario: Ref = null;

  @Props({ type: 'javascript' })
  Rule = '';

  constructor(init: Partial<RegisterInfoBudgetItemRule>) {
    super(init);
    Object.assign(this, init);
  }
}

