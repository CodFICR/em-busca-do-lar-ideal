// Dependencies;
const express = require('express');
const multer = require('multer');
// Controller;
const animal= require('../controllers/animalController');
// Configurando o Multer;
const multerConfig = require('../config/multer')
// Autenticação;
const { autenticate } = require('../middlewares/authInstituicao');
// Utilizaveis;
const upload = multer(multerConfig);
const routes =express.Router();

// Rota buscando os animais que possuem situação falsa --> {situacao : false}
routes.get('/animal', animal.index);
// Rota para criar novo animal sendo autenticado por uma instituicao;
routes.post('/animal/:id',autenticate, animal.store);
// Rota para buscar um animal pelo ID;
routes.get('/animal/:id', animal.indexById);
// Rota para remover um animal;
routes.delete('/animal/:id', autenticate,animal.remove);
// Rota para adicionar ou alterar imagem de um animal;
routes.put('/animal/:id/file',autenticate,upload.single('file'),animal.updateFile);
// Rota para alterar os dados do animal;
routes.put('/animal/:id',autenticate,animal.update);

// Exportando routes (GET,POST,PUT,DELETE)
module.exports = routes;
