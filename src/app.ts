import express from 'express';
import 'dotenv/config';
import process from 'node:process';
import routerApi from './routes/index.router';

const app = express();
const { PORT } = process.env || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello');
});

routerApi(app);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
