import { Props, Ref } from 'jetti-middle';
import { JRegisterInfo, RegisterInfo } from 'jetti-middle';

@JRegisterInfo({
  type: 'Register.Info.ShareEmission',
  description: 'Эмиссия акций',
})
export class RegisterInfoShareEmission extends RegisterInfo {

  @Props({ type: 'Catalog.Currency' })
  currency: Ref = null;

  @Props({ type: 'number', label: 'Цена акций' })
  SharePrice = '';

  @Props({ type: 'number', label: 'Количество акций' })
  ShareQty = '';

  constructor(init: Partial<RegisterInfoShareEmission>) {
    super(init);
    Object.assign(this, init);
  }
}
