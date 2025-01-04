import { faker } from '@faker-js/faker';
import { InstructionSummary as Instruction } from '../models/Instruction';

export function createInstructions(amount: number) {
  const instructions: Instruction[] = [];

  for (let i = 0; i < amount; i++) {
    instructions.push({
      step: i + 1,
      title: faker.food.adjective,
      description: faker.food.description
    });
  }

  return instructions;
}
