import { Exclude, Expose } from 'class-transformer';

export class ResponseTimeLogDto {
  @Expose()
  id: string;

  @Expose()
  endedAt: Date | null | undefined;

  @Expose()
  timeSpent: string;

  @Exclude()
  taskId: string;
}
