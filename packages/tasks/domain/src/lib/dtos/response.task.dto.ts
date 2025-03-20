import { Account } from '@my-task-timer/account-users-domain';
import { Status } from '@my-task-timer/shared-interfaces';
import { Exclude, Expose } from 'class-transformer';

export class ResponseTaskDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  status!: Status;

  @Expose()
  dueDate!: string;

  @Exclude()
  createdAt!: Date;

  @Exclude()
  updatedAt!: Date;

  @Expose()
  totalTimeSpent!: string;

  @Exclude()
  userId!: string;

  @Exclude()
  user?: Account | undefined;
}
