import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      preparingTime: {
        field: 'preparing_time',
        type: Sequelize.INTEGER,
        allowNull: true
      },
      cookingTime: {
        field: 'cooking_time',
        type: Sequelize.INTEGER,
        allowNull: true
      },
      imageUrl: {
        field: 'image_url',
        type: Sequelize.STRING,
        allowNull: false
      },
      calories: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      carbs: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      protein: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      fat: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('recipes');
  }
};
