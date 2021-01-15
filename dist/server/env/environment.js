"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfigExchange = exports.sqlConfigTask = exports.sqlConfigX100DATA = exports.sqlConfigMeta = exports.sqlConfig = exports.portal1CApiConfig = exports.TRANSFORMED_REGISTER_MOVEMENTS_TABLE = exports.REGISTER_ACCUMULATION_SOURCE = exports.LOGIC_USECASHREQUESTAPPROVING = exports.bpApiHost = exports.JTW_KEY = exports.JETTI_IS_HOST = exports.REDIS_DB_AUTH = exports.REDIS_DB_HOST = exports.DB_NAME = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.DB_NAME = process.env.DB_NAME;
exports.REDIS_DB_HOST = process.env.REDIS_DB_HOST;
exports.REDIS_DB_AUTH = process.env.REDIS_DB_AUTH;
exports.JETTI_IS_HOST = process.env.JETTI_IS_HOST || 'http://localhost:3500';
exports.JTW_KEY = process.env.JTW_KEY;
exports.bpApiHost = 'https://bp.x100-group.com/JettiProcesses/hs';
exports.LOGIC_USECASHREQUESTAPPROVING = process.env.LOGIC_USECASHREQUESTAPPROVING || '0';
exports.REGISTER_ACCUMULATION_SOURCE = process.env.REGISTER_ACCUMULATION_SOURCE || '';
exports.TRANSFORMED_REGISTER_MOVEMENTS_TABLE = '[dbo].[Register.Accumulation.Balance.RC]';
const DB_PORT = parseInt(process.env.DB_PORT, undefined);
exports.portal1CApiConfig = {
    baseURL: process.env.PORTAL1C_API_HOST,
    auth: {
        username: process.env.PORTAL1C_API_USER,
        password: process.env.PORTAL1C_API_PASSWORD
    }
};
exports.sqlConfig = {
    server: process.env.DB_HOST,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    },
    options: {
        encrypt: false,
        database: exports.DB_NAME,
        port: DB_PORT,
        requestTimeout: 5 * 60 * 1000,
        rowCollectionOnRequestCompletion: true,
    },
    pool: {
        min: 0,
        max: 1000,
        idleTimeoutMillis: 20 * 60 * 1000
    }
};
exports.sqlConfigMeta = {
    server: process.env.DB_HOST,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER_META,
            password: process.env.DB_PASSWORD_META
        }
    },
    options: {
        encrypt: false,
        database: exports.DB_NAME,
        port: DB_PORT,
        requestTimeout: 5 * 60 * 1000,
        rowCollectionOnRequestCompletion: true,
    },
    pool: {
        min: 0,
        max: 1000,
        idleTimeoutMillis: 20 * 60 * 1000
    }
};
exports.sqlConfigX100DATA = {
    server: process.env.DB_HOST,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    },
    options: {
        encrypt: false,
        database: 'x100-DATA',
        port: DB_PORT,
        requestTimeout: 5 * 60 * 1000,
        rowCollectionOnRequestCompletion: true,
    },
    pool: {
        min: 0,
        max: 1000,
        idleTimeoutMillis: 20 * 60 * 1000
    }
};
exports.sqlConfigTask = {
    server: process.env.DB_HOST,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_TASK_USER,
            password: process.env.DB_TASK_PASSWORD
        }
    },
    options: {
        encrypt: false,
        database: exports.DB_NAME,
        port: DB_PORT,
        requestTimeout: 3 * 60 * 60 * 1000,
        rowCollectionOnRequestCompletion: true,
    },
    pool: {
        min: 0,
        max: 1000,
        idleTimeoutMillis: 20 * 60 * 1000
    }
};
exports.sqlConfigExchange = {
    server: '34.91.140.192',
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    },
    options: {
        encrypt: false,
        database: 'Exchange',
        port: DB_PORT,
        requestTimeout: 20 * 60 * 1000,
        rowCollectionOnRequestCompletion: true,
    },
    pool: {
        min: 0,
        max: 1000,
        idleTimeoutMillis: 20 * 60 * 1000
    }
};
//# sourceMappingURL=environment.js.map