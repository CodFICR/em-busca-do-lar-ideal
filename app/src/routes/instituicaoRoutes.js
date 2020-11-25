const express = require('express');
const multer = require('multer');


const multerConfig = require('../config/multer');
const instituicao = require('../controllers/instituicaoController');
const session = require('../controllers/sessionInstituicao');

const upload = multer(multerConfig);
const {autenticate} = require('../middlewares/authInstituicao');
const routes = express.Router();
// Route Listando todas as instituições

routes.post('/session/instituicao',session.store);

routes.post('/instituicao/create',instituicao.store);

routes.get('/instituicao',autenticate, instituicao.index);

routes.get('/instituicao/:id',autenticate,instituicao.indexById);

routes.put('/files/:id',autenticate,upload.single('file') ,instituicao.updateFile);

routes.delete('/instituicao/:id',autenticate,instituicao.remove);


module.exports = routes;