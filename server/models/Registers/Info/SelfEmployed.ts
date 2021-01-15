import { Props, Ref } from 'jetti-middle';
import { JRegisterInfo, RegisterInfo } from 'jetti-middle';

@JRegisterInfo({
  type: 'Register.Info.SelfEmployed',
  description: 'Self-employed',
})

export class RegisterInfoSelfEmployed extends RegisterInfo {

  @Props({ type: 'Catalog.Person', required: true })
  Person: Ref = null;

  @Props({ type: 'Catalog.Person.Contract', required: true })
  Contract: Ref = null;

  @Props({ type: 'Catalog.Person.BankAccount' })
  BankAccount: Ref = null;

  @Props({ type: 'boolean' })
  isActive: Ref = null;

  constructor(init: Partial<RegisterInfoSelfEmployed>) {
    super(init);
    Object.assign(this, init);
  }
}

