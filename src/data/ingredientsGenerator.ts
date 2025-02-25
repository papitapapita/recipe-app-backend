import { faker } from '@faker-js/faker';
import { IngredientDTO } from '../types/Ingredient';
import { objectGenerator } from './objectGenerator';

const createIngredients = objectGenerator<IngredientDTO>(() => ({
  name: faker.food.ingredient() + faker.string.alphanumeric(2)
}));

export { createIngredients };
