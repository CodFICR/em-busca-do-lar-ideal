'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('pessoa', [{
      nome: 'John ',
      sobrenome: 'doe',
      telefone: '(11) 11111-1111',
      email: 'johndoe@gmail.com',
      senha: '123456',
      dt_nascimento: '1111/11/11',
      genero: 'M',
      cidade:'Qualquer Cidade',
      bairro:'Qualquer Bairro',
      estado:'Qualquer Estado',
      tipo: 'Pessoa',
      foto: 'Uma img qualquer',
      createdAt: '1111/11/11',
      updatedAt: '1111/11/11',
    }], {});
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('pessoa', null, {});
  }
};
