const express = require('express');
const routes = express.Router();
const instituicao =  require('../controllers/instituicaoController');

// Route Listando todas as instituições
routes.get('/instituicao',instituicao.listAll);

module.exports = routes;