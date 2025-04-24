import { RecipeInput } from '../src/types/Recipe';
import {
  beforeAll,
  describe,
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
} from '../src/db/models';
import {
  createRecipes,
  createInstructions,
  createIngredients,
  createTags,
  createRecipeIngredient,
  createRecipeTag
} from '../src/data/';
import boom from '@hapi/boom';

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

  test('should replace a recipe succesfully', async () => {
    try {
      const newRecipeData = {
        title: 'New Recipe',
        description: 'New desc',
        imageUrl: 'https://example.com/image.jpg',
        ingredients: [
          { name: 'Pepper', quantity: 2, measurement: 'tsp' }
        ],
        instructions: [
          { title: 'Step 1', description: 'Do something' }
        ],
        tags: [{ name: 'Sweet' }]
      };

      const updatedRecipe = await recipesService.replaceRecipe(
        2,
        newRecipeData
      );

      console.log(updatedRecipe);

      expect(updatedRecipe.title).toBe(newRecipeData.title);
      expect(updatedRecipe.description).toBe(
        newRecipeData.description
      );

      const ingredients = await RecipeIngredient.findAll({
        where: { recipeId: updatedRecipe.id }
      });
      expect(ingredients.length).toBe(1);
      expect(ingredients[0].quantity).toBe(
        newRecipeData.ingredients[0].quantity
      );

      // Verify instructions were replaced
      const instructions = await Instruction.findAll({
        where: { recipeId: updatedRecipe.id }
      });
      expect(instructions.length).toBe(1);
      expect(instructions[0].description).toBe(
        newRecipeData.instructions[0].description
      );

      // Verify tags were replaced
      const recipeTags = await updatedRecipe.$get('tags');
      expect(recipeTags.length).toBe(1);
      expect(recipeTags[0].name).toBe(newRecipeData.tags[0].name);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test('should throw error when recipe does not exist', async () => {
    await expect(
      recipesService.replaceRecipe(999, {
        title: 'New Recipe',
        description: 'New desc',
        imageUrl: 'https://example.com/image.jpg',
        ingredients: [
          { name: 'Pepper', quantity: 2, measurement: 'tsp' }
        ],
        instructions: [
          { title: 'Step 1', description: 'Do something' }
        ],
        tags: [{ name: 'Sweet' }]
      })
    ).rejects.toThrow(boom.notFound('Recipe not found'));
  });

  test('should rollback transaction on error', async () => {
    try {
      const recipe = await Recipe.create({
        title: 'New Recipe 3',
        description: 'New desc',
        imageUrl: 'https://example.com/image.jpg',
        ingredients: [
          { name: 'Pepper 3', quantity: 2, measurement: 'tsp' }
        ],
        instructions: [
          { title: 'Step 3', description: 'Do something' }
        ],
        tags: [{ name: 'Sweet' }]
      });

      jest
        .spyOn(Recipe.prototype, 'update')
        .mockRejectedValueOnce(new Error('Update failed'));

      await expect(
        recipesService.replaceRecipe(recipe.id, {
          title: 'New Recipe 2',
          description: 'New desc',
          imageUrl: 'https://example.com/image.jpg',
          ingredients: [
            { name: 'Pepper 2', quantity: 2, measurement: 'tsp' }
          ],
          instructions: [
            { title: 'Step 1', description: 'Do something' }
          ],
          tags: [{ name: 'Sweet 2' }]
        })
      ).rejects.toThrow('Update failed');

      // Ensure the recipe was not changed
      const unchangedRecipe = await Recipe.findByPk(recipe.id);
      expect(unchangedRecipe?.title).toBe('New Recipe 3');
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  test('should delete a recipe succesfully', async () => {
    await recipesService.deleteRecipe(1);

    const recipe = await Recipe.findByPk(1);
    const instructions = await Instruction.findAll({
      where: { recipeId: 1 }
    });
    const ingredients = await RecipeIngredient.findAll({
      where: { recipeId: 1 }
    });
    const tags = await RecipeTag.findAll({
      where: { recipeId: 1 }
    });
    expect(recipe).toBeNull();
    expect(instructions.length).toBe(0);
    expect(ingredients.length).toBe(0);
    expect(tags.length).toBe(0);
  });

  test('should throw a not found error if the recipe does not exist', async () => {
    await expect(recipesService.deleteRecipe(999)).rejects.toThrow(
      boom.notFound('Recipe not found')
    );
  });
});
