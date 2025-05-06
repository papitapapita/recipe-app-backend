import { Router, Express } from 'express';
import recipesRouter from './recipes.routes';
import userRouter from './user.routes';

export default function routerApi(app: Express) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/recipes', recipesRouter);
  router.use('/users', userRouter);
}
