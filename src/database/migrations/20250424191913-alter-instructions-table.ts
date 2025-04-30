import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.removeColumn('instructions', 'instruction');
    await queryInterface.addColumn('instructions', 'title', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('instructions', 'description', {
      type: Sequelize.TEXT,
      allowNull: false
    })
  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
   await queryInterface.addColumn('instructions', 'instruction', {
      type: Sequelize.TEXT,
      allowNull: false
   });
   await queryInterface.removeColumn('instructions', 'description');
   await queryInterface.removeColumn('instructions', 'title');
  }
};
