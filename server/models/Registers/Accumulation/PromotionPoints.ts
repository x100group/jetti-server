import { Props, Ref } from 'jetti-middle';
import { JRegisterAccumulation, RegisterAccumulation } from 'jetti-middle';

@JRegisterAccumulation({
  type: 'Register.Accumulation.PromotionPoints',
  description: 'Бонусные баллы'
})

export class RegisterAccumulationPromotionPoints extends RegisterAccumulation {
  @Props({ type: 'Catalog.RetailNetwork', dimension: true })
  RetailNetwork: Ref = null;

  @Props({ type: 'Catalog.Department', dimension: true })
  Department: Ref = null;

  @Props({ type: 'string', dimension: true })
  OrderId = '';

  @Props({ type: 'Catalog.RetailClient', dimension: true })
  OwnerInner: Ref = null;

  @Props({ type: 'string', dimension: true })
  OwnerExternal = null;

  @Props({ type: 'Catalog.PromotionChannel', dimension: true })
  PromotionChannel: Ref = null;

  @Props({ type: 'Catalog.Currency', required: true, dimension: true })
  currency: Ref = null;

  @Props({ type: 'Types.Document', dimension: true })
  batch: Ref = null;

  @Props({ type: 'date' })
  ExpiredAt = null;

  @Props({ type: 'number', resource: true })
  Qty = 0;

  @Props({ type: 'number', resource: true })
  Amount = 0;

  @Props({ type: 'number', resource: true })
  AmountInBalance = 0;

  @Props({ type: 'number', resource: true })
  AmountInAccounting = 0;

  constructor(init: Partial<RegisterAccumulationPromotionPoints>) {
    super(init);
    Object.assign(this, init);
  }
}
