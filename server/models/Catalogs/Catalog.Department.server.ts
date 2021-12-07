import { IServerDocument } from './../documents.factory.server';
import { MSSQL } from '../../mssql';
import { CatalogDepartment } from './Catalog.Department';
import { x100 } from '../../x100.lib';
import { lib } from '../../std.lib';

export class CatalogDepartmentServer extends CatalogDepartment implements IServerDocument {

  async onCommand(command: string, args: any, tx: MSSQL) {
    if (this[command]) await this[command](tx);
    return this;
  }

  async getTimeZone(tx: MSSQL) {
    if (!this.Latitude || !this.Latitude) throw new Error('Invalid coodinates');
    const tz = await lib.util.timeZoneByCoordinates(this.Longitude, this.Latitude);
    if (tz.error) throw new Error(tz.error);
    this.timeZone = tz.timeZone! || this.timeZone;
  }

}
