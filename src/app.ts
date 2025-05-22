import express from 'express';
import routerApi from './routes/index.routes';
import { config } from './config/config';
import passport from 'passport';
import { localStrategy, jwtStrategy } from './utils/auth/strategies';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello');
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(passport.initialize());

routerApi(app);

app.listen(config.port, () => {
  console.log(`Server running on ${config.port}`);
});
