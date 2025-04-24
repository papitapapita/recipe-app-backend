import { QueryInterface, Op } from 'sequelize';
import { RECIPE_TAGS } from './demo-data';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('recipes_tags', RECIPE_TAGS);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('recipes_tags', {
      [Op.or]: RECIPE_TAGS.map((recipeTag) => ({
        recipeId: recipeTag.recipe_id,
        tagId: recipeTag.tag_id
      }))
    });
  }
};
