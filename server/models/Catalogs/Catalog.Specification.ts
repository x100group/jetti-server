import { DocumentBase, JDocument, Props, Ref } from 'jetti-middle';

@JDocument({
  type: 'Catalog.Specification',
  description: 'Ресурсная спецификация',
  icon: 'fa fa-list',
  menu: 'Ресурсные спецификации'
})
export class CatalogSpecification extends DocumentBase {

  @Props({ type: 'Catalog.Specification', hiddenInList: true, order: -1 })
  parent: Ref = null;

  @Props({ type: 'Catalog.Company', hiddenInList: true })
  company: Ref = null;

  @Props({ type: 'Catalog.Brand' })
  Brand: Ref = null;

  @Props({ type: 'Catalog.Product' })
  MainProduct: Ref = null;

  @Props({ type: 'enum', value: ['DEVELOPING', 'ACTIVE', 'CLOSED'], label: 'Статус' })
  Status = 'DEVELOPING';

  @Props({ type: 'string', label: 'Наименование полное' })
  FullDescription = '';

  @Props({ type: 'date', label: 'Дата начала' })
  StartDate = null;

  @Props({ type: 'date', label: 'Дата окончания' })
  EndDate = null;

  @Props({ type: 'Catalog.Person', label: 'Отвественный' })
  ResponsiblePerson: Ref = null;

  @Props({ type: 'Catalog.RetailNetwork', label: 'Торовая сеть' })
  RetailNetwork: Ref = null;

  @Props({ type: 'table', required: false, label: 'Выходные изделия' })
  OutputProducts: OutputProduct[] = [new OutputProduct()];

  @Props({ type: 'table', required: false, label: 'Ингредиенты' })
  Ingridients: Ingridient[] = [new Ingridient()];

  @Props({ type: 'table', required: false, label: 'Этапы производства' })
  ProductionStages: ProductionStage[] = [new ProductionStage()];
}

export class OutputProduct {

  @Props({ type: 'Catalog.Product', label: 'Изделие', style: { width: '300px' } })
  Product: Ref = null;

  @Props({ type: 'number', label: 'Количество' })
  Quantity = 0;

  @Props({ type: 'number', label: 'Доля стоимости' })
  CostShare = 1;

}

export class Ingridient {

  @Props({ type: 'Catalog.Product', label: 'Ингредиент', style: { width: '300px' } })
  Ingridient: Ref = null;

  @Props({ type: 'number', label: 'Количество (вход)' })
  QuantityIn = 0;

  @Props({ type: 'number', label: 'Количество (выход)' })
  QuantityOut = 0;

  @Props({ type: 'number', label: 'Процент потерь' })
  PercentOut = 0;

  @Props({
    type: 'Catalog.Operation.Type', label: 'Этап производства',
    owner: [{ dependsOn: '67676F80-F5E5-11EB-B33A-81E873583715', filterBy: 'parent', isOwnerFixed: true }]
  })
  Stage: Ref = null;

}

export class ProductionStage {

  @Props({
    type: 'Catalog.Operation.Type', label: 'Этап',
    owner: [{ dependsOn: '67676F80-F5E5-11EB-B33A-81E873583715', filterBy: 'parent', isOwnerFixed: true }]
  })
  Stage: Ref = null;

  @Props({ type: 'number', label: 'Длительность, сек' })
  Duration = 0;

  @Props({ type: 'number', label: 'Порядок' })
  Order = 0;

  @Props({ type: 'boolean', label: 'HR' })
  HumanResource = false;

  @Props({ type: 'enum', label: 'Этап по подразделению', value: ['DEFAULT', 'YES', 'NO'] })
  ProductionStage = 'DEFAULT';

}
