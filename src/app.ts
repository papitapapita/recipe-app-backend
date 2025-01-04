import express from 'express';
import 'dotenv/config';
import process from 'node:process';

const app = express();
const { PORT } = process.env;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
