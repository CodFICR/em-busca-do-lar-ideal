'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('animal', [{

      nome: 'CAT & DOG',
      porte: 'GG',
      genero:"M",
      vacinacao: 'True',
      castracao: 'True',
      observacao: 'Um CAT e um DOG feliz',
      foto: 'Uma img qualquer',
      codigo_instituicao: 1,
      codigo_raca: 1,
      createdAt: '1111/11/11',
      updatedAt: '1111/11/11',

    }], {});

  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('animal', null, {});
  }
};
