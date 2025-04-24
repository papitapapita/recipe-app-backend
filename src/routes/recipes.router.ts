import express from 'express';
import validate from '../middlewares/validator';
import {
  idSchema,
  recipeSchema,
} from '../utils/schemas';
import RecipeController from '../controllers/recipes.controller';

const recipeController = new RecipeController();

const router = express.Router();

router.get('/', recipeController.getRecipes());

router.get(
  '/:id',
  validate(idSchema, 'params'),
  recipeController.getRecipe()
);

router.post(
  '/',
  validate(recipeSchema, 'body'),
  recipeController.createRecipes()
);

router.put(
  '/:id',
  validate(idSchema, 'params'),
  validate(recipeSchema, 'body'),
  recipeController.replaceRecipe()
);

router.patch(
  '/:id',
  validate(idSchema, 'params'),
  validate(recipeSchema, 'body'),
  recipeController.updateRecipe()
);

router.delete(
  '/:id',
  validate(idSchema, 'params'),
  recipeController.deleteRecipe()
);

export default router;
//router.get('/search', validate);
