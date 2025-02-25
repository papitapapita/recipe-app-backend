export interface RecipeIngredient {
  id: number;
  recipeId: number;
  ingredientId: number;
  quantity: number;
  measurement: string;
}

export type RecipeIngredientDTO = Omit<RecipeIngredient, 'id'>;
