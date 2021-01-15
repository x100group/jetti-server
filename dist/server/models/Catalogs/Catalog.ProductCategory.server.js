"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogProductCategoryServer = void 0;
const Catalog_ProductCategory_1 = require("./Catalog.ProductCategory");
class CatalogProductCategoryServer extends Catalog_ProductCategory_1.CatalogProductCategory {
    async beforeDelete(tx) {
        if (!this.id)
            return this;
        const exist = await tx.oneOrNone(`select count(id) idCount
      from [dbo].[Catalog.Product.v]
      where
      deleted = 0 and
      ProductCategory = @p1`, [this.id]);
        if (exist)
            throw new Error(`Deletion prohibited: there are ${exist.idCount} products with a category "${this.description}"`);
        return this;
    }
}
exports.CatalogProductCategoryServer = CatalogProductCategoryServer;
//# sourceMappingURL=Catalog.ProductCategory.server.js.map