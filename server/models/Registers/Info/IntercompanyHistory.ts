import { Props, Ref } from 'jetti-middle';
import { JRegisterInfo, RegisterInfo } from 'jetti-middle';

@JRegisterInfo({
  type: 'Register.Info.IntercompanyHistory',
  description: 'История Интеркомпани',
})
export class RegisterInfoIntercompanyHistory extends RegisterInfo {

  @Props({ type: 'Catalog.Company' })
  Intercompany: Ref = null;

  constructor(init: Partial<RegisterInfoIntercompanyHistory>) {
    super(init);
    Object.assign(this, init);


  }
}
