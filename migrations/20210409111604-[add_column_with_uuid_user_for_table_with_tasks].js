'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'uuidUser', Sequelize.UUID, {
      after: 'updatedAt'
    })
  },

  down: async (queryInterface, Sequelize) => {
  queryInterface.removeColumn('Tasks', 'uuidUser')
  }
};
