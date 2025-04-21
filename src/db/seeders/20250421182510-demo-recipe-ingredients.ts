import { QueryInterface, Op } from 'sequelize';
import { RECIPE_INGREDIENTS } from './demo-data';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'recipes_ingredients',
      RECIPE_INGREDIENTS
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('recipes_ingredients', {
      [Op.or]: RECIPE_INGREDIENTS.map((recipeIngredient) => ({
        recipeId: recipeIngredient.recipeId,
        ingredientId: recipeIngredient.ingredientId
      }))
    });
  }
};
