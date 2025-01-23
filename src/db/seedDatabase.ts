import { Sequelize } from 'sequelize-typescript';
import { faker } from '@faker-js/faker';
import {
  Ingredient,
  Instruction,
  Recipe,
  RecipeIngredient,
  RecipeTag,
  Tag
} from '../db/models';

export async function seedDatabase(
  sequelize: Sequelize,
  amount: number = 50
) {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');

    for (let i = 0; i < 20; i++) {
      await Tag.create({
        name: faker.food.ethnicCategory()
      });
    }

    for (let i = 0; i < 50; i++) {
      await Ingredient.create({
        name: faker.food.ingredient()
      });
    }

    for (let i = 0; i < amount; i++) {
      const recipe = await Recipe.create({
        title: faker.food.dish(),
        description: faker.food.description(),
        imageUrl: faker.image.url(),
        preparingTime: faker.number.int(180),
        cookingTime: faker.number.int(180),
        calories: faker.number.int(1000),
        carbs: faker.number.int(1000),
        protein: faker.number.int(1000),
        fat: faker.number.int(1000)
      });

      const numberOfInstructions = faker.number.int({
        min: 2,
        max: 5
      });
      for (let j = 0; j < numberOfInstructions; j++) {
        await Instruction.create({
          recipeId: recipe.id,
          step: j + 1,
          title: faker.food.adjective(),
          description: faker.food.description()
        });
      }

      const numberOfIngredients = faker.number.int({
        min: 2,
        max: 5
      });
      const measurements = ['kg', 'ml', 'gr', 'lb'];
      for (let j = 0; j < numberOfIngredients; j++) {
        await RecipeIngredient.create({
          recipeId: recipe.id,
          ingredientId: faker.number.int({ min: 1, max: 50 }),
          quantity: faker.number.int(1000),
          measurement:
            measurements[
              Math.floor(Math.random() * measurements.length)
            ]
        });
      }

      const numberOfTags = faker.number.int({ min: 1, max: 3 });
      for (let j = 0; j < numberOfTags; j++) {
        await RecipeTag.create({
          recipeId: recipe.id,
          tagId: faker.number.int({ min: 1, max: 20 })
        });
      }
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
