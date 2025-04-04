import { Expose } from 'class-transformer';
import { CreateTimeLogDto } from './create-time-log.dto';
import { IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTimeLogDto extends CreateTimeLogDto {
  @Expose()
  @IsString({ message: 'O id do log de tempo é obrigatório.' })
  @ApiProperty({
    example: '123',
    description: 'ID do log de tempo',
  })
  id!: string;

  @Expose()
  @IsDateString({}, { message: 'A data de fim do log de tempo é obrigatória.' })
  @ApiProperty({
    example: '2025-01-01',
    description: 'Data de fim do log de tempo',
  })
  endedAt!: Date | null;
}
