import { RecipeData } from './RecipeData';
import { InstructionSummary } from './Instruction';
import { Tag } from './Tag';
export class Recipe implements RecipeData {
  recipeId: number;
  title: string;
  description?: string;
  imageUrl: string;
  preparingTime?: number;
  cookingTime?: number;
  calories?: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  instructions: InstructionSummary[];
  tags?: Tag[];
  createdAt?: string;
  updatedAt: string;

  constructor(data?: RecipeData) {
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
    this.instructions = data.instructions;
    this.tags = data.tags;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
