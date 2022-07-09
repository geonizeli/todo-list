import "reflect-metadata"
import * as dotenv from 'dotenv';
import * as express from 'express';
import { AppDataSource } from "./infra/dataSource";
import { ProjectRoutes, UserRoutes } from "./controller";
import { RedisConnection } from "./infra/redis";
import { sessionMiddleware } from "./middleware/session.middleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(sessionMiddleware)

app.use(UserRoutes)
app.use(ProjectRoutes)

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