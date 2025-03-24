import { Task } from '../../../../../tasks/domain'
export interface TimeLog {
    id: string;
    startedAt: Date;
    endedAt?: Date | null;
    timeSpent: string;

    taskId: string;
    task?: Task;
}