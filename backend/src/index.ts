import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './typeorm.config';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
