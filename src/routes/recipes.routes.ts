import express from 'express';
import validate from '../middlewares/validator';
import {
  idSchema,
  recipeSchema,
  softRecipeSchema
} from '../utils/schemas';
import RecipeController from '../controllers/recipes.controller';
import { paginationSchema } from '../utils/schemas/queries.schema';
import checkApiKey from '../middlewares/auth';

const recipeController = new RecipeController();
const router = express.Router();

// GET /recipes - Get all recipes with pagination
router.get(
  '/',
  validate(paginationSchema, 'query'),
  checkApiKey,
  recipeController.getRecipes()
);

// GET /recipes/:id - Get a specific recipe
router.get(
  '/:id',
  validate(idSchema, 'params'),
  recipeController.getRecipe()
);

// POST /recipes - Create a new recipe
router.post(
  '/',
  validate(recipeSchema, 'body'),
  recipeController.createRecipes()
);

// PUT /recipes/:id - Replace an existing recipe
router.put(
  '/:id',
  validate(idSchema, 'params'),
  validate(recipeSchema, 'body'),
  recipeController.replaceRecipe()
);

// PATCH /recipes/:id - Partially update a recipe
router.patch(
  '/:id',
  validate(idSchema, 'params'),
  validate(softRecipeSchema, 'body'),
  recipeController.updateRecipe()
);

// DELETE /recipes/:id - Delete a recipe
router.delete(
  '/:id',
  validate(idSchema, 'params'),
  recipeController.deleteRecipe()
);

export default router;
//router.get('/search', validate);
