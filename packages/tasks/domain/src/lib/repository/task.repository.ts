import { Create, Delete, FindAll, FindOne, Update } from "@my-task-timer/shared-interfaces";
import { Task } from "../entities/task.entity";

export abstract class TaskRepository implements Create<Task, Task>,
    FindOne<Task, keyof Task, Task>,
    Delete<Task, keyof Task, Task>,
    Update<Task, keyof Task, Task>,
    FindAll<Task> {

    abstract createOne(input: Task): Promise<Task>;

    abstract deleteOne(id: keyof Task): Promise<Task>;

    abstract findOne(id: keyof Task): Promise<Task>;

    abstract updateOne(id: keyof Task, input: Task): Promise<Task>;

    abstract findAll(): Promise<Task[]>;
}
