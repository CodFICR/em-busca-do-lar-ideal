'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('adocao', 
    {
       codigo_adocao : { 
          type: Sequelize.INTEGER 
       },
       dt_devolucao : {
        type : Sequelize.DATE
       },
       dt_adocao : {
        type: Sequelize.DATE   
      },
      codigo_animal : {
        type: Sequelize.INTEGER,
        references: {
         model: {
            tableName: 'animal'
          },
          key:'codigo_animal'
        }
      },
      codigo_pessoa : {
        type: Sequelize.INTEGER,
        references: {
         model: {
            tableName: 'pessoa'
          },
          key:'codigo_pessoa'
        }
      }

    });
    
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('adocao');
     
  }
};