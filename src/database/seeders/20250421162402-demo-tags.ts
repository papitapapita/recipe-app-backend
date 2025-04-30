import { QueryInterface } from 'sequelize';
import { TAGS } from './demo-data';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('tags', TAGS);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('tags', {
      name: TAGS.map((tag) => tag.name)
    });
  }
};
