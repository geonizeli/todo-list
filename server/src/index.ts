import "reflect-metadata"
import * as dotenv from 'dotenv';
import * as express from 'express';
import { AppDataSource } from "./infra/dataSource";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at ${port} 🚀`);
  });
})