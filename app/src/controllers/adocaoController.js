// Models;
const adocaoModel = require('../models').adocao;
const pessoaModel = require('../models').pessoa;
const animalModel = require('../models').animal;
const instituicaoModel = require('../models').instituicao;
const racaModel = require('../models').raca;

// Middleware para ver adoções vinculadas a pessoa;
const indexForPerson = async (req, res) => {

    try {


        const id = req.params.id;

        if (parseInt(id) !== req.codigo_pessoa) {
            return res.status(400).json({ Error: "Você não possui permição para ver as adoções!" });
        }

        const adocoes = await adocaoModel.findAll({
            where: { codigo_pessoa: id, situacao: true },
            attributes: ['codigo_adocao', 'situacao', 'dt_adocao', 'dt_devolucao'],
            include: [{
                model: pessoaModel,
                attributes: ['nome', 'sobrenome', 'email'],
            }, {
                model: animalModel,
                attributes: ['codigo_animal', 'nome'],
                include: {
                    model: instituicaoModel,
                    attributes: ['nome_instituicao', 'email']
                }
            }],
        });

        if (!adocoes) {
            return res.status(200).json({ Message: "O usuário ainda não possui adoção!" });
        }
        return res.status(200).json(adocoes);
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middleware para ver adoções vinculadas a instituição;
const indexForInst = async (req, res) => {
    try {
        const id = req.params.id;

        if (parseInt(id) !== req.codigo_instituicao) {
            return res.status(400).json({ Error: "Você não possui permição para ver as adoções!" });
        }

        const adocoes = await adocaoModel.findAll({
            where: { codigo_instituicao: id, situacao: true },
            attributes: ['codigo_adocao', 'situacao', 'dt_adocao', 'dt_devolucao'],
            include: [{
                model: instituicaoModel,
                attributes: ['codigo_instituicao', 'nome_instituicao', 'email'],
            },
            {
                model: pessoaModel,
                attributes: ['nome', 'sobrenome', 'email'],
            }, {
                model: animalModel,
                attributes: ['codigo_animal', 'nome'],
            },],
        });

        if (!adocoes) {
            return res.status(200).json({ Message: "Esta instituição ainda não possue adoções" });
        }

        return res.status(200).json(adocoes);
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middleware para listagem de solicitações de adoções em aberto
const indexSolicitacao = async (req, res) => {
    try {
        const codigo_instituicao = req.params.id;


        if (parseInt(codigo_instituicao) !== req.codigo_instituicao) {
            return res.status(400).json({ Message: "Você não possui permição para ver as solicitações" });
        }

        const solicitacoes = await adocaoModel.findAll({
            where: { situacao: false },
            include: [
                {
                    model: animalModel,
                    attributes: ['codigo_animal', 'nome', 'porte'],
                    include: {
                        model: instituicaoModel,
                        attributes: ['nome_instituicao', 'email']
                    }
                }, {
                    model: pessoaModel,
                    attributes: ['codigo_pessoa', 'nome', 'sobrenome', 'email']
                }]
        });

        if (!solicitacoes) {
            return res.status(200).json({ Message: "Instituição não possui solicitações" });
        }
        return res.status(200).json(solicitacoes);
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middleware para solicitar a  adoção;
const solicitacao = async (req, res) => {
    try {
        const codigo_animal = req.params.id;
        const codigo_pessoa = req.codigo_pessoa;

        if (!codigo_pessoa) {
            return res.status(400).json({ Message: "Você não possui permição para adotar!" });
        }

        const animalExists = await animalModel.findByPk(codigo_animal);

        if (!animalExists) {
            return res.status(400).json({ Error: "Animal não encontrado!" });
        }

        if (animalExists.situacao == 1) {
            return res.status(400).json({ Error: "Este animal não pode ser adotado 2 vezes!" });
        }

        await adocaoModel.create({
            codigo_animal,
            codigo_pessoa,
        });

        return res.status(200).json({ Message: "Tudo Certo!!" });
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middleware para aceitar solicitação de adoção
const aceitarSolicitacao = async (req, res) => {
    try {
        const codigo_adocao = req.params.id;
        const adocao = await adocaoModel.findByPk(codigo_adocao, { where: { situacao: false } });

        if (!adocao) {
            return res.status(400).json({ Error: "Adoção não encontrada!" });
        }

        await adocao.update({ codigo_instituicao: req.codigo_instituicao, situacao: true });

        return res.status(200).json({ Message: "Adoção realizada" });
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}


// Middleware para dar  editar uma adoção mudando o campo {dt_devolução: new Date()} e mudando o campo de animal {situacao: false};
const updateDevolucao = async (req, res) => {
    try {
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

        if (!animalExists.situacao) {
            return res.status(400).json({ Error: "Este animal não pode ser devolvido!" });
        }

        await adocaoExists.update({
            dt_devolucao: new Date()
        });

        await animalExists.update({ situacao: false });

        return res.status(200).json({ Message: "Tudo certo!" });
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}



// Middleware para mostrar uma adoção específica;

const indexById = async (req, res) => {
    try {
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
                    { model: instituicaoModel }
                ]
            });
        if (!adocao) {
            return res.status(400).json({ Message: "Adoção não encontrada!" });
        }

        return res.status(200).json(adocao);
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

module.exports = {
    indexForInst,
    indexForPerson,
    solicitacao,
    updateDevolucao,
    indexById,
    aceitarSolicitacao,
    indexSolicitacao
};