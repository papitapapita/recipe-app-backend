import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { config } from '../config/config';
import {
  Ingredient,
  Instruction,
  Recipe,
  RecipeIngredient,
  RecipeTag,
  Tag
} from '../models';
import { seedDatabase } from '../db/seedDatabase';

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

//Instruction.addHooks();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.dbHost,
  port: config.dbPort,
  username: USER,
  password: PASSWORD,
  database: config.dbName,
  models: [
    Recipe,
    Ingredient,
    Tag,
    Instruction,
    RecipeTag,
    RecipeIngredient
  ]
} as SequelizeOptions);

try {
  if (process.env.NODE_ENV === 'development') {
    await sequelize.sync({ alter: true, force: true });
  }
  await seedDatabase(sequelize);
  console.log('Database Succesfully created');
} catch (error) {
  console.error('Failed to synchronize database: ', error);
}

export { sequelize };
