'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('Burgers', "UserId", { type: Sequelize.INTEGER });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Burgers', "UserId");

  }
};
