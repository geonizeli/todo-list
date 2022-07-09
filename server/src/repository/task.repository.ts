import { Task } from "../entity/task.entity";
import { AppDataSource } from "../infra/dataSource";

export const taskRepository = AppDataSource.getRepository(Task)
