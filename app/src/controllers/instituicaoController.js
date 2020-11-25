const instituicaoModel = require('../models').instituicao;
const animalModel = require('../models').animal;
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const { resizeImg } = require('../utils/resizeImg');

const index = async (_, res) => {
    const allInsts = await instituicaoModel.findAll({
        where: {
            [Op.or]: [
                { situacao: "ANÁLISE" },
                { situacao: "APROVADA" }
            ]
        }
    });
    return res.send(allInsts);
}

const indexById = async (req, res) => {
    const codigo_instituicao = req.params.id;

    const instituicao = await instituicaoModel.findByPk(codigo_instituicao, {
        attributes: ['foto', 'nome_instituicao', 'email', 'cnpj', 'nome_responsavel', 'cidade', 'bairro', 'estado', 'telefone']
    });

    if (!instituicao) {
        return res.status(400).json({ Error: "Instituição não encontrada" });
    }

    return res.status(200).json(instituicao);
}


const store = async (req, res) => {

    const { email, password, telefone, cnpj, bairro, cidade, estado, nome_instituicao, nome_responsavel } = req.body;

    const instituicaoExists = await instituicaoModel.findOne({
        where: {
            [Op.or]: [
                { nome_instituicao }
                ,
                { email }
            ]
        }
    }) || {};


    if (instituicaoExists.email === email) {
        return res.status(400).json({ Error: "Email já existe!" });
    }

    if (instituicaoExists.nome_instituicao === nome_instituicao) {
        return res.status(400).json({ Error: "Instituição já existente com este nome!" });
    }

    const senha = await bcrypt.hash(password, 8);

    await instituicaoModel.create({
        email,
        senha,
        foto,
        telefone,
        cnpj,
        bairro,
        cidade,
        estado,
        nome_instituicao,
        nome_responsavel
    });

    return res.status(200).json({ Message: "Usuário criado com sucesso!" });
}


const remove = async (req, res) => {
    const codigo_instituicao = req.params.id;

    const instituicao = await instituicaoModel.findByPk(codigo_instituicao, {
        include: [{ model: animalModel }]
    });

    if (!instituicao) {
        return res.status(400).json({ Error: "Instituição não encontrada" });
    }

    if (parseInt(codigo_instituicao) !== req.codigo_instituicao) {
        return res.status(400).json({ Error: "Você não tem permição para remover esta instituição!" });
    }

    await animalModel.update(
        { situacao: "Removido" },
        { where: { codigo_instituicao, situacao: "ABERTO" } }
    );

    await instituicao.update({ situacao: "FECHADA" });

    return res.status(200).json({ Message: "Instituição deletada" });
}

const update = async (req, res) => {

    const codigo_instituicao = req.params.id;

    const instituicao = await instituicaoModel.findByPk(codigo_instituicao);


    if (!instituicao) {
        return res.status(400).json({ Error: "Instituição não encontrada" });
    }

    if (parseInt(codigo_instituicao) !== req.codigo_instituicao) {
        return res.status(400).json({ Error: "Você não possui permição para editar esta instituição!" });
    }

    await instituicao.update(req.body);

    return res.status(200).json({ Message: "Instituição editada com sucesso!" });
}

const updateFile = async (req, res) => {

    try {
        const codigo_instituicao = req.params.id;

        const instituicao = await instituicaoModel.findByPk(codigo_instituicao);

        if (!instituicao) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ Error: "Instituição não encontrada!" });
        }
        
        const { filename: image } = req.file;
        const [name] = image.split('.');
        const foto = `${name}.jpg`

        resizeImg(req.file.path, req.file.destination, foto);

        await instituicao.update({ foto });

        return res.status(200).json({ Message: "Imagem alterada com sucesso!" });
    } catch (err) {
        return res.status(400).json(err);
    }
}

module.exports = {
    index,
    indexById,
    store,
    remove,
    update,
    updateFile
};