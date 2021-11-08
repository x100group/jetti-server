import { IServerDocument } from './../documents.factory.server';
import { MSSQL } from '../../mssql';
import { CatalogUsersGroup } from './Catalog.UsersGroup';
import { lib } from '../../std.lib';

export class CatalogUsersGroupServer extends CatalogUsersGroup implements IServerDocument {

  async beforeSave(tx: MSSQL) {
    const saved = await lib.doc.byIdT<CatalogUsersGroup>(this.id, tx);
    if (!saved) return this;

    if (saved.deleted !== this.deleted ||
      saved.posted !== this.posted ||
      saved.Users.join() !== this.Users.join()) {
      const userSettings = await this.getDocumentsUserSettings(tx);
      if (userSettings.length) {
        const taskPoolTx = lib.util.taskPoolTx();
        userSettings.forEach(async (doc) => await lib.queuePost.addId(doc.id, 0, taskPoolTx));
      }
    }
    return this;
  }

  async getDocumentsUserSettings(tx: MSSQL) {
    return tx.manyOrNone<{ id: string }>(`
    SELECT id FROM [dbo].[Document.UserSettings.v]
    WHERE posted = 1 AND UserOrGroup = @p1`, [this.id]);
  }

}
