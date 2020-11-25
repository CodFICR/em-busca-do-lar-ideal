const {Router} =  require('express');
const adocaoRoutes = require('../controllers/adocaoController');

const routes = new Router();

routes.get('/adocao',adocaoRoutes.index);

routes.post('/adocao',adocaoRoutes.store);

routes.put('/adocao/update/:id',adocaoRoutes.update);

routes.get('/adocao/:id',adocaoRoutes.indexById);

module.exports = routes;
