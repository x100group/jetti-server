export interface IEvent {
    id: string;
    startedAt: Date;
    endedAt: Date;
    description: string;
    user: string;
    error: string;
    progress: number;
    url: string;
}
