const express = require('express');
const server = express();
const routesRaca = require('./routes/racaRoutes');
const routesPessoa = require('./routes/pessoaRoutes');
const routesInstituicao = require('./routes/instituicaoRoutes');

server.use(express.json());

server.use(routesRaca);
server.use(routesPessoa);
server.use(routesInstituicao);

server.listen(3333);