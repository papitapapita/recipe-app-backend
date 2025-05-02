import { Ingredient } from '../src/database/models';
import { describe, test, expect, beforeEach } from '@jest/globals';

const testIngredient = {
  name: 'Spaghetti'
};

describe('Ingredient Model', () => {
  beforeEach(async () => {
    await Ingredient.destroy({ where: {} });
  });

  test('should create a ingredient succesfully', async () => {
    const ingredient = await Ingredient.create(testIngredient);

    expect(ingredient.id).toBeDefined();
    expect(ingredient.name).toBe(testIngredient.name);
  });

  test('should autoincrement the id for every instance', async () => {
    const ingredient1 = await Ingredient.create(testIngredient);

    const ingredient2 = await Ingredient.create({
      name: 'Another ingredient'
    });

    expect(ingredient2.id).toBe(ingredient1.id + 1);
  });

  test('should not allow duplicate titles', async () => {
    await expect(async () => {
      await Ingredient.create(testIngredient);
      await Ingredient.create(testIngredient);
    }).rejects.toThrow();
  });

  test('should enforce name as required', async () => {
    await expect(Ingredient.create({})).rejects.toThrow();
  });

  test('should update an ingredient', async () => {
    const ingredient = await Ingredient.create(testIngredient);

    await ingredient.update({ name: 'Garlic' });

    expect(ingredient.name).toBe('Garlic');
  });

  test('should delete a ingredient', async () => {
    const ingredient = await Ingredient.create(testIngredient);

    await ingredient.destroy();
    const deletedIngredient = await Ingredient.findByPk(
      ingredient.id
    );

    expect(deletedIngredient).toBeNull();
  });
});
