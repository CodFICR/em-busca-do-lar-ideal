const adocaoModel = require('../models').adocao;
const pessoaModel = require('../models').pessoa;
const animalModel = require('../models').animal;
const racaModel = require('../models').raca;

<<<<<<< HEAD

=======
>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
const index = async (_, res) => {

    const allAdocao = await adocaoModel.findAll({
        attributes: ['codigo_adocao', 'dt_adocao', 'dt_devolucao'],
        include: [{
            model: pessoaModel,
            attributes: ['nome', 'sobrenome', 'email'],
        }, {
            model: animalModel,
            attributes: ['codigo_animal', 'nome'],
        }],
    });

    return res.status(200).json(allAdocao);
}

const store = async (req, res) => {
    const { codigo_pessoa, codigo_animal } = req.body;

    const animalExists = await animalModel.findByPk(codigo_animal);

    if (animalExists.situacao == "ADOTADO") {
        return res.status(400).json({ Error: "Este animal não pode ser adotado 2 vezes!" });
    }

    await adocaoModel.create({
        codigo_animal,
        codigo_pessoa,
    });

    await animalExists.update({ situacao: "ADOTADO" });

    return res.status(200).json({ Message: "Tudo Certo!!" })
}

const update = async (req, res) => {

    const codigo_adocao = req.params.id;
    const { codigo_animal } = req.body;

    const adocaoExists = await adocaoModel.findOne({
        where: {
            codigo_adocao,
            codigo_animal
        }
    });

    if (!adocaoExists) {
        return res.status(400).json({ Error: "Adoção não encontrada!" });
    }

    const animalExists = await animalModel.findByPk(codigo_animal);

    if (animalExists.situacao == "Aberto") {
        return res.status(400).json({ Error: "Este animal não pode ser devolvido!" });
    }

    await adocaoExists.update({
        dt_devolucao: new Date()
    });

    await animalExists.update({ situacao: "Aberto" });

    return res.status(200).json({ Message: "Tudo certo!" });

}

const indexById = async (req, res) => {
    const codigo_adocao = req.params.id;



    const adocao = await adocaoModel.findByPk(codigo_adocao,
        {
            include: [
                { model: pessoaModel },
                {
                    model: animalModel,
                    include: {
                        model: racaModel,
                        attributes: ['especie', 'description']
                    }
                },
            ]
        });


    return res.status(200).json(adocao);
}

module.exports = {
    index,
    store,
    update,
    indexById
};