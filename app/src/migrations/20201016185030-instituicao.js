'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.createTable('instituicao',
      { 
        codigo_instituicao : {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        email :{
          type: Sequelize.STRING,
          unique: true
        },
        senha : {
          type: Sequelize.STRING
        },
        situacao: {
          type: Sequelize.STRING
        },
        telefone: {
          type: Sequelize.STRING
        },
        cnpj : {
          type: Sequelize.STRING
        },
        endereco :{
          type: Sequelize.STRING
        },
        nome_instituicao : {
          type: Sequelize.STRING,
          unique : true
        },
        nome_responsavel:{
         type: Sequelize.STRING 
        }


      
      });
     
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.dropTable('instituicao');
     
  }
};

