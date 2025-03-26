import { Account } from '@my-task-timer/account-users-domain';
import { Status } from '@my-task-timer/shared-interfaces';

export interface Task {
  id: string;
  title: string;
  status: Status;
  dueDate: string;
  createdAt: Date;
  updatedAt: Date;
  totalTimeSpent: string;

  userId: string;
  user?: Account;
}
