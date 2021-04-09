'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Tasks', 'name', {
      type: Sequelize.STRING,
      unique: false
    })

  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('Tasks', 'name', {
      type: Sequelize.STRING,
      unique: true
    })
  }
};
