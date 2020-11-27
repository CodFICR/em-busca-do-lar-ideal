'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('instituicao', [{
      email: 'emailInstituicao@gmail.com',
      senha: '123456',
      situacao: true,
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
  }
};
