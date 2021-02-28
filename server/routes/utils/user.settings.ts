import { IUserSettings } from 'jetti-middle/dist/common/classes/user-settings';
import { MSSQL } from '../../mssql';

export class UserSettingsManager {

    static async getSettings(settings: IUserSettings, tx: MSSQL): Promise<IUserSettings[] | null> {
        return await tx.manyOrNone<IUserSettings>(`
      SELECT *
      FROM [dbo].[UserSettings]
      WHERE
      1 = 1 AND
      ${settings.id ? 'id = @p1' : `[user] = @p1 and [type] = @p2`}
      ORDER BY timestamp desc`,
            settings.id ? [settings.id] : [settings.user || '', settings.type]);
    }

    static async saveSettingsArray(settings: IUserSettings[], tx: MSSQL): Promise<IUserSettings[]> {
        const res: IUserSettings[] = [];
        for (const setting of settings) {
            res.push(await this.saveSettings(setting, tx));
        }
        return res;
    }

    static async saveSettings(settings: IUserSettings, tx: MSSQL) {
        return settings.timestamp ? await this.updateSettings(settings, tx) : await this.insertSettings(settings, tx);
    }

    static async insertSettings(settings: IUserSettings, tx: MSSQL): Promise<IUserSettings> {
        const timestamp = await tx.oneOrNone<{ timestamp: Date }>(`
        INSERT INTO [dbo].[UserSettings]([id],[type],[kind],[user],[description],[settings],[timestamp])
        OUTPUT inserted.timestamp
        VALUES (@p1,@p2,@p3,@p4,@p5,@p6, GETDATE())
        `,
            [settings.id,
            settings.type,
            settings.kind,
            settings.user || '',
            settings.description || '',
            JSON.stringify(settings.settings)]);
        return { ...settings, timestamp: timestamp!.timestamp };
    }

    static async updateSettings(settings: IUserSettings, tx: MSSQL): Promise<IUserSettings> {
        return (await tx.oneOrNone<IUserSettings>(`
        UPDATE [dbo].[UserSettings]
        SET [type] = @p1,
            [kind] = @p2,
            [user] = @p3,
            [description] = @p4,
            [settings] = @p5,
            [timestamp] = GETDATE()
        WHERE id = @p6;
        SELECT * FROM [dbo].[UserSettings] WHERE id = @p6`,
            [settings.type,
            settings.kind,
            settings.user || '',
            settings.description || '',
            JSON.stringify(settings.settings || ''),
            settings.id]))!;
    }

    static async deleteSettingsById(id: string, tx: MSSQL) {
        await tx.none(`DELETE FROM [dbo].[UserSettings] WHERE [id] = @p1`, [id]);
    }

}
