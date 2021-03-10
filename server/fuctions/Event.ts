import { v4 } from 'uuid';
import { MSSQL } from '../mssql';
import { JETTI_POOL } from '../sql.pool.jetti';

export class Event {

    id: string;
    date: Date;
    kind: string;
    type: string;
    user: string;
    info: { [x: string]: string };
    private _tx: MSSQL;

    static async byId(id: string, tx: MSSQL): Promise<Event | null> {
        const eventData = await tx.oneOrNone<Event>(`
        SELECT * FROM [dbo].[EventsLog]
        WHERE id = @p1
        `, [id]);
        return eventData ? new Event(eventData) : null;
    }

    beforeStart: () => boolean = () => true;
    beforeSave: () => boolean = () => true;

    get tx() { return this._tx ? this._tx : new MSSQL(JETTI_POOL, this.user); }
    get duration() {
        return this.date ? (new Date).getTime() - this.date.getTime() : 0;
    }

    constructor(partial: Partial<Event>) {
        for (const key of Object.keys(partial)) {
            this[key] = partial[key];
        }
        if (!this.id) this.id = v4().toLocaleUpperCase();
    }

    start(save = false) {
        this.date = new Date;
        if (save) this._save();
    }

    stop(duration?: number) {
        if (duration && this.duration < duration) return;
        this._save();
    }

    private async _save() {
        if (this.beforeSave())
            await this.tx.none(`
            INSERT INTO [dbo].[EventsLog]([id],[date],[type],[kind],[user],[info])
            OUTPUT inserted.id
            VALUES (@p1,@p2,@p3,@p4,@p5,@p6)
            `,
                [this.id,
                this.date,
                this.type,
                this.kind,
                this.user,
                JSON.stringify(this.info || {})]);
    }

}
