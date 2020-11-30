// Model;
const racaModel = require('../models').raca;

// Middleware para listar as raças;
const index = async (_, res) => {
    try {
        const racas = await racaModel.findAll();
        return res.send(racas);
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Exportando Middleware (index);
module.exports = {
    index
};
