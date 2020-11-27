// Dependencies;
const express = require('express');
// Controller;
const raca = require('../controllers/racaController');
// Utilizavel;
const routes = express.Router();

// Route listando todas as Raças;
routes.get('/raca', raca.index);

// Exportando route ( GET );
module.exports = routes;
