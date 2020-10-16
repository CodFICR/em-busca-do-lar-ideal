
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.createTable('animal', 
    { 
      codigo_animal : {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome : {
        type: Sequelize.STRING
      },
      peso : {
        type : Sequelize.DECIMAL
      },
      porte : {
        type: Sequelize.STRING
      },
      vacinacao : {
        type: Sequelize.STRING
      },
      castracao : {
        type : Sequelize.STRING
      },
      observacao: {
        type: Sequelize.STRING
      },
      codigo_instituicao :{
        type : Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'instituicao'           
          },
          key: 'codigo_instituicao'
        }
      },
      codigo_raca :{
        type : Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'raca'
            
          },
          key: 'codigo_raca'
        }
      }

    });
     
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('animal');
    
  }
};
