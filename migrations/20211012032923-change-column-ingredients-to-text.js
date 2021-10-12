'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Burgers', "ingredients", { type: Sequelize.TEXT });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Burgers', "ingredients", { type: Sequelize.STRING });

  }
};
