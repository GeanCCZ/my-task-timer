import { CreateTaskDto } from './create.task.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Status } from '@my-task-timer/shared-interfaces';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  status: Status;
}
