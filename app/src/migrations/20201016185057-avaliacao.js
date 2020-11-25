'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('avaliacao',
      {
        codigo_nota: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        nota: {
          type: Sequelize.INTEGER
        },
        tipo: {
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
        codigo_pessoa: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'pessoa'

            },
            key: 'codigo_pessoa'
          }
        }



      });

  },

  down: async queryInterface => {

    await queryInterface.dropTable('avaliacao');

  }
};
