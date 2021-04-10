module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */

    await queryInterface.bulkInsert('roles', [{
      name: 'admin',
    }], {});

    await queryInterface.bulkInsert('roles', [{
      name: 'accountant',
    }], {});

    await queryInterface.bulkInsert('roles', [{
      name: 'daf',
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('roles', null, {});
  },
};
