const express = require('express');
const routes = express.Router();
const raca = require('../controllers/racaController');


// Route listando todas as Raças
routes.get('/raca', raca.index);
// Route criando nova Raça
routes.post('/raca', raca.store);


module.exports = routes;