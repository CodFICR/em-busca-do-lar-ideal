'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('animal', [{
          
          nome: 'CAT & DOG',
          peso: 40.00 ,
          porte: 'GG',
          vacinacao: 'True',
          castracao:'True',
          observacao:'Um CAT e um DOG feliz',
          foto:'Uma img qualquer',
          createdAt: '00/00/0000' ,
          updatedAt: '00/00/0000' ,
          codigo_instituicao:1,
          codigo_raca:1,

      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkDelete('animal', null, {});
     
  }
};
