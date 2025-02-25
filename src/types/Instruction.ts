export interface Instruction {
  instructionId: number;
  recipeId: number;
  step: number;
  title: string;
  description: string;
}

export type InstructionDTO = Omit<Instruction, 'instructionId'>;
