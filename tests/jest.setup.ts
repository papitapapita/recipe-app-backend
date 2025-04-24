import { Sequelize } from 'sequelize-typescript';
import { afterAll, beforeAll } from '@jest/globals';
import {
  Recipe,
  Ingredient,
  Tag,
  RecipeIngredient,
  Instruction,
  RecipeTag
} from '../src/db/models';
import { RecipesService } from '../src/services/recipes.service';

let sequelize: Sequelize;
let recipesService: RecipesService;
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

  recipesService = new RecipesService(sequelize, Recipe);
});

afterAll(async () => {
  await sequelize.close();
});

export { sequelize, recipesService };
