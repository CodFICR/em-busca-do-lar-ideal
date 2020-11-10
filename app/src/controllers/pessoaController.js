const pessoaModel = require('../models').pessoa;

const listAll = async (req,res)=>{
    const allUsers = await pessoaModel.findAll();
    return res.send(allUsers);
}

const create = async (req,res)=>{
    const {nome,sobrenome,foto,endereco,tipo,genero,senha,email,telefone,dt_nascimento} = req.body;

    await pessoaModel.create({
        nome,
        sobrenome,
        foto,
        endereco,
        genero,
        senha,
        email,
        dt_nascimento,
        tipo,
        telefone,
    });
    
    const user = {
        nome,
        sobrenome,
        foto,
        endereco,
        tipo,
        genero,
        senha,
        email,
        telefone,
        dt_nascimento
    };

    return res.status(200).json(user);
};

module.exports = {listAll,create};