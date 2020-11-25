const express = require('express');
const routes = express.Router();

const {autenticate} = require('../middlewares/authPessoa');

const multer = require('multer');
const multerConfig = require('../config/multer');

const pessoa = require('../controllers/pessoaController');
const pessoaSession = require('../controllers/sessionPessoa');
const upload = multer(multerConfig);

// Route listagem de pessoas

routes.post('/person' ,pessoa.store);

routes.post('/session', pessoaSession.store);

routes.get('/pessoa',autenticate,pessoa.index);

routes.put('/pessoa/:id',autenticate,pessoa.update);

routes.put('/pessoa/:id/file',autenticate, upload.single('file') , pessoa.updateFile);

routes.get('/pessoa/:id',autenticate,pessoa.indexById);

routes.delete('/person/:id',autenticate,pessoa.remove);

module.exports = routes;