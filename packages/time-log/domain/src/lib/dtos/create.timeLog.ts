import { Expose } from "class-transformer";
import { IsDateString, IsString } from "class-validator";

export class CreateTimeLogDto {

    @Expose()
    @IsDateString(
        {}, { message: 'A data de início do log de tempo é obrigatória.' })
    startedAt!: Date;

    @Expose()
    @IsString({ message: 'O id da tarefa é obrigatório.' })
    taskId!: string;
}