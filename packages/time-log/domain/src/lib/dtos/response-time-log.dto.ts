import { Exclude, Expose } from 'class-transformer';
import { UpdateTimeLogDto } from './update-time-log';

export class ResponseTimeLogDto extends UpdateTimeLogDto {
  @Expose()
  timeSpent!: string;

  @Exclude()
  taskId!: string;
}
