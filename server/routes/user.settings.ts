import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { IJWTPayload } from 'jetti-middle';
import { SDB } from './middleware/db-sessions';
import { UserSettingsManager } from './utils/user.settings';

export const router = express.Router();

export function User(req: Request): IJWTPayload {
  return (<any>req).user as IJWTPayload;
}
router.post('/user/settings', async (req, res, next) => {
  try {
    switch (req.body.command) {
      case 'save':
        res.json(await UserSettingsManager.saveSettingsArray(req.body.settings, SDB(req)));
        break;
      case 'delete':
        await UserSettingsManager.deleteSettingsById(req.body.id, SDB(req));
        res.json({});
        break;
      case 'get':
        const { type, user, id } = req.body;
        res.json(await UserSettingsManager.getSettings({
          type: type || '',
          user: user || '',
          id: id || ''
        }, SDB(req)));
        break;
      default:
        res.status(405);
        res.json({ error: 'unknow command: ' + req.body.command });
        break;
    }
  } catch (err) { next(err); }
});

router.get('/user/roles', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = User(req);
    const sdb = SDB(req);
    const result = ['Admin'];
    res.json(result);
  } catch (err) { next(err); }
});
