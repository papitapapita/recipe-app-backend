import express from 'express';
import validate from '../middlewares/validator';
import { idSchema, recipeSchema } from '../utils/schemas';
import RecipeController from '../controllers/recipes.controller';

const {
  getRecipe,
  getRecipes,
  createRecipes,
  updateRecipe,
  replaceRecipe,
  deleteRecipe
} = new RecipeController();

const router = express.Router();

router.get('/', getRecipes());

router.get('/:id', validate(idSchema, 'params'), getRecipe());

router.post('/', validate(recipeSchema, 'body'), createRecipes());

router.put(
  '/:id',
  validate(idSchema, 'params'),
  validate(recipeSchema, 'body'),
  replaceRecipe()
);

router.patch(
  '/:id',
  validate(idSchema, 'params'),
  validate(recipeSchema, 'body'),
  updateRecipe()
);

router.delete(
  '/:id',
  validate(idSchema, 'params'),
  validate(recipeSchema, 'body'),
  deleteRecipe()
);

//router.get('/search', validate);
