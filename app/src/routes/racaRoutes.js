const express = require('express');
const routes = express.Router();
const raca = require('../controllers/racaController');


<<<<<<< HEAD
// Route listando todas as Raças
routes.get('/raca', raca.index);
// Route criando nova Raça
routes.post('/raca', raca.store);


module.exports = routes;
=======
// Listando todas as Raças
routes.get('/raca',raca.listAll);
// Criando nova Raça
routes.post('/raca' ,raca.create);


module.exports =  routes;
>>>>>>> 850ba1b83f42539ee4e49b6d261b902d7b122c74
