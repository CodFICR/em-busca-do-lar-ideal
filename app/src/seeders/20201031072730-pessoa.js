'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('pessoa', [{
        nome: 'John ',
        sobrenome: 'doe',
        telefone:'(00) 00000-0000',
        email: 'johndoe@gmail.com',
        senha: '123456',
        dt_nascimento: '00/00/0000',
        genero:'M',
        endereco:'Cidade: Lugar nenhum / Bairro: Lugar nenhum / Rua : Lugar nenhum / Casa : Lugar nenhum',
        tipo:'Pessoa',
        foto:'Uma img qualquer'
      }], {});
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('pessoa', null, {});
  }
};
