import { faker } from '@faker-js/faker';
import { objectGenerator } from './objectGenerator';
import { RecipeData } from '../types/RecipeData';
import { createInstructions } from './instructionsGenerator';

const recipesGenerator = objectGenerator<RecipeData>(
  (index?) => ({
    recipeId: index!,
    title: faker.food.dish(),
    imageUrl: faker.image.url(),
    instructions: createInstructions(5),
    updatedAt: Date().toString()
  })
);
