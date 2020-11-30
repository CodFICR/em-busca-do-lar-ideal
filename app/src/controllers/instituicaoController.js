// Dependencies;
const { Op } = require('sequelize');
const fs = require('fs');
const bcrypt = require('bcryptjs');
// Models;
const instituicaoModel = require('../models').instituicao;
const animalModel = require('../models').animal;
// Validations;
const instiAuthEdit = require('../validations/instituicao/editInst');
const instiAuthCreate = require('../validations/instituicao/instituicaoCreate');

// Redimencionar tamanho da foto;
const { resizeImg } = require('../utils/resizeImg');

// middleware para listar uma instituição ;
const indexById = async (req, res) => {
    try {
        const codigo_instituicao = req.params.id;

        const attributes = ['foto', 'nome_instituicao', 'email', 'cnpj', 'nome_responsavel', 'cidade', 'bairro', 'estado', 'telefone']

        const instituicao = await instituicaoModel.findByPk(codigo_instituicao, { attributes });

        if (!instituicao) {
            return res.status(400).json({ Error: "Instituição não encontrada" });
        }

        return res.status(200).json(instituicao);
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middlewarea para criação de uma instituição;
const store = async (req, res) => {

    try {
        const { email, password, confirmPassword, telefone, cnpj, bairro, cidade, estado, nome_instituicao, nome_responsavel } = req.body;

        await instiAuthCreate.validate({
            email,
            password,
            confirmPassword,
            bairro,
            cidade,
            estado,
            nome_instituicao,
            nome_responsavel,
            telefone,
            cnpj
        })

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
        const instituicao = {
            email,
            senha,
            telefone,
            cnpj,
            bairro,
            cidade,
            estado,
            nome_instituicao,
            nome_responsavel
        }

        await instituicaoModel.create(instituicao);

        return res.status(200).json({ Message: "Usuário criado com sucesso!" });
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middleware para remover uma instituição;
const remove = async (req, res) => {
    try {
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

        await animalModel.update({ situacao: false },
            { where: { codigo_instituicao } }
        );

        await instituicao.update({ situacao: false });

        return res.status(200).json({ Message: "Instituição deletada" });
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middleware responsável para alterar dados da instituição;
const update = async (req, res) => {
    try {
        const codigo_instituicao = req.params.id;
        const instituicao = await instituicaoModel.findByPk(codigo_instituicao);

        await instiAuthEdit.validate(req.body);

        if (!instituicao) {
            return res.status(400).json({ Error: "Instituição não encontrada" });
        }

        if (parseInt(codigo_instituicao) !== req.codigo_instituicao) {
            return res.status(400).json({ Error: "Você não possui permição para editar esta instituição!" });
        }

        await instituicao.update(req.body);

        return res.status(200).json({ Message: "Instituição editada com sucesso!" });
    } catch (err) {
        return res.status(400).json({ Error: err.message });
    }
}

// Middleware para inserir ou alterar imagem da instituição;
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
        return res.status(400).json({ Error: err.message });
    }
}

// Exportando middlewares (indexById, Store, Remove, Update,UpdateFile);
module.exports = {
    indexById,
    store,
    remove,
    update,
    updateFile
};
