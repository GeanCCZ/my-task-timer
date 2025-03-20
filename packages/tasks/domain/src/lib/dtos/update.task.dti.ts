import { IsNotEmpty } from "drizzle-orm";
import { CreateTaskDto } from "./create.task.dto";

export class UpdateTaskDto extends CreateTaskDto {

    @IsNotEmpty()
    id: string

}
