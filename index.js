import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config.js';
import cors from 'cors';
import db from './database/connection.js';
import router from './routes/router.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use('/', router);
app.use('/', (req, res) => {
  res.status(404).send({ error: 'Invalid URL' });
});

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
  db();
});
