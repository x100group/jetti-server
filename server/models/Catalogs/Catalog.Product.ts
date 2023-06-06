import { DocumentBase, JDocument, Props, Ref } from 'jetti-middle';

@JDocument({
  type: 'Catalog.Product',
  description: 'Номенклатура',
  icon: ' fa fa-list',
  menu: 'Номенклатура',
  prefix: 'SKU-',
  hierarchy: 'folders',
  relations: [{ name: 'Specification by department', type: 'Register.Info.ProductSpecificationByDepartment', field: 'Product.id' }],
  dimensions: [
    { Unit: 'Catalog.Unit' },
    { Kind: 'Catalog.ProductKind' }
  ],
  commands: [{ method: 'SavePropsValuesInChilds', icon: 'pi pi-plus', order: 1, label: 'Save in child elements' }]
})
export class CatalogProduct extends DocumentBase {

  @Props({ type: 'Catalog.Product', hiddenInList: true, order: -1, storageType: 'folders' })
  parent: Ref = null;

  @Props({ type: 'boolean', hidden: false, hiddenInList: true, isAdditional: true })
  isfolder = false;

  @Props({ type: 'Catalog.ProductKind', label: 'Kind', order: 5, onChangeServer: true, useIn: 'all', isIndexed: true })
  ProductKind: Ref = null;

  @Props({ type: 'Catalog.ProductCategory', label: 'Сategory', order: 666, useIn: 'all', isIndexed: true })
  ProductCategory: Ref = null;

  @Props({ type: 'Catalog.Specification', label: 'Specification', order: 666, useIn: 'all' })
  Specification: Ref = null;

  @Props({ type: 'Catalog.Brand', order: 666, useIn: 'all' })
  Brand: Ref = null;

  @Props({ type: 'Catalog.RetailNetwork', order: 666 })
  RetailNetwork: Ref = null;

  @Props({ type: 'Catalog.Unit', label: 'Unit', order: 666, required: true })
  Unit: Ref = null;

  @Props({ type: 'Catalog.Expense', label: 'Expense', order: 666, useIn: 'all' })
  Expense: Ref = null;

  @Props({
    type: 'Catalog.Expense.Analytics', label: 'Analytics', order: 666, useIn: 'all',
    owner: [{ dependsOn: 'Expense', filterBy: 'parent' }]
  })
  Analytics: Ref = null;

  @Props({ type: 'Catalog.Product.Report', order: 666, useIn: 'all' })
  ProductReport: Ref = null;

  @Props({ type: 'Document.Operation', order: 666, useIn: 'all', hiddenInList: true })
  Settings: Ref = null;

  @Props({ type: 'boolean', order: 666, useIn: 'all', hiddenInList: true })
  Purchased = false;

  @Props({ type: 'string', order: 666, useIn: 'all' })
  ShortCode = '';

  @Props({ type: 'string', order: 666, useIn: 'all', label: 'Short name (max 21 symbols)', validators: [{ key: 'maxLength', value: 21 }] })
  ShortName = '';

  @Props({ type: 'string', order: 666, useIn: 'all', hiddenInList: true })
  Tags = '';

  @Props({ type: 'number', order: 666, useIn: 'all', hiddenInList: true })
  Weight = '';

  @Props({ type: 'number', order: 666, useIn: 'all', hiddenInList: true })
  Volume = '';

  @Props({ type: 'number', order: 666, useIn: 'all', hiddenInList: true })
  Calorie = 0;

  @Props({ type: 'number', order: 666, useIn: 'all', hiddenInList: true })
  Carbohydrates = 0;

  @Props({ type: 'number', order: 666, useIn: 'all', hiddenInList: true })
  Fat = 0;

  @Props({ type: 'number', order: 666, useIn: 'all', hiddenInList: true })
  Proteins = 0;

  @Props({ type: 'number', order: 666, useIn: 'all', hiddenInList: true })
  CookingTime = 0;

  @Props({ type: 'string', order: 666, useIn: 'all', hiddenInList: true })
  Composition = '';

  @Props({ type: 'enum', order: 666, useIn: 'all', value: ['OUTLET', 'COLD_SHOP', 'PIZZA_SHOP', 'HOT_SHOP'] })
  CookingPlace = '';

  @Props({ type: 'number', order: 666, useIn: 'all', hiddenInList: true })
  Order = 0;

  @Props({ type: 'string', order: 666, useIn: 'all', hiddenInList: true })
  Barcode = '';

  @Props({ type: 'string', useIn: 'all' })
  Eancode = '';

  @Props({ type: 'boolean', order: 666, useIn: 'all', hiddenInList: true })
  isVegan = false;

  @Props({ type: 'boolean', order: 666, useIn: 'all', hiddenInList: true })
  isHot = false;

  @Props({ type: 'boolean', order: 666, useIn: 'all', hiddenInList: true })
  isPromo = false;

  @Props({ type: 'boolean', order: 666, useIn: 'all', hiddenInList: true })
  isAggregator = false;

  @Props({ type: 'boolean', order: 666, useIn: 'all', hiddenInList: true })
  isThermallabelPrinting = false;

  @Props({ type: 'string', order: 666, useIn: 'all', hiddenInList: true })
  Slug = '';

  @Props({ type: 'table', label: 'Products', order: 666 })
  Product: Product[] = [new Product()];

}

export class Product {

  @Props({ type: 'Catalog.Product' })
  Product = '';

  @Props({ type: 'number' })
  Qty = '';

}

