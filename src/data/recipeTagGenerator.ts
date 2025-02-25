import { RecipeTag } from '../types/RecipeTag';
import { faker } from '@faker-js/faker';

export function createRecipeTag(
  amount: number,
  recipeLimit: number,
  tagLimit: number
) {
  if (amount > recipeLimit * tagLimit) {
    amount = recipeLimit * tagLimit;
  }

  const recipesTags: RecipeTag[] = [];
  const usedPairs = new Set<string>();

  while (recipesTags.length < amount) {
    let recipeId = faker.number.int({ min: 1, max: recipeLimit });
    let tagId = faker.number.int({
      min: 1,
      max: tagLimit
    });

    const pairKey = `${recipeId}-${tagId}`;

    if (!usedPairs.has(pairKey)) {
      usedPairs.add(pairKey);
      recipesTags.push({
        recipeId,
        tagId
      });
    }
  }
  return recipesTags;
}
