import { Props, Ref } from 'jetti-middle';
import { JRegisterAccumulation, RegisterAccumulation } from 'jetti-middle';

@JRegisterAccumulation({
  type: 'Register.Accumulation.CharityAnalytic',
  description: 'Аналитика благотворительности'
})
export class RegisterAccumulationCharityAnalytic extends RegisterAccumulation {

  @Props({ type: 'Catalog.Operation.Type', dimension: true })
  Analytics: Ref = null;

  @Props({ type: 'Catalog.Operation.Type', dimension: true })
  MovementType: Ref = null;

  @Props({ type: 'Types.CounterpartieOrPerson', dimension: true })
  Creator: Ref = null;

  @Props({ type: 'Types.CounterpartieOrPersonContract', dimension: true })
  CreatorContract: Ref = null;

  @Props({ type: 'Types.CounterpartieOrPerson', dimension: true })
  Recipient: Ref = null;

  @Props({ type: 'Types.CounterpartieOrPersonContract', dimension: true })
  RecipientContract: Ref = null;

  @Props({ type: 'Catalog.Documents', dimension: true })
  Batch: Ref = null;

  @Props({ type: 'Catalog.Catalogs', dimension: true })
  Source: Ref = null;

  @Props({ type: 'Catalog.Currency', required: true, dimension: true })
  currency: Ref = null;

  @Props({ type: 'number', resource: true })
  Amount = 0;

  @Props({ type: 'number', resource: true })
  AmountInBalance = 0;

  @Props({ type: 'number', resource: true })
  AmountInAccounting = 0;

  @Props({ type: 'string' })
  Info = '';

  constructor(init: Partial<RegisterAccumulationCharityAnalytic>) {
    super(init);
    Object.assign(this, init);
  }
}
