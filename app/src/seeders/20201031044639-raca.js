'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('raca', [{
        description: 'Vira-lata'
      }], {});
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('raca', null, {});
  }
};
