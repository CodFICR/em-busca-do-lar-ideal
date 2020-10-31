const express = require('express');
const routes = express.Router();
const raca = require('../controllers/racaController');


// Listando todas as Raças
routes.get('/raca',raca.listAll);
// Criando nova Raça
routes.post('/raca' ,raca.create);


module.exports =  routes;