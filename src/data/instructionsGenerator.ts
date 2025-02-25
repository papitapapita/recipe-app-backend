import { faker } from '@faker-js/faker';
import { InstructionDTO } from '../types/Instruction';
import { objectGenerator } from './objectGenerator';

const stepTrack = new Map<number, number>();

const createInstructions = objectGenerator<InstructionDTO>(
  (index?) => {
    const recipeId = Math.floor((index! + 3) / 3);
    const lastStep = stepTrack.get(recipeId) || 0;
    const newStep = lastStep + 1;

    return {
      recipeId,
      step: newStep,
      title: faker.food.adjective(),
      description: faker.food.description()
    };
  }
);

export { createInstructions };
