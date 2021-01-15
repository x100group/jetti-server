export interface IJob {
    id: string;
    progress: number;
    opts: {
        [x: string]: any;
    };
    delay: number;
    timestamp: number;
    returnvalue: any;
    attemptsMade: number;
    failedReason: string;
    finishedOn: number;
    processedOn: number;
    data: {
        [x: string]: any;
    };
    message: string;
}
export interface JobInformation {
    key: string;
    name: string;
    id?: string;
    endDate?: number;
    tz?: string;
    cron: string;
    every: number;
    next: number;
}
export interface IJobs {
    Active: IJob[];
    Completed: IJob[];
    Delayed: IJob[];
    Failed: IJob[];
    Waiting: IJob[];
    RepeatableJobs?: JobInformation[];
}
export interface IJettiTask {
    id: number;
    description: string;
    user: string;
    progress: number;
    status: boolean;
    error: string;
    url: string;
    name: string;
}
