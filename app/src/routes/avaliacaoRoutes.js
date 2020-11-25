const express = require('express');
const routes = express.Router();
const avaliacao = require('../controllers/avaliacaoController');

routes.post('/avaliacao', avaliacao.store);

routes.get('/avalicao', avaliacao.index);

routes.get('/avaliacao/:id',avaliacao.indexById);

module.exports = routes;
