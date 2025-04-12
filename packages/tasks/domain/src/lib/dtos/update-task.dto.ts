import { CreateTaskDto } from './create-task.dto';
import { PartialType } from '@nestjs/mapped-types';
import { STATUS, Status } from '@my-task-timer/shared-interfaces';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @Expose()
  @IsOptional()
  @IsEnum(STATUS, { message: 'Status inválido' })
  @ApiProperty({
    example: 'DOING',
    enum: STATUS,
    description: 'Status da tarefa',
    required: false
  })
  status?: Status;
}
