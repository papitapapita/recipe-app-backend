import { RecipeInput } from '../src/types/Recipe';
import {
  beforeAll,
  describe,
  beforeEach,
  test,
  expect,
  jest
} from '@jest/globals';
import { sequelize, recipesService } from './jest.setup';
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

describe('Recipe Service Layer', () => {
  beforeAll(async () => {
    const testingValues = 3;
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

  test('should create a new recipe with ingredients, instructions and tags', async () => {
    try {
      const recipeData: RecipeInput = {
        title: 'Test Recipe',
        description: 'A delicious test recipe',
        imageUrl: 'https://example.com/image.jpg',
        preparingTime: 10,
        cookingTime: 20,
        calories: 300,
        carbs: 50,
        protein: 10,
        fat: 5,
        ingredients: [
          { name: 'Flour', measurement: 'cups', quantity: 2 },
          { name: 'Sugar', measurement: 'tbsp', quantity: 1 }
        ],
        instructions: [
          { title: 'Step 1', description: 'Mix ingredients' },
          { title: 'Step 2', description: 'Bake in oven' }
        ],
        tags: [{ name: 'Dessert' }]
      };

      const recipe = await recipesService.createRecipe(recipeData);

      expect(recipe).toBeDefined();
      expect(recipe.title).toBe(recipeData.title);

      const ingredients = await recipe.$get('ingredients');
      expect(ingredients.length).toBe(2);
      expect(ingredients[0].name).toBe(
        recipeData.ingredients[0].name
      );
      expect(ingredients[1].name).toBe(
        recipeData.ingredients[1].name
      );

      const instructions = await Instruction.findAll({
        where: { recipeId: recipe.id }
      });
      expect(instructions.length).toBe(2);

      const tags = await recipe.$get('tags');
      expect(tags.length).toBe(1);
      expect(tags[0].name).toBe('Dessert');
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test('should rollback transaction if ingredient creation fails', async () => {
    const recipeData = {
      title: 'Test Recipe with Invalid Ingredient',
      description: 'This should fail',
      imageUrl: 'https://example.com/image.jpg',
      ingredients: [{ name: null, measurement: 'cups', quantity: 2 }], // Invalid ingredient
      instructions: [],
      tags: []
    } as unknown as RecipeInput;

    await expect(
      recipesService.createRecipe(recipeData)
    ).rejects.toThrow();

    const recipes = await Recipe.findAll({
      where: { title: recipeData.title }
    });

    expect(recipes.length).toBe(0);
  });

  test('should update a recipe successfully', async () => {
    try {
      const updatedData = {
        title: 'Updated Recipe',
        description: 'Updated Description',
        imageUrl: 'https://example.com/image.jpg',
        ingredients: [
          { name: 'New Ingredient', quantity: 2, measurement: 'cups' }
        ],
        instructions: [
          { title: 'Step 1', description: 'Do something' }
        ],
        tags: [{ name: 'Updated Tag' }]
      };

      const recipe = await recipesService.updateRecipe(
        1,
        updatedData
      );

      console.log(recipe);

      expect(recipe?.title).toBe('Updated Recipe');
      expect(recipe?.description).toBe('Updated Description');

      const ingredients = await RecipeIngredient.findAll({
        where: { recipeId: recipe?.id }
      });
      expect(ingredients.length).toBe(1);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});
