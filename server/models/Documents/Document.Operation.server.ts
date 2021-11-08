import { lib } from '../../std.lib';
import { CatalogCompany } from '../Catalogs/Catalog.Company';
import { CatalogOperation } from '../Catalogs/Catalog.Operation';
import { createDocumentServer, IServerDocument, DocumentBaseServer } from '../documents.factory.server';
import { PostResult } from './../post.interfaces';
import { DocumentOperation } from './Document.Operation';
import { MSSQL } from '../../mssql';
import { DocumentCashRequestServer } from './Document.CashRequest.server';
import { x100 } from '../../x100.lib';

export class DocumentOperationServer extends DocumentOperation implements IServerDocument {

  async onValueChanged(prop: string, value: any, tx: MSSQL): Promise<DocumentBaseServer> {
    switch (prop) {
      case 'company':
        const company = await lib.doc.byIdT<CatalogCompany>(value.id, tx);
        if (company) this.currency = company.currency;
        return this;
      case 'Operation':
        const Operation = await lib.doc.byIdT<CatalogOperation>(value.id, tx);
        if (Operation) this.Group = Operation.Group!;
        return this;
      default:
        return this;
    }
  }

  async onCopy(tx: MSSQL) {
    this.parent = null;
    return this;
  }

  async beforePost(tx: MSSQL) {
    // запрет проведения с 0 суммой для группы 1.0 - Приобретение товаров и услуг
    if (this.Amount === 0 && this.Group === 'E74FF926-C149-11E7-BD8F-43B2F3011722')
      throw new Error(`${this.description} не может быть проведен: не заполнена сумма документа`);
    if (!this.parent) return this;
    const parentDoc = (await lib.doc.byId(this.parent, tx));
    if (!parentDoc) return this;
    switch (parentDoc.type) {
      case 'Document.CashRequest':
        const CashRequestServer = await createDocumentServer<DocumentCashRequestServer>('Document.CashRequest', parentDoc, tx);
        await CashRequestServer.beforePostDocumentOperation(this, tx);
        break;
      default:
        break;
    }
    return this;
  }

  async onPost(tx: MSSQL) {
    const Registers: PostResult = { Account: [], Accumulation: [], Info: [] };

    if (!this.posted || this.deleted || !this.Operation) return Registers;

    const query = `
      SELECT
        IIF(ISNULL("isManagment", 0) = 0, "script", "script") "scriptManagment",
        IIF(ISNULL("isAccounting", 0) = 0, '', "scriptAccounting") "scriptAccounting"
      FROM "Documents"
      CROSS APPLY OPENJSON (doc, N'$')
      WITH
        (
          "isManagment" BIT '$."isManagment"',
          "isAccounting" BIT '$."isAccounting"',
          "script" NVARCHAR(MAX) '$."script"',
          "scriptAccounting" NVARCHAR(MAX) '$."scriptAccounting"'
        )
      WHERE id = @p1`;

    const postSettings = await tx.oneOrNone<{ scriptManagment: string, scriptAccounting: string }>(query, [this.Operation]);

    if (!postSettings || (!postSettings.scriptManagment && !postSettings.scriptAccounting)) return Registers;

    const executePostScript = async (postScript: string) => {
      if (!postScript) return;
      const script = `
      ${postScript
          .replace(/\$\./g, 'doc.')
          .replace(/tx\./g, 'await tx.')
          .replace(/lib\./g, 'await lib.')
          .replace(/\'doc\./g, '\'$.')}
      `;
      const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
      const func = new AsyncFunction('doc, Registers, tx, lib', script);
      await func(this, Registers, tx, lib);
    };

    await executePostScript(postSettings.scriptManagment);
    await executePostScript(postSettings.scriptAccounting);

    return Registers;
  }

  async baseOn(source: string, tx: MSSQL, params?: any) {

    const rawDoc = await lib.doc.byId(source, tx);
    if (!rawDoc) return this;

    const sourceDoc = await createDocumentServer(rawDoc.type, rawDoc, tx);

    if (sourceDoc instanceof DocumentOperationServer) {
      const Operation = await lib.doc.byIdT<CatalogOperation>(sourceDoc.Operation as string, tx);
      const Rule = Operation!.CopyTo.find(c => c.Operation === this.Operation);
      if (Rule) {
        const script = `
        this.company = doc.company;
        this.currency = doc.currency;
        this.parent = doc.id;
        ${Rule.script
            .replace(/\$\./g, 'doc.')
            .replace(/tx\./g, 'await tx.')
            .replace(/lib\./g, 'await lib.')
            .replace(/\'doc\./g, '\'$.')}
          `;
        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
        const func = new AsyncFunction('doc, tx, lib, x100', script) as Function;
        await func.bind(this, sourceDoc, tx, lib, x100)();
      }
    } else {
      switch (sourceDoc.type) {
        case 'Catalog.Counterpartie':
          break;
        case 'Document.CashRequest':
          await this.baseOnCashRequest(sourceDoc as DocumentCashRequestServer, tx, params);
          break;
        case 'Catalog.Operation':
          this.Operation = (sourceDoc as CatalogOperation).id;
          this.Group = (sourceDoc as CatalogOperation).Group;
          break;
        default:
          break;
      }
    }
    const doc = await (createDocumentServer(this.type, this, tx));
    const Props = doc.Props();
    const Prop = doc.Prop();
    this.description = doc.description;
    this.Props = () => Props;
    this.Prop = () => Prop;
    return this;
  }

  async baseOnCashRequest(cashRequest: DocumentCashRequestServer, tx: MSSQL, params?: any) {
    const query =
      `SELECT TOP 1 id
      FROM Documents
      WHERE Operation = 'C7C86BA0-7DB7-11EB-8BF1-D7EBACB55696'
        AND posted = 1
        AND JSON_VALUE(doc, '$.Status') = 'ACTIVE'
        AND JSON_VALUE(doc, '$.OperationType') = N'${cashRequest.Operation}'`;
    const rulesDocID = await tx.oneOrNone<{ id: string }>(query);
    if (!rulesDocID || !rulesDocID.id) throw new Error(`Operation creating base on document cash request with operation type "${cashRequest.Operation}" is not implemented`);
    const rulesDoc = await lib.doc.byId(rulesDocID.id, tx);
    const declaration = new Function('', rulesDoc!['Module']).bind(this)();
    if (!declaration.fillOperation)
      throw new Error(`baseOnCashRequest: Operation creating base on document cash request with operation type "${cashRequest.Operation}" is not implemented`);
    try {
      await (declaration.fillOperation as Function)(cashRequest, this, tx, params);
    } catch (error) {
      throw new Error(`baseOnCashRequest: cash request id ${cashRequest.id}\n${error}`);
    }
  }
}
