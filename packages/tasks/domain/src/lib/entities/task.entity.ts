import { Status } from "@my-task-timer/shared-interfaces";

export interface Task {
    id: string;
    title: string;
    status: Status;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    totalTimeSpent: number;
    timerStartedAt: Date;
}