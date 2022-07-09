import * as dotenv from 'dotenv';
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Project } from "../entity/project.entity";
import { User } from "../entity/user.entity";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "joao",
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Project],
    migrations: [],
    subscribers: [],
})
