import { QueryInterface } from 'sequelize';
import { RECIPES } from './demo-data';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('recipes', RECIPES);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('recipes', {
      title: RECIPES.map((recipe) => recipe.title)
    });
  }
};
