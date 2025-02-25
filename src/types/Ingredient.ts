export interface Ingredient {
  ingredient_id: number;
  name: string;
  quantity?: number;
  measurement?: string;
}

export type IngredientDTO = Omit<Ingredient, 'ingredient_id'>;
