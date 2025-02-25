export interface RecipeDTO {
  title: string;
  description?: string;
  imageUrl: string;
  preparingTime?: number;
  cookingTime?: number;
  calories?: number;
  carbs?: number;
  protein?: number;
  fat?: number;
}
