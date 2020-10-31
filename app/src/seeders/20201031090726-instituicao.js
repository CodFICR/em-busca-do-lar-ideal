'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('instituicao', [{
        email : 'emailInstituicao@gmail.com',
        senha: '123456',
        situacao:'APROVADO',
        telefone:'(00) 00000-0000',
        cnpj:'XX.XXX.XXX/YYYY-ZZ',
        endereco:'Algum lugar',
        nome_instituicao:'Instituicao',
        nome_responsavel:'Dono da instituicao',
      }], {});
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('instituicao', null, {});
  }
};
