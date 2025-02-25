import {
  beforeAll,
  describe,
  test,
  beforeEach,
  expect
} from '@jest/globals';
import { RecipesService } from '../src/services/recipes.service';
import {
  Ingredient,
  Recipe,
  Tag,
  Instruction,
  RecipeIngredient,
  RecipeTag
} from '../src/models';
import {
  createRecipes,
  createInstructions,
  createIngredients,
  createTags,
  createRecipeIngredient,
  createRecipeTag
} from '../src/data/';

const recipesService = new RecipesService(Recipe);
const testingValues = 3;

describe('Recipe Service Layer', () => {
  beforeAll(async () => {
    try {
      await Recipe.bulkCreate(createRecipes(testingValues) as any[]);
      await Ingredient.bulkCreate(
        createIngredients(testingValues * 3)
      );
      await RecipeIngredient.bulkCreate(
        createRecipeIngredient(10, testingValues, testingValues * 3)
      );
      await Tag.bulkCreate(createTags(testingValues * 3));
      await RecipeTag.bulkCreate(
        createRecipeTag(10, testingValues, testingValues * 3) as any[]
      );
      await Instruction.bulkCreate(
        createInstructions(testingValues * 3)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test('Should get all recipes', async () => {
    const recipes = await recipesService.getAllRecipes();

    expect(recipes.length).toBe(3);
    expect(recipes[0]).toBeDefined();
  });

  test('Should get a certain amount of recipes', async () => {
    const recipes = await recipesService.getAllRecipes({ limit: 2 });

    expect(recipes.length).toBe(2);
    expect(recipes[0]).toBeDefined();
  });

  test('Should get recipes in order', async () => {
    try {
      const recipes = await recipesService.getAllRecipes({
        limit: 2,
        order: [['id', 'DESC']]
      });

      console.log(recipes);

      expect(recipes[0].id).toBe(3);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test('should get a recipe', async () => {
    const recipe = await recipesService.getRecipe(1);

    expect(recipe).toBeDefined();
  });

  test('should throw an error when no recipe', async () => {
    expect(recipesService.getRecipe(10)).rejects.toThrow();
  });
});
