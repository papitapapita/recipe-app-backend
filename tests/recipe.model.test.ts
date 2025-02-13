import { Recipe } from '../src/models';
import { describe, test, expect, beforeEach } from '@jest/globals';

const testRecipe = {
  title: 'Pasta',
  description: 'A simple pasta recipe',
  preparingTime: 15,
  cookingTime: 10,
  imageUrl: 'http://example.com/pasta.jpg'
};

describe('Recipe Model', () => {
  beforeEach(async () => {
    await Recipe.destroy({ where: {} });
  });

  test('should create a recipe succesfully', async () => {
    const recipe = await Recipe.create(testRecipe);

    expect(recipe.id).toBeDefined();
    expect(recipe.title).toBe(testRecipe.title);
    expect(recipe.description).toBe(testRecipe.description);
    expect(recipe.preparingTime).toBe(testRecipe.preparingTime);
    expect(recipe.cookingTime).toBe(testRecipe.cookingTime);
    expect(recipe.imageUrl).toBe(testRecipe.imageUrl);
  });

  test('should autoincrement the id for every instance', async () => {
    const recipe1 = await Recipe.create(testRecipe);

    const recipe2 = await Recipe.create({
      ...testRecipe,
      title: 'Another recipe'
    });

    expect(recipe2.id).toBe(recipe1.id + 1);
  });

  test('should not allow duplicate titles', async () => {
    await expect(async () => {
      await Recipe.create(testRecipe);
      await Recipe.create(testRecipe);
    }).rejects.toThrow();
  });

  test('should enforce title, description and imageUrl as required', async () => {
    await expect(
      Recipe.create({
        preparingTime: 10
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
