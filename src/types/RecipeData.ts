import { InstructionDTO as Instruction } from './Instruction';
import { Tag } from './Tag';

export interface RecipeData {
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
  instructions: Instruction[];
  tags?: Tag[];
  createdAt?: string;
  updatedAt: string;
}
