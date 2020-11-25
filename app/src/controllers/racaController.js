const racaModel = require('../models').raca;

const store = async (req, res) => {

    const { especie, description } = req.body;

    await racaModel.create({ especie, description });
    return res.status(200).json({ Message: "Raça Criada" });
}

const index = async (_, res) => {

    const listRacas = await racaModel.findAll();
    return res.send(listRacas);
}

module.exports = {
    store,
    index
};