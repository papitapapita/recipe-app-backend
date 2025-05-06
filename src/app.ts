import express from 'express';
import routerApi from './routes/index.routes';
import { config } from './config/config';
import passport from 'passport';
import { localStrategy } from './utils/auth/strategies/local.strategy';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello');
});

passport.use(localStrategy);

app.use(passport.initialize());

routerApi(app);

app.listen(config.port, () => {
  console.log(`Server running on ${config.port}`);
});
