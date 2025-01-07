import { faker } from '@faker-js/faker';
import { IngredientDTO as Ingredient } from '../types/Ingredient';
import { objectGenerator } from './objectGenerator';

const measurements = ['kg', 'ml', 'gr', 'lb'];

const createIngredients = objectGenerator<Ingredient>(
  () => ({
    name: faker.food.ingredient(),
    quantity: faker.number.int(1000),
    measurement:
      measurements[
        Math.floor(Math.random() * measurements.length)
      ]
  })
);

console.log(createIngredients(10));

export { createIngredients };
