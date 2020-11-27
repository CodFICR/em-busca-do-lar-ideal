// Dependencies
const express = require('express');
const multer = require('multer');
// Controllers
const instituicao = require('../controllers/instituicaoController');
const session = require('../controllers/sessionInstituicao');
// Configurando o multer;
const multerConfig = require('../config/multer');
// Utilizaveis
const {autenticate} = require('../middlewares/authInstituicao');
const upload = multer(multerConfig);
const routes = express.Router();

// Rota para criar uma nova instituição;
routes.post('/instituicao/create',instituicao.store);
// Rota para criar uma nova Session(Loguin) para uma instituição;
routes.post('/session/instituicao',session.store);
// Rota para buscar uma instituição pedo seu ID;
routes.get('/instituicao/:id',autenticate,instituicao.indexById);
// Rote para inserir ou alterar foto de uma instituição
routes.put('/instituicao/:id/file',autenticate,upload.single('file') ,instituicao.updateFile);
// Rota para remover uma instituição
routes.delete('/instituicao/:id',autenticate,instituicao.remove);

// Exportando routes(GET,POST,PUT,DELETE) 
module.exports = routes;
