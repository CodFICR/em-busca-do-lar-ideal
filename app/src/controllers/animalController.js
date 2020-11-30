// Dependencie;
const fs = require('fs');
// Models;
const animalModel = require('../models').animal;
const racaModel = require('../models').raca;
const instituicaoModel = require('../models').instituicao;
const adocaoModel = require('../models').adocao;
// Função para modificar resolução de imagem;
const { resizeImg } = require('../utils/resizeImg');
// Validation
const animalValidateCreate = require('../validations/animal/animalCreate');
const animalValidateEdit = require('../validations/animal/editAnimal');

// Middleware listando os animais que possuem {Situação : true};
const index = async (_, res) => {

    try {
        const allAnimals = await animalModel.findAll({
            where: {
                situacao: false
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
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middleware criando um novo animal;
const store = async (req, res) => {
    try {
        const codigo_instituicao = req.params.id;

        if (parseInt(codigo_instituicao) !== req.codigo_instituicao) {
            return res.status(400).json({ Error: "Você não possui permição para criar animal" });
        }


        const { nome, porte, vacinacao, castracao, genero, observacao, codigo_raca } = req.body;

        if (!(await racaModel.findByPk(codigo_raca))) {
            return res.status(400).json({ Error: "Raça não encontrada!" });
        }

        const user = await animalValidateCreate.validate({
            nome,
            porte,
            genero,
            vacinacao,
            castracao,
            observacao,
        });

        await animalModel.create({
            codigo_instituicao,
            codigo_raca,
            ...user
        });

        return res.status(200).json({ Message: "Animal criado com sucesso!" });
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middleware listando um animal pelo ID;
const indexById = async (req, res) => {
    try {

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
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middleware modificando os dados do animal;
const update = async (req, res) => {

    try {

        const id = req.params.id;

        const animal = await animalModel.findByPk(id);

        if (!animal) {
            return res.status(400).json({ Message: "Animal não encontrado." });
        }

        const animalCustom = await animalValidateEdit.validate(req.body);

        await animal.update(animalCustom);

        return res.status(200).json({ Message: "Animal editado com sucesso" });
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middleware removendo o animal 
const remove = async (req, res) => {
    try {

        const codigo_animal = req.params.id;
        const animal = await animalModel.findByPk(codigo_animal, {
            include: { model: adocaoModel }
        });

        if (!animal) {
            return res.status(400).json({ Message: "Animal não encontrado" });
        }

        await animal.update({ situacao: false });

        return res.status(200).json({ error: "Animal deletado" });
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middleware criando ou alterando foto --> (File)
const updateFile = async (req, res) => {
    try {
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
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

module.exports = {
    index,
    store,
    indexById,
    remove,
    update,
    updateFile
};
