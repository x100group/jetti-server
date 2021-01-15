import { Props, Ref } from 'jetti-middle';
import { JRegisterInfo, RegisterInfo } from 'jetti-middle';

@JRegisterInfo({
  type: 'Register.Info.RLS',
  description: 'Row level security',
})
export class RegisterInfoRLS extends RegisterInfo {

  @Props({ type: 'string', required: true, unique: true, order: 1 })
  user = '';

  @Props({ type: 'Catalog.Company', required: true, unique: true, order: 2 })
  company: Ref = null;

  constructor(init: Partial<RegisterInfoRLS>) {
    super(init);
    Object.assign(this, init);
  }
}
