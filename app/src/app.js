const express = require('express');
const routesRaca = require('./routes/racaRoutes');
const routesPessoa = require('./routes/pessoaRoutes');
const routesInstituicao = require('./routes/instituicaoRoutes');
const routesAvaliacao = require('./routes/avaliacaoRoutes');
const routesAnimal = require('./routes/animalRoutes');

class App{
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.server.use(express.json());
    }
    routes(){
        this.server.use(routesRaca);
        this.server.use(routesPessoa);
        this.server.use(routesInstituicao);
        this.server.use(routesAvaliacao);
        this.server.use(routesAnimal);
    }
}

module.exports =  new App().server;