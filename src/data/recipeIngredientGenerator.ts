import { faker } from '@faker-js/faker';
import { RecipeIngredientDTO } from '../types/RecipeIngredient';

const measurements = ['kg', 'ml', 'gr', 'lb'];

export function createRecipeIngredient(
  amount: number,
  recipeLimit: number,
  ingredientLimit: number
) {
  if (amount > recipeLimit * ingredientLimit) {
    amount = recipeLimit * ingredientLimit;
  }

  const recipesIngredients: RecipeIngredientDTO[] = [];
  const usedPairs = new Set<string>();

  while (recipesIngredients.length < amount) {
    let recipeId = faker.number.int({ min: 1, max: recipeLimit });
    let ingredientId = faker.number.int({
      min: 1,
      max: ingredientLimit
    });

    const pairKey = `${recipeId}-${ingredientId}`;

    if (!usedPairs.has(pairKey)) {
      usedPairs.add(pairKey);
      recipesIngredients.push({
        recipeId,
        ingredientId,
        quantity: faker.number.int(1000),
        measurement:
          measurements[
            faker.number.int({ min: 0, max: measurements.length - 1 })
          ]
      });
    }
  }
  return recipesIngredients;
}
