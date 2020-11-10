const express = require('express');
const routes = express.Router();
const pessoa = require('../controllers/pessoaController');

// Route listagem de pessoas
routes.get('/pessoa',pessoa.listAll);

routes.post('/person',pessoa.create);

module.exports = routes;
