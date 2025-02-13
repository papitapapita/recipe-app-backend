import { Instruction, Recipe } from '../src/models';
import {
  describe,
  test,
  expect,
  beforeEach,
  beforeAll
} from '@jest/globals';

const testInstruction = {
  recipeId: 1,
  step: 1,
  title: 'cooking',
  description: 'cut the onions and cook them'
};

const testRecipe = {
  title: 'Pasta',
  description: 'A simple pasta recipe',
  preparingTime: 15,
  cookingTime: 10,
  imageUrl: 'http://example.com/pasta.jpg'
};

describe('Instruction Model', () => {
  beforeAll(async () => {
    await Recipe.create(testRecipe);
  });

  beforeEach(async () => {
    await Instruction.destroy({ where: {} });
  });

  test('should create an instruction succesfully', async () => {
    const instruction = await Instruction.create(testInstruction);

    expect(instruction.id).toBeDefined();
    expect(instruction.recipeId).toBe(testInstruction.recipeId);
    expect(instruction.step).toBe(testInstruction.step);
    expect(instruction.description).toBe(testInstruction.description);
  });

  test('should autoincrement the id for every instance', async () => {
    try {
      const instruction1 = await Instruction.create(testInstruction);

      const instruction2 = await Instruction.create(testInstruction);

      expect(instruction2.id).toBe(instruction1.id + 1);
    } catch (error) {
      console.error('Sequelize error', error);
      throw error;
    }
  });

  test('should enforce recipeId, step and description as required', async () => {
    await expect(
      Instruction.create({ title: 'Cut Onions' })
    ).rejects.toThrow();
  });

  test('should update an instruction', async () => {
    const instruction = await Instruction.create(testInstruction);

    await instruction.update({ step: 2 });

    expect(instruction.step).toBe(2);
  });

  test('should delete a instruction', async () => {
    const instruction = await Instruction.create(testInstruction);

    await instruction.destroy();
    const deletedInstruction = await Instruction.findByPk(
      instruction.id
    );

    expect(deletedInstruction).toBeNull();
  });
});
