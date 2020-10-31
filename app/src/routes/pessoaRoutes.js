const express = require('express');
const routes = express.Router();
const pessoa = require('../controllers/pessoaController');

// Route listagem de pessoas
routes.get('/pessoa',pessoa.listAll);



module.exports = routes;