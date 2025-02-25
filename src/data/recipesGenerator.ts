import { faker } from '@faker-js/faker';
import { objectGenerator } from './objectGenerator';
import { RecipeDTO } from '../types/Recipe';

const createRecipes = objectGenerator<RecipeDTO>(() => ({
  title: faker.food.dish() + faker.string.alphanumeric(2),
  description: faker.food.description(),
  imageUrl: faker.image.url(),
  preparingTime: faker.number.int(180),
  cookingTime: faker.number.int(180),
  calories: faker.number.int(1000),
  carbs: faker.number.int(1000),
  protein: faker.number.int(1000),
  fat: faker.number.int(1000)
}));

export { createRecipes };
