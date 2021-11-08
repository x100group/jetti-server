import { Props, Ref } from 'jetti-middle';
import { JRegisterInfo, RegisterInfo } from 'jetti-middle';

@JRegisterInfo({
  type: 'Register.Info.Intl',
  description: 'Internationalization',
})
export class RegisterInfoIntl extends RegisterInfo {

  @Props({ type: 'Types.Catalog', required: true, dimension: true, isIndexed: true })
  Catalog: Ref = null;

  @Props({ type: 'string', required: true, dimension: true, isIndexed: true })
  Property = '';

  @Props({ type: 'string', required: true, dimension: true })
  Language = '';

  @Props({ type: 'string', required: true, resource: true })
  Value = '';

  @Props({ type: 'string', resource: true })
  DativeCase = '';

  @Props({ type: 'string', resource: true })
  NominativeCase = '';

  @Props({ type: 'string', resource: true })
  PrepositionalCase = '';

  constructor(init: Partial<RegisterInfoIntl>) {
    super(init);
    Object.assign(this, init);
  }
}


