const express = require('express');
const routes = express.Router();
const avaliacao = require('../controllers/avaliacaoController');

routes.post('/avaliacao',avaliacao.create);

routes.get('/avalicao',avaliacao.allList);

module.exports =  routes;