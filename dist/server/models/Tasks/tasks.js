"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapJob = exports.jobFullDescription = exports.processId = exports.JQueue = exports.Jobs = exports.getQueueInstanceAPIByQueueId = exports.execQueueAPIPostRequest = exports.queueHosts = void 0;
const Queue = require("bull");
const environment_1 = require("../../env/environment");
const sockets_1 = require("../../sockets");
const sync_1 = require("./sync");
const os = require("os");
const customTask_1 = require("./customTask");
const axios_1 = require("axios");
const https_1 = require("https");
exports.queueHosts = {
    'IS': environment_1.JETTI_IS_HOST
};
exports.execQueueAPIPostRequest = async (queueId, url, body) => {
    const queueInstance = await exports.getQueueInstanceAPIByQueueId(queueId);
    return (await queueInstance.instance.post(url, body, {
        headers: { Authorization: queueInstance.token }, httpsAgent: new https_1.Agent({
            rejectUnauthorized: false
        })
    })).data;
};
exports.getQueueInstanceAPIByQueueId = async (queueId) => {
    const host = exports.queueHosts[queueId];
    if (!host)
        throw new Error(`Unknow queue: ${queueId}`);
    const instance = axios_1.default.create({ baseURL: host });
    const query = `auth/token`;
    try {
        const res = await instance.post(query, { password: process.env.EXCHANGE_ACCESS_KEY }, {
            httpsAgent: new https_1.Agent({
                rejectUnauthorized: false
            })
        });
        return { instance: instance, token: `Bearer ${res.data.token}` };
    }
    catch (error) {
        throw new Error(`Error on getting queue instance: ${error.message}`);
    }
};
exports.Jobs = {
    sync: sync_1.default,
    customTask: customTask_1.default
};
const redis = {
    host: environment_1.REDIS_DB_HOST,
    password: environment_1.REDIS_DB_AUTH,
    maxRetriesPerRequest: null,
    connectTimeout: 180000
};
const defaultJobOptions = {
    removeOnComplete: false,
    removeOnFail: false,
};
const limiter = {
    max: 10000,
    duration: 1000,
    bounceBack: false,
};
const settings = {
    lockDuration: 600000,
    stalledInterval: 5000,
    maxStalledCount: 2,
    guardInterval: 5000,
    retryProcessDelay: 30000,
    drainDelay: 5,
};
const options = {
    redis, prefix: environment_1.DB_NAME, defaultJobOptions, settings, limiter
};
exports.JQueue = new Queue(environment_1.DB_NAME, options);
exports.processId = () => `${os.hostname()}:${process.pid}`;
exports.JQueue.process(1, async (job) => {
    // if (job.data.processId && job.data.processId === processId()) return;
    const task = exports.Jobs[job.data.job.id];
    if (task)
        return await task(job);
});
exports.JQueue.on('error', err => {
    console.error('queue error', err.message);
});
exports.JQueue.on('active', (job, jobPromise) => {
    job.data.message = `${job.data.job.id} is active`;
    sockets_1.userSocketsEmit(job.data.user, job.data.job.id, mapJob(job));
});
exports.JQueue.on('failed', (job, err) => {
    job.data.message = `${job.data.job.id} failed, ${err.message}`;
    const MapJob = mapJob(job);
    MapJob.failedReason = err.message;
    MapJob.finishedOn = new Date().getTime();
    sockets_1.userSocketsEmit(job.data.user, job.data.job.id, MapJob);
});
exports.JQueue.on('progress', (job, progress) => {
    sockets_1.userSocketsEmit(job.data.user, job.data.job.id, mapJob(job));
});
exports.JQueue.on('completed', job => {
    job.data.message = `${job.data.job.id} completed`;
    const MapJob = mapJob(job);
    MapJob.finishedOn = new Date().getTime();
    sockets_1.userSocketsEmit(job.data.user, job.data.job.id, MapJob);
});
exports.JQueue.on('removed', job => {
    job.data.message = `${jobFullDescription(job)}"  is removed`;
    const MapJob = mapJob(job);
    MapJob.finishedOn = new Date().getTime();
    sockets_1.userSocketsEmit(job.data.user, job.data.job.id, MapJob);
});
exports.JQueue.on('stalled', job => {
    job.data.message = `${job.data.job.id} is stalled`;
    const MapJob = mapJob(job);
    MapJob.finishedOn = new Date().getTime();
    sockets_1.userSocketsEmit(job.data.user, job.data.job.id, MapJob);
});
function jobFullDescription(j) {
    return `${j.data.job.id}:${j.id} "${j.data.job.description}"`;
}
exports.jobFullDescription = jobFullDescription;
function mapJob(j) {
    const job = j.toJSON();
    const result = {
        id: job.id.toString(),
        progress: job.progress,
        opts: job.opts,
        delay: job.delay,
        timestamp: job.timestamp,
        returnvalue: job.returnvalue,
        attemptsMade: job.attemptsMade,
        failedReason: job.failedReason,
        finishedOn: job.finishedOn,
        processedOn: job.processedOn,
        message: job.data.message,
        data: Object.assign(Object.assign({}, job.data), { message: job.data.message })
    };
    return result;
}
exports.mapJob = mapJob;
//# sourceMappingURL=tasks.js.map