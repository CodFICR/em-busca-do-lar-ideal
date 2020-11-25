const animalModel = require('../models').animal;
const racaModel = require('../models').raca;
const instituicaoModel = require('../models').instituicao;
const adocaoModel = require('../models').adocao;
const fs = require('fs');
const { resizeImg}  = require('../utils/resizeImg');

const index = async (_, res) => {

    const allAnimals = await animalModel.findAll({
        where: {
            situacao: "ABERTO"
        },
        attributes: ['codigo_animal', 'foto', 'nome', 'genero', 'porte', 'situacao', 'vacinacao', 'castracao', 'observacao'],
        include: [{ model: racaModel, attributes: ['description', 'especie'] }],
        order: [
            [
                'codigo_animal',
                'DESC'
            ]
        ]
    });

    return res.status(200).json(allAnimals);
}

const store = async (req, res) => {
    const codigo_instituicao = req.params.id;

    if (parseInt(codigo_instituicao) !== req.codigo_instituicao) {
        return res.status(400).json({ Error: "Você não possui permição para criar animal" });
    }


    const { nome, porte, vacinacao, castracao, genero, observacao, codigo_raca } = req.body;

    if (!(await racaModel.findByPk(codigo_raca))) {
        return res.status(400).json({ Error: "Raça não encontrada!" });
    }

    await animalModel.create({
        nome,
        porte,
        genero,
        vacinacao,
        castracao,
        observacao,
        codigo_instituicao,
        codigo_raca
    });

    return res.status(200).json({ Message: "Animal criado com sucesso!" });
}

const indexById = async (req, res) => {
    const id = req.params.id;

    const animalExists = await animalModel.findByPk(id, {
        attributes: ['foto', 'situacao', 'nome', 'porte', 'vacinacao', 'castracao', 'observacao'],
        include: [
            {
                model: racaModel,
                attributes: ['description', 'especie']
            },
            {
                model: instituicaoModel,
                attributes: ['nome_instituicao']
            }
        ],
    });

    if (!animalExists) {
        return res.status(200).json({ Error: "Animal não encontrado." });
    }

    return res.status(200).json(animalExists);
}

const update = async (req, res) => {

    const id = req.params.id;

    const animal = await animalModel.findByPk(id);

    if (!animal) {
        return res.status(400).json({ Message: "Animalzineo não encontrado." });
    }

    await animal.update(req.body);

    return res.status(200).json({ Message: "Animal editado com sucesso" });
}

const remove = async (req, res) => {
    const codigo_animal = req.params.id;
    const animal = await animalModel.findByPk(codigo_animal, {
        include: { model: adocaoModel }
    });

    if (!animal) {
        return res.status(400).json({ Message: "Animal não encontrado" });
    }

    await animal.update({ situacao: "REMOVIDO" });

    return res.status(200).json({ error: "Animal deletado" });

}

const updateFile = async (req, res) => {

    const codigo_animal = req.params.id;
    const animal = await animalModel.findByPk(codigo_animal);

    if (!animal) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ Error: "Animal não encontrado" });
    }

    const { filename: image } = req.file;
    const [name] = image.split('.');
    const foto = `${name}.jpg`;

    resizeImg(req.file.path, req.file.destination, foto);

    await animal.update({ foto });

    return res.status(200).json({ Message: "Imagem alterada com sucesso!" });
}

module.exports = {
    index,
    store,
    indexById,
    remove,
    update,
    updateFile
};
