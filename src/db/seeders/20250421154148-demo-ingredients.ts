import { QueryInterface } from 'sequelize';
import { INGREDIENTS } from './demo-data';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('ingredients', INGREDIENTS);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('ingredients', {
      name: INGREDIENTS.map((ingredient) => ingredient.name)
    });
  }
};
