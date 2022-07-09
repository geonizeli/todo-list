import { Project } from "../entity/project.entity";
import { AppDataSource } from "../infra/dataSource";

export const projectRepository = AppDataSource.getRepository(Project)
