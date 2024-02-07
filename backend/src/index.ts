import cors from 'cors';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import { login, plantdata, register } from './routes';
import { AppDataSource } from './typeorm.config';

const port = 3001;
let cookieSecure = true;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
  process.env.URL = `http://localhost:${port}`;
  cookieSecure = false;
}
const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.BACKEND_SECRET_KEY || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: cookieSecure },
  })
);
app.use(
  cors({
    origin: '*',
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/login', login);
app.use('/register', register);
app.use('/plantdata', plantdata);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
