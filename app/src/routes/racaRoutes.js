const express = require('express');
const routes = express.Router();
const raca = require('../controllers/racaController');


// Route listando todas as Raças
routes.get('/raca',raca.listAll);
// Route criando nova Raça
routes.post('/raca' ,raca.create);


module.exports =  routes;