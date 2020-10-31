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
        description: {
          type: Sequelize.STRING
        },
      });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('raca');
  }
};

  