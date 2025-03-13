import { StatusType } from '../enum/task-status.enum';

export interface Task {
    id: string;
    title: string;
    status: StatusType;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    totalTimeSpent: number;
    timerStartedAt: Date;
}