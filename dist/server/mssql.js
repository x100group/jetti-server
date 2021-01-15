"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSSQL = exports.SqlPool = void 0;
const tedious_1 = require("tedious");
const tarn_1 = require("tarn");
const jetti_middle_1 = require("jetti-middle");
class SqlPool {
    constructor(config) {
        this.config = config;
        this.pool = new tarn_1.Pool({
            create: () => {
                return new Promise((resolve, reject) => {
                    const connection = new tedious_1.Connection(this.config);
                    connection.once('connect', ((error) => {
                        if (error) {
                            console.error(`create: connection.on('connect') event, ConnectionError: ${error}`);
                            return reject(error);
                        }
                        return resolve(connection);
                    }));
                    connection.on('error', ((error) => {
                        console.error(`create: connection.on('error') event, Error: ${error}`);
                        if (error.code === 'ESOCKET')
                            connection['hasError'] = true;
                        return reject(error);
                    }));
                    connection.connect();
                });
            },
            validate: connecion => !connecion['closed'] && !connecion['hasError'],
            destroy: connecion => {
                return new Promise((resolve, reject) => {
                    connecion.on('end', () => resolve());
                    connecion.on('error', (error) => {
                        console.error(`destroy: connection.on('error') event, Error: ${error}`);
                        reject(error);
                    });
                    connecion.close();
                });
            },
            min: this.config.pool.min,
            max: this.config.pool.max,
            idleTimeoutMillis: this.config.pool.idleTimeoutMillis
        });
        this.config.options['validateBulkLoadParameters'] = true;
    }
}
exports.SqlPool = SqlPool;
class MSSQL {
    constructor(sqlPool, user, connection) {
        this.sqlPool = sqlPool;
        this.user = user;
        this.connection = connection;
        this.user = Object.assign({ email: '', isAdmin: false, env: {}, description: '', roles: [] }, user);
    }
    setParams(params, request) {
        for (let i = 0; i < params.length; i++) {
            if (params[i] instanceof Date) {
                request.addParameter(`p${i + 1}`, tedious_1.TYPES.DateTime2, params[i]);
            }
            else if (typeof params[i] === 'number') {
                request.addParameter(`p${i + 1}`, tedious_1.TYPES.Money, params[i]);
            }
            else if (typeof params[i] === 'boolean') {
                request.addParameter(`p${i + 1}`, tedious_1.TYPES.Bit, params[i]);
            }
            else
                request.addParameter(`p${i + 1}`, tedious_1.TYPES.NVarChar, params[i]);
        }
    }
    prepareSession(sql) {
        return `
      SET NOCOUNT ON;
      EXEC sys.sp_set_session_context N'user_id', N'${this.user.email}';
      EXEC sys.sp_set_session_context N'isAdmin', N'${this.user.isAdmin}';
      EXEC sys.sp_set_session_context N'roles', N'${JSON.stringify(this.user.roles)}';
      SET NOCOUNT OFF;
      ${sql}
    `;
    }
    manyOrNone(sql, params = []) {
        return (new Promise(async (resolve, reject) => {
            try {
                const connection = this.connection ? this.connection : await this.sqlPool.pool.acquire().promise;
                const request = new tedious_1.Request(this.prepareSession(sql), (error, rowCount, rows) => {
                    if (!this.connection)
                        this.sqlPool.pool.release(connection);
                    if (error) {
                        if (!global['isProd'])
                            console.error(error, sql);
                        return reject(error);
                    }
                    if (!rowCount)
                        return resolve([]);
                    const result = rows.map(row => {
                        const data = {};
                        row.forEach(col => data[col.metadata.colName] = col.value);
                        return this.complexObject(data);
                    });
                    return resolve(result);
                });
                this.setParams(params, request);
                connection.execSql(request);
            }
            catch (error) {
                return reject(error);
            }
        }));
    }
    oneOrNone(sql, params = []) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = this.connection ? this.connection : await this.sqlPool.pool.acquire().promise;
                const request = new tedious_1.Request(this.prepareSession(sql), (error, rowCount, rows) => {
                    if (!this.connection)
                        this.sqlPool.pool.release(connection);
                    if (error) {
                        if (!global['isProd'])
                            console.error(error, sql);
                        return reject(error);
                    }
                    if (!rowCount)
                        return resolve(null);
                    const data = {};
                    rows[0].forEach(col => data[col.metadata.colName] = col.value);
                    const result = this.complexObject(data);
                    return resolve(result);
                });
                this.setParams(params, request);
                connection.execSql(request);
            }
            catch (error) {
                return reject(error);
            }
        });
    }
    none(sql, params = []) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = this.connection ? this.connection : await this.sqlPool.pool.acquire().promise;
                const request = new tedious_1.Request(this.prepareSession(sql), (error, rowCount, rows) => {
                    if (!this.connection)
                        this.sqlPool.pool.release(connection);
                    if (error) {
                        if (!global['isProd'])
                            console.error(`${error.code}: ${error.message}\n${params}`);
                        return reject(error);
                    }
                    return resolve();
                });
                this.setParams(params, request);
                connection.execSql(request);
            }
            catch (error) {
                return reject(error);
            }
        });
    }
    noneBatch(sql, params = []) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = this.connection ? this.connection : await this.sqlPool.pool.acquire().promise;
                const request = new tedious_1.Request(this.prepareSession(sql), (error, rowCount, rows) => {
                    if (!this.connection)
                        this.sqlPool.pool.release(connection);
                    if (error) {
                        if (!global['isProd'])
                            console.error(`${error.code}: ${error.message}\n${sql}`);
                        return reject(error);
                    }
                    return resolve();
                });
                this.setParams(params, request);
                connection.execSqlBatch(request);
            }
            catch (error) {
                return reject(error);
            }
        });
    }
    async tx(func, name, isolationLevel = tedious_1.ISOLATION_LEVEL.READ_COMMITTED) {
        const connection = this.connection ? this.connection : await this.sqlPool.pool.acquire().promise;
        await this.beginTransaction(connection, name, isolationLevel);
        try {
            await func(new MSSQL(this.sqlPool, this.user, connection), name, isolationLevel);
            await this.commitTransaction(connection);
        }
        catch (error) {
            try {
                await this.rollbackTransaction(connection);
            }
            catch (_a) { }
            throw new Error(error);
        }
        finally {
            if (!this.connection)
                this.sqlPool.pool.release(connection);
        }
    }
    beginTransaction(connection, name, isolationLevel = tedious_1.ISOLATION_LEVEL.READ_COMMITTED) {
        return new Promise(async (resolve, reject) => {
            connection.beginTransaction(error => {
                if (error)
                    return reject(error);
                return resolve(this);
            }, name, isolationLevel);
        });
    }
    commitTransaction(connection) {
        return new Promise(async (resolve, reject) => {
            connection.commitTransaction(error => {
                if (error)
                    return reject(error);
                return resolve(this);
            });
        });
    }
    rollbackTransaction(connection) {
        return new Promise(async (resolve, reject) => {
            connection.rollbackTransaction(error => {
                if (error)
                    return reject(error);
                return resolve(this);
            });
        });
    }
    complexObject(data) {
        if (!data)
            return data;
        const row = {};
        // tslint:disable-next-line:forin
        for (const k in data) {
            const value = this.toJSON(data[k]);
            if (k.includes('.')) {
                const keys = k.split('.');
                row[keys[0]] = Object.assign(Object.assign({}, row[keys[0]]), { [keys[1]]: value });
            }
            else
                row[k] = value;
        }
        return row;
    }
    toJSON(value) {
        if (typeof value === 'string' && ((value[0] === '{' && value[value.length - 1] === '}') ||
            (value[0] === '[' && value[value.length - 1] === ']')))
            try {
                return JSON.parse(value, jetti_middle_1.dateReviverUTC);
            }
            catch (_a) {
                return value;
            }
        else
            return value;
    }
    isRoleAvailable(role) {
        return !this.user || !this.user.roles || this.user.roles.includes(role);
    }
    isRoleAvailableModifyProtected() {
        return this.isRoleAvailable('Modify protected');
    }
    async metaSequenceByName(sequenceName) {
        return await this.oneOrNone(`SELECT * FROM sys.objects WHERE name = '${sequenceName}' AND type = 'SO'`);
    }
    async metaSequenceCreate(name, startWith = 0) {
        if (!name)
            return `Sequence name is not defined`;
        if (await this.metaSequenceByName(name))
            return `Sequence "${name}" is exist`;
        await this.none(`CREATE SEQUENCE [dbo].[${name}] START WITH ${startWith}`);
        return '';
    }
}
exports.MSSQL = MSSQL;
//# sourceMappingURL=mssql.js.map