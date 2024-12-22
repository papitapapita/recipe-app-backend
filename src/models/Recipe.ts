import { RecipeData } from './recipe.data';

export class Recipe implements RecipeData {
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

  constructor(data: RecipeData) {
    this.recipeId = data.recipeId;
    this.title = data.title;
    this.description = data.description;
    this.preparingTime = data.preparingTime;
    this.cookingTime = data.cookingTime;
    this.imageUrl = data.imageUrl;
    this.calories = data.calories;
    this.carbs = data.carbs;
    this.protein = data.protein;
    this.fat = data.fat;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}
