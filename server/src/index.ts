import "reflect-metadata"
import * as dotenv from 'dotenv';
import * as express from 'express';
import { AppDataSource } from "./infra/dataSource";
import { UserRoutes } from "./controller";

dotenv.config();

const app = express();
app.use(express.json());

app.use(UserRoutes)

AppDataSource.initialize().then(() => {
  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`Server is running at ${port} 🚀`);
  });
})