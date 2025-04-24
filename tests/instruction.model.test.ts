import { Instruction, Recipe } from '../src/db/models';
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
  // A global recipe instance for all tests
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

  test('should not create an instruction of a non existing recipe', async () => {
    await expect(
      Instruction.create({ ...testInstruction, recipeId: 10 })
    ).rejects.toThrow();
  });

  test('should delete instructions related to a recipe being deleted', async () => {
    const recipe = await Recipe.create({
      title: 'Cake',
      description: 'Tasty cake',
      imageUrl: 'cake.jpg'
    });

    await Instruction.create({
      recipeId: recipe.id,
      step: 1,
      description: 'description 1'
    });

    await Instruction.create({
      recipeId: recipe.id,
      step: 2,
      description: 'description 1'
    });

    await recipe.destroy();

    const instructions = await Instruction.findAll({
      where: { recipeId: recipe.id }
    });

    expect(instructions.length).toBe(0);
  });
});
