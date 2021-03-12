import { v4 } from 'uuid';
import { QUERY_DURATION_LIMIT } from '../env/environment';
import { MSSQL } from '../mssql';
import { JETTI_POOL } from '../sql.pool.jetti';

export class JEvent {

    id: string;
    instance: string;
    date: Date;
    kind: string;
    type: string;
    user: string;
    durationLimit = 0;
    info: { [x: string]: any };

    private _tx: MSSQL;

    static async byId(id: string, tx: MSSQL): Promise<JEvent | null> {
        const eventData = await tx.oneOrNone<JEvent>(`
        SELECT * FROM [dbo].[EventsLog]
        WHERE id = @p1
        `, [id]);
        return eventData ? new JEvent(eventData) : null;
    }

    beforeStart: () => boolean = () => true;
    beforeSave: () => boolean = () => true;

    get tx() { return this._tx ? this._tx : new MSSQL(JETTI_POOL, this.user); }
    get duration() {
        return this.date ? (new Date).getTime() - this.date.getTime() : 0;
    }

    constructor(partial?: Partial<JEvent>) {
        if (partial) Object.keys(partial).forEach(key => this[key] = partial[key]);
        if (!this.instance) this.instance = v4().toLocaleUpperCase();
    }

    start(save = false) {
        this.date = new Date;
        if (save) this.save();
    }

    stop(durationLimit: number = 0, info: { [x: string]: any } = {}) {
        if (!info.error &&
            ((durationLimit === 0 && this.durationLimit === 0) ||
                this.duration < (durationLimit || this.durationLimit))) return;
        this.info = { duration: this.duration, limit: durationLimit || this.durationLimit, ...info };
        if (info.error) this.kind = 'ERR';
        this.save();
    }

    async save() {
        if (!this.beforeSave()) return;
        await this.tx.none(`
            INSERT INTO [dbo].[EventsLog]([kind],[type],[instance],[user],[info])
            OUTPUT inserted.id
            VALUES (@p1,@p2,@p3,@p4,@p5)
            `,
            [this.kind || '',
            this.type || '',
            this.instance || '',
            this.user || '',
            JSON.stringify(this.info || {})]);
    }

}
