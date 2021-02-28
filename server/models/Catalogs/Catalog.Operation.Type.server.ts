import { createDocumentServer, IServerDocument } from './../documents.factory.server';
import { MSSQL } from '../../mssql';
import { lib } from '../../std.lib';
import { CatalogOperationType } from './Catalog.Operation.Type';
import { createDocument } from '../documents.factory';
import { IFlatDocument } from 'jetti-middle';
import { DocumentOperationServer } from './../Documents/Document.Operation.server';

export class CatalogOperationTypeServer extends CatalogOperationType implements IServerDocument {

  async selfCreated(tx: MSSQL, document: IFlatDocument | undefined) {

    if (document) this.map(document);
    if (this.isfolder) return false;
    if (this['isExtended']) return true;

    this['isExtended'] = true;
    const model = await this.getModel(tx);
    if (!model) return false;

    const fakeDoc = {
      type: 'Document.Operation',
      Operation: model,
      Group: (await lib.util.getObjectPropertyById(model, 'Group', tx)).id
    };

    const doc: IFlatDocument = { ...createDocument(fakeDoc.type), ...fakeDoc };
    const ServerDoc = await createDocumentServer<DocumentOperationServer>(fakeDoc.type, doc, tx);
    const thisProps = { ...ServerDoc.Props(), ...this.Props() };

    ['Group', 'Operation', 'Amount', 'currency', 'f1', 'f2', 'f3'].forEach(key => delete thisProps[key]);
    if (!(await this.isEditorMode(tx)))
      Object.keys(this.getPropsWithOption('panel', 'Config')).forEach(key => thisProps[key].hidden = true);

    this.Props = () => thisProps;
    this['serverModule'] = ServerDoc['serverModule'];

    return true;
  }

  async getModel(tx: MSSQL) {
    if (this.Model || !this.parent) return this.Model;
    const parent = await lib.doc.byIdT<CatalogOperationType>(this.parent, tx);
    return parent?.Model;
  }

  async isEditorMode(tx: MSSQL) {
    return await lib.util.isRoleAvailable('Operation types editor', tx);
  }

  async beforeSave(tx: MSSQL) {
    delete this['isExtended'];
    return this;
  }

  async onCommand(command: string, tx: MSSQL) {
    if (this[command]) await this[command](tx);
    return this;
  }

}
