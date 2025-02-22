import { afterEach } from 'node:test';
import {
  RecipeTag,
  Recipe,
  Tag,
  RecipeIngredient
} from '../src/models';
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

const testTags = [
  {
    name: 'Tag 1'
  },
  {
    name: 'Tag 2'
  },
  {
    name: 'Tag 3'
  }
];

describe('Recipe Tag Model', () => {
  beforeEach(async () => {
    await Recipe.truncate({ cascade: true, restartIdentity: true });
    await Tag.truncate({ cascade: true, restartIdentity: true });
    await RecipeTag.truncate();
  });

  test('should associate a recipe with a tag', async () => {
    const recipe = await Recipe.create(testRecipes[0]);
    const tag = await Tag.create(testTags[0]);

    await recipe.$add('tag', tag);

    const tags = await recipe.$get('tags');

    expect(tags.length).toBe(1);
    expect(tags[0].id).toBe(tag.id);
  });

  test('should create an entry in the recipeTag table', async () => {
    const recipe = await Recipe.create(testRecipes[0]);
    const tag = await Tag.create(testTags[0]);

    await RecipeTag.create({ recipeId: recipe.id, tagId: tag.id });

    const entry = await RecipeTag.findOne({
      where: { recipeId: recipe.id, tagId: tag.id }
    });

    expect(entry).toBeDefined();
  });

  test('should delete join table entries when a recipe is deleted', async () => {
    const recipe = await Recipe.create(testRecipes[0]);
    const tags: Tag[] = [];
    testTags.forEach(async (testTag) => {
      const tag = await Tag.create(testTag);
      tags.push(tag);
    });

    await recipe.$add('tags', tags);

    await recipe.destroy();

    const entry = await RecipeTag.findAll({
      where: { recipeId: recipe.id }
    });

    expect(entry.length).toBe(0);
  });

  test('should delete join table entry when a tag is deleted', async () => {
    const tag = await Tag.create(testTags[0]);
    const recipes: Recipe[] = [];
    testRecipes.forEach(async (testRecipe) => {
      const tag = await Recipe.create(testRecipe);
      recipes.push(tag);
    });

    recipes.forEach(async (recipe) => {
      await recipe.$add('tag', tag);
    });

    await tag.destroy();

    const entry = await RecipeTag.findAll({
      where: { tagId: tag.id }
    });

    expect(entry.length).toBe(0);
  });
});
