import {
  Create,
  FindOne,
  FindAll,
  Delete,
  Update,
} from '@my-task-timer/shared-interfaces';
import { TimeLog } from '../entities/time-log.entity';

export abstract class TimeLogRepository
  implements
    Create<TimeLog, TimeLog>,
    Update<TimeLog, 'id', TimeLog>,
    FindOne<TimeLog, 'id', TimeLog>,
    FindAll<TimeLog>,
    Delete<TimeLog, 'id', string>
{
  abstract createOne(input: TimeLog): Promise<TimeLog>;

  abstract updateOne(id: string, input: TimeLog): Promise<TimeLog>;

  abstract deleteOne(id: string): Promise<string>;

  abstract findOne(id: string): Promise<TimeLog>;

  abstract findAll(): Promise<TimeLog[]>;
}
