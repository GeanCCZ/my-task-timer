import { BaseEntity } from '@my-task-timer/shared-interfaces';

export interface Account extends BaseEntity {
  username: string;
  email: string;
  password: string;
}
