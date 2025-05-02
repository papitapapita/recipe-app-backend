import { Sequelize } from 'sequelize-typescript';
import { config } from '../config/config';
import {
  Ingredient,
  Instruction,
  Recipe,
  RecipeIngredient,
  RecipeTag,
  Tag
} from './models';
import { seedDatabase } from './seedDatabase';

const USER = encodeURIComponent(config.database.user);
const PASSWORD = encodeURIComponent(config.database.password);

//Instruction.addHooks();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: USER,
  password: PASSWORD,
  database: config.database.name,
  models: [
    Recipe,
    Ingredient,
    Tag,
    Instruction,
    RecipeTag,
    RecipeIngredient
  ],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf('.model')) ===
      member.toLowerCase()
    );
  }
});

async function initializeDatabase() {
  try {
    await sequelize.sync({ alter: true, force: true });
    console.log('Database synchronized successfully.');
    await seedDatabase(sequelize);
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export { sequelize, initializeDatabase };
