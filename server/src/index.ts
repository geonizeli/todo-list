import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import "reflect-metadata";
import { ProjectRoutes, UserRoutes } from "./controller";
import { TaskRoutes } from "./controller/task.controller";
import { AppDataSource } from "./infra/dataSource";
import { RedisConnection } from "./infra/redis";
import { sessionMiddleware } from "./middleware/session.middleware";

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());
app.use(sessionMiddleware)

app.use(UserRoutes)
app.use(ProjectRoutes)
app.use(TaskRoutes)

const startApp = async () => {
  console.log('[redis]: connecting')
  await RedisConnection.connect()
  console.log('[redis]: connected')

  console.log('[database]: connecting')
  await AppDataSource.initialize()
  console.log('[database]: connected')

  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`[server] is running at ${port} 🚀`);
  });
}

startApp()