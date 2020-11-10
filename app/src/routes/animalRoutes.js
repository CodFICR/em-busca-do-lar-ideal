const {Router} = require('express');

const animalController = require('../controllers/animalController');

const routes = new Router();

routes.get('/animal',animalController.listAll);

routes.post('/animal',animalController.store);

routes.get('/animal/:id',animalController.indexById);

routes.delete('/animal/delete/:id',animalController.remove);

routes.put('/animal/edit/:id',animalController.update);

module.exports = routes;
