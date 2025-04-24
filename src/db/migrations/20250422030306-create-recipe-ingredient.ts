import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('recipes_ingredients', {
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
      ingredientId: {
        field: 'ingredient_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ingredients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      measurement: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    // Add unique constraint to prevent duplicate recipe-ingredient combinations
    await queryInterface.addConstraint('recipes_ingredients', {
      fields: ['recipe_id', 'ingredient_id'],
      type: 'unique',
      name: 'unique_recipe_ingredient'
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('recipes_ingredients');
  }
};
