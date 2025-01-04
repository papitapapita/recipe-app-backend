import { faker } from '@faker-js/faker';
import { InstructionDTO as Instruction } from '../types/Instruction';
import { objectGenerator } from './objectGenerator';

const createInstructions = objectGenerator<Instruction>(
  (index?: number) => ({
    step: (index ?? 0) + 1,
    title: faker.food.adjective(),
    description: faker.food.description()
  })
);

console.log(createInstructions(10));

export { createInstructions };
