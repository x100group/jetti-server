import { NextFunction, Request, Response } from 'express';
import { API_DURATION_LIMIT } from '../../env/environment';
import { JEvent } from '../../fuctions/Event';
import { MSSQL } from '../../mssql';
import { JETTI_POOL } from '../../sql.pool.jetti';
import { TASKS_POOL } from '../../sql.pool.tasks';

export function jettiDB(req: Request, res: Response, next: NextFunction) {
  const user = (<any>req).user;
  let event: JEvent | undefined;
  if (API_DURATION_LIMIT) {
    event = new JEvent({ durationLimit: API_DURATION_LIMIT, type: 'API', info: { path: req.path, params: { ...req.body } } });
    event.start();
  }
  const sdb = new MSSQL(JETTI_POOL, user, undefined, event);
  (<any>req).sdb = sdb;
  console.log('jettiDB');
  next();
}

export function tasksDB(req: Request, res: Response, next: NextFunction) {
  const user = (<any>req).user;
  const sdb = new MSSQL(TASKS_POOL, user);
  (<any>req).sdb = sdb;
  next();
}

export function SDB(req: Request, eventInfo?: Partial<JEvent>) {
  if (eventInfo) ((<any>req).sdb as MSSQL).event = new JEvent(eventInfo);
  return (<any>req).sdb as MSSQL;
}
