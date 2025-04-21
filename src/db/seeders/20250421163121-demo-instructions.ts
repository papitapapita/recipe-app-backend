import { QueryInterface, Op } from 'sequelize';
import { INSTRUCTIONS } from './demo-data';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('instructions', INSTRUCTIONS);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('instructions', {
      [Op.or]: INSTRUCTIONS.map((instruction) => ({
        recipeId: instruction.recipeId,
        step: instruction.step
      }))
    });
  }
};
