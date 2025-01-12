import { RecipesService } from '../dist/services/recipes.service.js';
import boom from '@hapi/boom';
import { createRecipes } from '../dist/data/recipesGenerator.js';

let service;

beforeEach(() => {
  service = new RecipesService(createRecipes(10));
});

describe('RecipeService', () => {});
