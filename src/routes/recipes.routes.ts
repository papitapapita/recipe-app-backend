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
import passport from 'passport';
import { checkRole } from '../middlewares/auth.handler';
import { Role } from '../types/Role';

const recipeController = new RecipeController();
const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

// GET /recipes - Get all recipes with pagination
router.get(
  '/',
  checkRole(Role.Customer, Role.Admin, Role.Chef),
  validate(paginationSchema, 'query'),
  checkApiKey, //This CheckApiKey is here only to show off the use of api keys
  recipeController.getRecipes()
);

// GET /recipes/:id - Get a specific recipe
router.get(
  '/:id',
  checkRole(Role.Customer, Role.Admin, Role.Chef),
  validate(idSchema, 'params'),
  recipeController.getRecipe()
);

// POST /recipes - Create a new recipe
router.post(
  '/',
  checkRole(Role.Admin, Role.Chef),
  validate(recipeSchema, 'body'),
  recipeController.createRecipes()
);

// PUT /recipes/:id - Replace an existing recipe
router.put(
  '/:id',
  checkRole(Role.Admin, Role.Chef),
  validate(idSchema, 'params'),
  validate(recipeSchema, 'body'),
  recipeController.replaceRecipe()
);

// PATCH /recipes/:id - Partially update a recipe
router.patch(
  '/:id',
  checkRole(Role.Admin, Role.Chef),
  validate(idSchema, 'params'),
  validate(softRecipeSchema, 'body'),
  recipeController.updateRecipe()
);

// DELETE /recipes/:id - Delete a recipe
router.delete(
  '/:id',
  checkRole(Role.Admin),
  validate(idSchema, 'params'),
  recipeController.deleteRecipe()
);

export default router;
//router.get('/search', validate);
