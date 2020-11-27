// Dependencies;
const express =  require('express');
// Controller;
const adocaoRoutes = require('../controllers/adocaoController');
// Autenticação;
const autenticateInst = require('../middlewares/authInstituicao').autenticate;
const autenticatePess = require('../middlewares/authPessoa').autenticate;
// Utilizaveis;
const routes = express.Router();

// Rota para Listar adoções feita pela instituição;
routes.get('/adocao/:id/instituicao',autenticateInst,adocaoRoutes.indexForInst);
// Rota para listar adoções feita pela pessoa;
routes.get('/adocao/:id/pessoa',autenticatePess,adocaoRoutes.indexForPerson);
// Rota para a pessoa solicitar uma adoção;
routes.post('/adocao/:id/solicitacao',autenticatePess,adocaoRoutes.solicitacao);
// Rota para a instituição aceitar a solicitação de uma pessoa; 
routes.put('/adocao/:id/aceitar',autenticateInst,adocaoRoutes.aceitarSolicitacao);
// Rota para listar as solicitacoes da instituição;
routes.get('/adocao/:id/solicitacoes',autenticateInst,adocaoRoutes.indexSolicitacao);
// Rota para instituição editar uma adoção caso uma pessoa queira devolver o animal;
routes.put('/adocao/:id',autenticateInst,adocaoRoutes.updateDevolucao);
// Rota para buscar uma adoção pelo ID;
routes.get('/adocao/:id',adocaoRoutes.indexById);

// Exportando routes (GET,POST,PUT,DELETE)
module.exports = routes;
