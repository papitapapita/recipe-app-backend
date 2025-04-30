import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('instructions', {
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
      step: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      instruction: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });

    // Add unique constraint to prevent duplicate step numbers for the same recipe
    await queryInterface.addConstraint('instructions', {
      fields: ['recipe_id', 'step'],
      type: 'unique',
      name: 'unique_recipe_step'
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('instructions');
  }
}; 