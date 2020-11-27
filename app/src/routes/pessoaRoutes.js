// Dependencies;
const express = require('express');
const multer = require('multer');

// Controllers;
const pessoa = require('../controllers/pessoaController');
const pessoaSession = require('../controllers/sessionPessoa');

// Utilizaveis;
const {autenticate} = require('../middlewares/authPessoa');
const multerConfig = require('../config/multer');
const routes = express.Router();
const upload = multer(multerConfig);

// Rota para criar pessoa;
routes.post('/person' ,pessoa.store);
// Rota para criar uma Session (Loguin);
routes.post('/session', pessoaSession.store);
// Rota para alterar dados de uma pessoa;
routes.put('/pessoa/:id',autenticate,pessoa.update);
// Rota para adicionar ou alterar foto de usuário;
routes.put('/pessoa/:id/file',autenticate, upload.single('file') , pessoa.updateFile);
// Rota para buscar usuário pelo ID ;
routes.get('/pessoa/:id',autenticate,pessoa.indexById);
// Rota para remover uma pessoa;
routes.delete('/person/:id',autenticate,pessoa.remove);

// Exporte routes(GET,POST,PUT,DELETE);
module.exports = routes;
