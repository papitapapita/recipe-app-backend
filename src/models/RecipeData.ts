export interface RecipeData {
  recipeId: number;
  title: string;
  description?: string;
  preparingTime?: number;
  cookingTime?: number;
  imageUrl?: string;
  calories?: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  createdAt?: Date;
  updatedAt: Date;
}
