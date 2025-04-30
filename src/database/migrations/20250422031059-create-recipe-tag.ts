import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('recipes_tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeId: {
        field: 'recipe_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'recipes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tagId: {
        field: 'tag_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    // Add unique constraint to prevent duplicate recipe-tag combinations
    await queryInterface.addConstraint('recipes_tags', {
      fields: ['recipe_id', 'tag_id'],
      type: 'unique',
      name: 'unique_recipe_tag'
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('recipes_tags');
  }
}; 