import { Expose } from "class-transformer";
import { UpdateTimeLogDto } from "./update.timeLog";

export class ResponseTimeLogDto extends UpdateTimeLogDto {

    @Expose()
    timeSpent!: string;

}