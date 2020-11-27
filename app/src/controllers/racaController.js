// Model;
const racaModel = require('../models').raca;

// Middleware para listar as raças;
const index = async (_, res) => {
    const racas = await racaModel.findAll();
    return res.send(racas);
}

// Exportando Middleware (index);
module.exports = {
    index
};
