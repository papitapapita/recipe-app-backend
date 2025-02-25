import { IngredientDTO } from './Ingredient';
import { InstructionDTO } from './Instruction';
import { TagDTO } from './Tag';

export interface RecipeInput {
  title: string;
  description: string;
  imageUrl: string;
  preparingTime?: number;
  cookingTime?: number;
  calories?: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  ingredients: IngredientDTO[];
  instructions: InstructionDTO[];
  tags?: TagDTO[];
}

export type RecipeDTO = Omit<
  RecipeInput,
  'ingredients' | 'instructions' | 'tags'
>;
