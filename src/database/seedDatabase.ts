import path from 'node:path';
import * as fs from 'node:fs';
import { Sequelize } from 'sequelize-typescript';

export async function seedDatabase(sequelize: Sequelize) {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');

    const sqlFilePath = path.resolve(
      __dirname,
      './migrations/initial.sql'
    );
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf-8');
    await sequelize.query(sqlScript);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}
