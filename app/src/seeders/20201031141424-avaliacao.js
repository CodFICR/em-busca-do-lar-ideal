'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('avaliacao', [{
        nota:7,
        tipo:"Instituicao",
        createdAt: '00/00/0000' ,
        updatedAt: '00/00/0000' ,
        codigo_pessoa:1,
        codigo_instituicao:1
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkDelete('avaliacao', null, {});
     
  }
};
