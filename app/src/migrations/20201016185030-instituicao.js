'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('instituicao',
      {
        codigo_instituicao: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        email: {
          type: Sequelize.STRING,
          unique: true
        },
        senha: {
          type: Sequelize.STRING
        },
        situacao: {
          type: Sequelize.BOOLEAN
        },
        telefone: {
          type: Sequelize.STRING
        },
        cnpj: {
          type: Sequelize.STRING
        },
        cidade: {
          type: Sequelize.STRING
        },
        bairro: {
          type: Sequelize.STRING
        },
        estado: {
          type: Sequelize.STRING
        },
        foto: {
          type: Sequelize.STRING
        },
        nome_instituicao: {
          type: Sequelize.STRING,
          unique: true
        },
        nome_responsavel: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });

  },

  down: async queryInterface => {
    await queryInterface.dropTable('instituicao');
  }
};

