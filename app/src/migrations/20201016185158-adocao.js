'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('adocao',
      {
        codigo_adocao: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        situacao:{
          type: Sequelize.BOOLEAN
        },
        dt_devolucao: {
          type: Sequelize.DATE,
        },
        dt_adocao: {
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        codigo_animal: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'animal'
            },
            key: 'codigo_animal'
          }
        },
        codigo_pessoa: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'pessoa'
            },
            key: 'codigo_pessoa'
          }
        },
        codigo_instituicao: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'instituicao'
            },
            key: 'codigo_instituicao'
          }
        }

      });

  },

  down: async queryInterface => {
    await queryInterface.dropTable('adocao');

  }
};