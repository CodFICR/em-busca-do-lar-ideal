'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('avaliacao', [{
      nota: 7,
      tipo: "Instituicao",
      codigo_instituicao: 1,
      codigo_pessoa: 1,
      createdAt: '1111/11/11',
      updatedAt: '1111/11/11',
    }], {});

  },

  down: async queryInterface => {

    await queryInterface.bulkDelete('avaliacao', null, {});

  }
};
