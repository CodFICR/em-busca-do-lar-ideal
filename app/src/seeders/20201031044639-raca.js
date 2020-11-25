'use strict';

const gatos = require('../contents/gato');
const cachorros = require('../contents/cachorro');

module.exports = {
  up: async queryInterface => {

    await queryInterface.bulkInsert('raca',[...gatos,...cachorros], {});
      
    },
  down: async queryInterface => {
    await queryInterface.bulkDelete('raca', null, {});
  }
};
