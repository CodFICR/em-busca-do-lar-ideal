const pessoaModel = require('../models').pessoa;
const adocaoModel = require('../models').adocao;
const avaliacaoModel = require('../models').avaliacao;
const fs = require('fs');
const {resizeImg} = require('../utils/resizeImg');
const bcrypt = require('bcryptjs');

const index = async (_,res)=>{
    const allUsers = await pessoaModel.findAll();
    return res.send(allUsers);
}

const indexById = async (req,res)=>{

    const codigo_pessoa = req.params.id;

    const user = await pessoaModel.findByPk(codigo_pessoa,{
        attributes:['nome','foto','sobrenome','email','cidade','bairro','estado','dt_nascimento','genero']
    });
    
    if(!user){
        return res.status(400).json({Error:"Usuário não encontrado"});
    }

    return res.status(200).json(user);
}

const updateFile = async (req,res) => {

    const codigo_pessoa =  req.params.id;

    const user = await pessoaModel.findByPk(codigo_pessoa);

    if(!user){
        fs.unlinkSync(req.file.path);
        return res.status(400).json({Error:"Usuário não encontrado"});
    }

    const {filename:image} = req.file;
    const [name] = image.split('.');
    const foto = `${name}.jpg`;

    resizeImg(req.file.path,req.file.destination,foto);

    await user.update({foto});

    return res.status(200).json({Message:"Imagem alterada com sucesso!"});
}

const store = async (req,res)=>{

    const {nome,sobrenome,cidade,bairro,estado,genero,password,email,telefone,dt_nascimento} = req.body;

    const emailExists = await pessoaModel.findOne({where:{email}});

    if(emailExists){
        return res.status(400).json({Error:"Email já existe"});
    }

    const senha = await bcrypt.hash(password,8);

    const user = {
        nome,
        sobrenome,
        cidade,
        bairro,
        estado,  
        genero,
        senha,
        email,
        dt_nascimento,
        telefone,
    }

    await pessoaModel.create(user);

    return res.status(200).json({Message:"Usuário criado com sucesso"});
};

const update = async (req,res) => {

    const codigo_pessoa =  req.params.id;

    const user = await pessoaModel.findByPk(codigo_pessoa);

    if(!user){
        return res.status(400).json({Error:"Usuário não encontrado"});
    }

    await user.update(req.body);

    return res.status(200).json({Message:"Usuário editado com sucesso!"});
}


const remove = async (req,res) =>{
    const codigo_pessoa = req.params.id;

    const user = await pessoaModel.findOne({
        where:{
            codigo_pessoa
        },
        include: [
            { model: avaliacaoModel },
            { model: adocaoModel }
        ]
    })

    if(!user){
        return res.status(400).json({Error:"Usuário não encontrado!"});
    }

    if(!user.adocao){
        return res.status(400).json({Error:"Impossível deletar usuário, pois ele possui vínculo em adoções!"})
    }

    if(!user.avaliacao){
        return res.status(400).json({Error:"Impossível deletar usuário, pois ele possui vínculo em avaliação!"});
    }

    await  pessoaModel.destroy({where:{codigo_pessoa}});

    return res.status(200).json({Error:"Usuário deletado."});
}

module.exports = {updateFile,update,store,index,indexById,remove};