import { faker } from '@faker-js/faker';
import { objectGenerator } from './objectGenerator';
import { RecipeData } from '../types/RecipeData';
import { createInstructions } from './instructionsGenerator';
import { createTags } from './tagsGenerator';
import { Recipe } from '../models/Recipe';

const createRecipes = objectGenerator<RecipeData>(
  (index?) =>
    new Recipe({
      recipeId: index!,
      title: faker.food.dish(),
      description: faker.food.description(),
      imageUrl: faker.image.url(),
      preparingTime: faker.number.int(180),
      cookingTime: faker.number.int(180),
      calories: faker.number.int(1000),
      carbs: faker.number.int(1000),
      protein: faker.number.int(1000),
      fat: faker.number.int(1000),
      instructions: createInstructions(5),
      tags: createTags(3),
      createdAt: Date().toString(),
      updatedAt: Date().toString()
    })
);

export { createRecipes };
