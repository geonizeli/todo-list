import { User } from "../entity/user.entity";
import { AppDataSource } from "../infra/dataSource";

export const userRepository = AppDataSource.getRepository(User)
