'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     Example:
     */
     await queryInterface.bulkInsert('users', [{
       firstName: 'John',
       lastName: 'Doe',
       email: 'john@doe.com',
       password: '123456'
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * */
     await queryInterface.bulkDelete('users', null, {});
  }
};
