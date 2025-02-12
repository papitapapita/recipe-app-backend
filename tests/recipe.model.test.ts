import {
  Recipe
  /*Ingredient,
  Tag,
  Instruction,
  RecipeIngredient,
  RecipeTag*/
} from '../src/models';
import { describe, test, expect } from '@jest/globals';

describe('Recipe Model', () => {
  test('should create a recipe succesfully', async () => {
    const recipe = await Recipe.create({
      title: 'Pasta',
      description: 'A simple pasta recipe',
      preparingTime: 15,
      cookingTime: 10,
      imageUrl: 'http://example.com/pasta.jpg'
    });

    expect(recipe.id).toBeDefined();
    expect(recipe.title).toBe('Pasta');
  });

  test('should enforce title as required', async () => {
    await expect(
      Recipe.create({
        description: 'Missing title'
      })
    ).rejects.toThrow();
  });

  test('should update a recipe', async () => {
    const recipe = await Recipe.create({
      title: 'Soup',
      description: 'A warm soup',
      imageUrl: 'http://example.com/soup.jpg'
    });

    await recipe.update({ title: 'Chicken Soup' });

    expect(recipe.title).toBe('Chicken Soup');
  });

  test('should delete a recipe', async () => {
    const recipe = await Recipe.create({
      title: 'Pizza',
      description: 'Delicious pizza',
      imageUrl: 'http://example.com/pasta.jpg'
    });

    await recipe.destroy();
    const deletedRecipe = await Recipe.findByPk(recipe.id);

    expect(deletedRecipe).toBeNull();
  });
});
