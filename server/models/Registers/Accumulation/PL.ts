import { Props, Ref } from 'jetti-middle';
import { JRegisterAccumulation, RegisterAccumulation } from 'jetti-middle';

@JRegisterAccumulation({
  type: 'Register.Accumulation.PL',
  description: 'Доходы/Расходы'
})
export class RegisterAccumulationPL extends RegisterAccumulation {

  @Props({ type: 'Catalog.RetailNetwork', required: true, dimension: true })
  RetailNetwork: Ref = null;

  @Props({ type: 'Catalog.Department', required: true, dimension: true })
  Department: Ref = null;

  @Props({ type: 'Types.Catalog', required: true, dimension: true })
  PL: Ref = null;

  @Props({ type: 'Types.Catalog', required: true, dimension: true })
  Analytics: Ref = null;

  @Props({ type: 'Types.Catalog', required: true, dimension: true })
  Analytics2: Ref = null;

  @Props({ type: 'number', resource: true })
  Amount = 0;

  @Props({ type: 'string' })
  Info = '';

  constructor(init: Partial<RegisterAccumulationPL>) {
    super(init);
    Object.assign(this, init);
  }
}
