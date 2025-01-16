import { Router, Express } from 'express';
import recipesRouter from './recipes.router';

export default function routerApi(app: Express) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/recipes', recipesRouter);
}
