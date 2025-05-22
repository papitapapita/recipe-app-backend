import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  async up(
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes
  ) {
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('admin', 'customer', 'chef'),
      allowNull: false,
      defaultValue: 'customer'
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('users', 'role');

    // Drop the ENUM type to clean up (PostgreSQL specific)
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_role";'
    );
  }
};
