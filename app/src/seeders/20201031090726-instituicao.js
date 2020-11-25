'use strict';

module.exports = {
<<<<<<< HEAD
  up: async queryInterface => {
    await queryInterface.bulkInsert('instituicao', [{
      email: 'emailInstituicao@gmail.com',
      senha: '123456',
      situacao: 'APROVADO',
      telefone: '(11) 11111-1111',
      cnpj: 'XX.XXX.XXX/YYYY-ZZ',
      cidade:'Qualquer Cidade',
      bairro:'Qualquer Bairro',
      estado:'Qualquer Estado',
      foto: 'Uma img qualquer',
      nome_instituicao: 'Instituicao',
      nome_responsavel: 'Dono da instituicao',
      createdAt: '1111/11/11',
      updatedAt: '1111/11/11',
    }], {});
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('instituicao', null, {});
=======
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
>>>>>>> 850ba1b83f42539ee4e49b6d261b902d7b122c74
  }
};
