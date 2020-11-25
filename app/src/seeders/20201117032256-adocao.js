'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('adocao', [{
        dt_adocao:'1111/11/11',
        dt_devolucao:'1111/11/11',
        codigo_animal:1,
        codigo_pessoa:1,
        createdAt: '1111/11/11',
        updatedAt: '1111/11/11',
      }], {});
    
  },

  down: async queryInterface => {
      await queryInterface.bulkDelete('adocao', null, {});
  }
};
