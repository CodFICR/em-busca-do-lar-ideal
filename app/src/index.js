const express = require('express');
const server = express();
const routesRaca = require('./routes/racaRoutes');
const routesPessoa = require('./routes/pessoaRoutes');
const routesInstituicao = require('./routes/instituicaoRoutes');
const routesAvaliacao = require('./routes/avaliacaoRoutes');

server.use(express.json());

server.use(routesRaca);
server.use(routesPessoa);
server.use(routesInstituicao);
server.use(routesAvaliacao);

server.listen(3333);