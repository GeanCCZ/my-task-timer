import { Account } from '@my-task-timer/account-users-domain';
import { Status } from '@my-task-timer/shared-interfaces';

export interface Task {
  id: string;
  title: string;
  status: Status;
  dueDate: string;
  createdAt: Date;
  updatedAt: Date;

  userId: string;
  user?: Account;
}
