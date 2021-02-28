import { MSSQL } from '../../mssql';
import { lib } from '../../std.lib';
import { IServerDocument } from '../documents.factory.server';
import { CatalogUser } from './Catalog.User';

export class CatalogUserServer extends CatalogUser implements IServerDocument {

  async onCreate(tx: MSSQL) {
    if (!tx.isRoleAvailable('Admin grantor')) {
      const props = this.Props();
      const newProps = ({ ...props, isAdmin: { ...props.isAdmin, readOnly: true } });
      this.Props = () => newProps;
    }
    return this;
  }

  async beforeSave(tx: MSSQL) {
    if (!tx.isRoleAvailable('Admin grantor')) {
      const saved = await lib.doc.byIdT<CatalogUser>(this.id, tx);
      if (saved && saved.isAdmin !== this.isAdmin)
        throw new Error(`On save "${this.description}": access denied!`);
    }
    return this;
  }

}
