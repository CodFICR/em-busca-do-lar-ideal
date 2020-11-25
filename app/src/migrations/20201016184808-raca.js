'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('raca',
      {
        codigo_raca: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        especie:{
          type: Sequelize.STRING
        },
        description: {
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
    await queryInterface.dropTable('raca');
  }
};

