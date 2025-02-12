import { Sequelize } from 'sequelize-typescript';
import { afterAll, beforeAll } from '@jest/globals';
import {
  Recipe,
  Ingredient,
  Tag,
  RecipeIngredient,
  Instruction,
  RecipeTag
} from '../src/models';

let sequelize: Sequelize;

beforeAll(async () => {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    models: [
      Recipe,
      Ingredient,
      Tag,
      RecipeIngredient,
      Instruction,
      RecipeTag
    ],
    logging: false
  });

  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

export { sequelize };
