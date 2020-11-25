'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('pessoa',
      {
        codigo_pessoa: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nome: {
          type: Sequelize.STRING
        },
        sobrenome: {
          type: Sequelize.STRING
        },
        telefone: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING,
          unique: true
        },
        senha: {
          type: Sequelize.STRING
        },
        dt_nascimento: {
          type: Sequelize.DATE
        },
        genero: {
          type: Sequelize.STRING
        },
        cidade: {
          type: Sequelize.STRING
        },
        bairro:{
          type: Sequelize.STRING
        },
        estado:{
          type: Sequelize.STRING
        },
        tipo: {
          type: Sequelize.STRING
        },
        foto: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      });

  },
  down: async queryInterface => {
    await queryInterface.dropTable('pessoa');
  }
};