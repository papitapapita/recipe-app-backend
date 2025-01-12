import { RecipeData } from '../types/RecipeData';
import { InstructionDTO } from '../types/Instruction';
import { Tag } from '../types/Tag';
export class Recipe implements RecipeData {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  preparingTime?: number;
  cookingTime?: number;
  calories?: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  instructions: InstructionDTO[];
  tags?: Tag[];
  createdAt?: string;
  updatedAt: string;

  constructor(data: RecipeData) {
    this.id = data.id;
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
