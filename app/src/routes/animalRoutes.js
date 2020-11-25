const { Router } = require('express');

const multer = require('multer');
const multerConfig = require('../config/multer')
const animal= require('../controllers/animalController');
const { autenticate } = require('../middlewares/authInstituicao');

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/animal', animal.index);

routes.post('/animal/:id',autenticate, animal.store);

routes.get('/animal/:id',autenticate, animal.indexById);

routes.delete('/animal/:id', autenticate,animal.remove);

routes.put('/animal/:id/files',autenticate,upload.single('file'),animal.updateFile);

routes.put('/animal/:id',autenticate,animal.update);

module.exports = routes;
