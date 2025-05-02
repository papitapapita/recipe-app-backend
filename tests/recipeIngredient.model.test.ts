import {
  Recipe,
  Ingredient,
  RecipeIngredient
} from '../src/database/models';
import { beforeEach, describe, expect, test } from '@jest/globals';

const testRecipes = [
  {
    title: 'Recipe 1',
    description: 'Recipe 1 description',
    imageUrl: 'http://example.com/recipe1.jpg'
  },
  {
    title: 'Recipe 2',
    description: 'Recipe 2 description',
    imageUrl: 'http://example.com/recipe2.jpg'
  },
  {
    title: 'Recipe 3',
    description: 'Recipe 3 description',
    imageUrl: 'http://example.com/recipe3.jpg'
  }
];

const testIngredients = [
  {
    name: 'Ingredient 1'
  },
  {
    name: 'Ingredient 2'
  },
  {
    name: 'Ingredient 3'
  }
];

describe('Recipe Ingredient Model', () => {
  beforeEach(async () => {
    await Recipe.truncate({ cascade: true, restartIdentity: true });
    await Ingredient.truncate({
      cascade: true,
      restartIdentity: true
    });
    await RecipeIngredient.truncate({ restartIdentity: true });
  });

  test('should associate a recipe with an ingredient', async () => {
    const recipe = await Recipe.create(testRecipes[0]);
    const ingredient = await Ingredient.create(testIngredients[0]);

    await recipe.$add('ingredient', ingredient, {
      through: { quantity: 15, measurement: 'g' }
    });

    const ingredients = await recipe.$get('ingredients');

    expect(ingredients.length).toBe(1);
    expect(ingredients[0].id).toBe(ingredient.id);
  });

  test('should create an entry in the recipeIngredient table', async () => {
    const recipe = await Recipe.create(testRecipes[0]);
    const ingredient = await Ingredient.create(testIngredients[0]);

    await RecipeIngredient.create({
      recipeId: recipe.id,
      ingredientId: ingredient.id,
      quantity: 2,
      measurement: 'ml'
    });

    const entry = await RecipeIngredient.findOne({
      where: { recipeId: recipe.id, ingredientId: ingredient.id }
    });

    expect(entry).toBeDefined();
  });

  test('should delete join table entries when a recipe is deleted', async () => {
    try {
      const recipe = await Recipe.create(testRecipes[0]);
      console.log(recipe.id);

      for (const testIngredient of testIngredients) {
        const ingredient = await Ingredient.create(testIngredient);
        await recipe.$add('ingredient', ingredient, {
          through: { quantity: 10, measurement: 'gr' }
        });
      }

      await recipe.destroy();

      const entry = await RecipeIngredient.findAll({
        where: { recipeId: recipe.id }
      });

      expect(entry.length).toBe(0);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  test('should delete join table entry when a ingredient is deleted', async () => {
    const ingredient = await Ingredient.create(testIngredients[0]);
    const recipes: Recipe[] = [];
    testRecipes.forEach(async (testRecipe) => {
      const ingredient = await Recipe.create(testRecipe);
      recipes.push(ingredient);
    });

    recipes.forEach(async (recipe, i) => {
      await recipe.$add('ingredient', ingredient, {
        through: { quantity: i * 10, measurement: 'gr' }
      });
    });

    await ingredient.destroy();

    const entry = await RecipeIngredient.findAll({
      where: { ingredientId: ingredient.id }
    });

    expect(entry.length).toBe(0);
  });
});
