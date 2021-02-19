import { DocumentBase, JDocument, Props, Ref } from 'jetti-middle';

@JDocument({
  type: 'Catalog.ProductCategory',
  description: 'Товарные категории',
  icon: 'fa fa-list',
  menu: 'Товарные категории',
  prefix: 'PRODCAT-',
  hierarchy: 'folders'
})
export class CatalogProductCategory extends DocumentBase {

  @Props({ type: 'Catalog.ProductCategory', hiddenInList: true, order: -1, storageType: 'folders' })
  parent: Ref = null;

  @Props({ type: 'number' })
  Order = 0;

  @Props({ type: 'string' })
  Presentation = '';

  @Props({ type: 'Catalog.RetailNetwork', required: true })
  RetailNetwork: Ref = null;

  @Props({ type: 'boolean' })
  isDefault = false;

  @Props({ type: 'boolean' })
  isDesktop = false;

  @Props({ type: 'boolean' })
  isWeb = false;

  @Props({ type: 'boolean' })
  isMobile = false;

  @Props({ type: 'string' })
  Slug = '';

}
