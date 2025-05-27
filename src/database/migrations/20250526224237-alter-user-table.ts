import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up(
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes
  ) {
    await queryInterface.addColumn('users', 'recovery_token', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('users', 'recovery_token');
  }
};
