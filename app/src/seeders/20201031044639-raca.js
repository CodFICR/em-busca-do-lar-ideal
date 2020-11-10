'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('raca', [{
        description: 'Vira-lata',
        createdAt: '00/00/0000' ,
        updatedAt: '00/00/0000' ,
      }], {});
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('raca', null, {});
  }
};
