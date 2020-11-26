const express = require('express');
<<<<<<< HEAD
const path = require('path');
const fs = require('fs');
const cors = require('cors');
=======
const cors = require('cors');
const path = require('path');
const fs = require('fs');
>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790

const {racaRoutes,pessoaRoutes,instituicaoRoutes,avaliacaoRoutes,animalRoutes,adocaoRoutes} = require('./routes')

class App {
    constructor() {
        this.server = express();
        this.storePath();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(express.json());
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname,'..','tmp','uploads'))
        );
        this.server.use(cors());
    }
    routes() {
        this.server.use(racaRoutes);
        this.server.use(pessoaRoutes);
        this.server.use(instituicaoRoutes);
        this.server.use(avaliacaoRoutes);
        this.server.use(animalRoutes);
        this.server.use(adocaoRoutes);
    }
    storePath(){
        const tmp =  path.resolve(__dirname,'..','tmp','uploads');
<<<<<<< HEAD
=======

>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
        if(!fs.existsSync(tmp)){
            fs.mkdirSync(tmp);
        }
    }

}

module.exports = new App().server;
