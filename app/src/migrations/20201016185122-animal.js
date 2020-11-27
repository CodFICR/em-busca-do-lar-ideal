
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('animal',
      {
        codigo_animal: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        nome: {
          type: Sequelize.STRING
        },
        genero:{
          type: Sequelize.STRING
        },
        porte: {
          type: Sequelize.STRING
        },
        vacinacao: {
          type: Sequelize.BOOLEAN
        },
        castracao: {
          type: Sequelize.BOOLEAN
        },
        observacao: {
          type: Sequelize.STRING
        },
        foto: {
          type: Sequelize.STRING
        },
        situacao:{
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
        codigo_instituicao: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'instituicao'
            },
            key: 'codigo_instituicao'
          }
        },
        codigo_raca: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'raca'
            },
            key: 'codigo_raca'
          }
        }

      });

  },

  down: async queryInterface => {
    await queryInterface.dropTable('animal');
  }
};
