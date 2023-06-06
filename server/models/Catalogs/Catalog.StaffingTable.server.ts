import { IServerDocument } from './../documents.factory.server';
import { MSSQL } from '../../mssql';
import { CatalogStaffingTable } from './Catalog.StaffingTable';
import { lib } from '../../std.lib';
import { Ref } from 'jetti-middle';

export class CatalogStaffingTableServer extends CatalogStaffingTable implements IServerDocument {

  beforeSave = async (tx: MSSQL): Promise<this> => {

    if (this.CloseDate && this.ActivationDate && this.CloseDate! < this.ActivationDate!)
      throw new Error('Дата закрытия не может быть раньше даты открытия!');

    if (this.isfolder) return this;

    const defVal = '<пусто>';
    const getDescription = async (id: Ref, code = ''): Promise<string> => {
      if (!id) return defVal;
      const ob = await lib.doc.byId(id, tx);
      let description = ob && ob.description ? ob.description : defVal;
      if (code) description = `${description} (${code})`;
      return description;
    };

    if (!this.code) this.code = await lib.doc.docPrefix(this.type, tx);

    const [JobTitle, DepartmentCompany, Currency] = await Promise.all([
      await getDescription(this.JobTitle, this.code.substr(this.code.length - 5)),
      await getDescription(this.DepartmentCompany),
      await getDescription(this.Currency)
    ]);

    this.description = `${this.CloseDate ? '(closed) ' : ''}${JobTitle.trim()} / ${DepartmentCompany.trim()} (${Currency})`;

    return this;
  }

}
