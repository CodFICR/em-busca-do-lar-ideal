// Dependencies
const dateformat = require('dateformat');
const bcrypt = require('bcryptjs');
const fs = require('fs');

// Validations
const validationCreate =  require('../validations/pessoa/pessoaCreate')
const validationEdit =  require('../validations/pessoa/editPess');

// MODELS
const pessoaModel = require('../models').pessoa;
const adocaoModel = require('../models').adocao;
const avaliacaoModel = require('../models').avaliacao;
<<<<<<< HEAD


// Função para mudar resolução de IMG
const {resizeImg} = require('../utils/resizeImg');


// MIDDLEWARES
// Middleware para listagem de usuários.
=======
const fs = require('fs');
const {resizeImg} = require('../utils/resizeImg');
const bcrypt = require('bcryptjs');

>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
const index = async (_,res)=>{
    const allUsers = await pessoaModel.findAll();

    const allUserWithModifyDtNascimento = allUsers.map(person => {
        const newPerson = person.dataValues
        newPerson.dt_nascimento = dateformat(newPerson.dt_nascimento, 'dd-mm-yyyy HH:MM:ss',"+03:00",_);
        return newPerson;
    });

    return res.send(allUserWithModifyDtNascimento);
}
// Middleware para listar apenas um usuário
const indexById = async (req,res)=>{

<<<<<<< HEAD
=======
const indexById = async (req,res)=>{

>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
    const codigo_pessoa = req.params.id;

    const user = await pessoaModel.findByPk(codigo_pessoa,{
        attributes:['nome','foto','sobrenome','email','cidade','bairro','estado','dt_nascimento','genero']
    });
    
    if(!user){
        return res.status(400).json({Error:"Usuário não encontrado"});
    }
<<<<<<< HEAD

    return res.status(200).json(user);
}

// Middleware inserir ou modificar foto --> (File)
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

// Middleware para criação de usuário 
const store = async (req,res)=>{
    try {
        const {nome,sobrenome,cidade,bairro,estado,genero,password,email,telefone,dt_nascimento} = req.body;
        const senha = await bcrypt.hash(password,8);
       
        await validationCreate.validate( {
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
        });
        
        const emailExists = await pessoaModel.findOne({where:{email}});
        if(emailExists){
            return res.status(400).json({Error:"Email já existe"});
        }
        await pessoaModel.create(req.body);
        
        return res.status(200).json({Message:"Usuário criado com sucesso"});
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

// Middleware para edição de dados do usuário 
const update = async (req,res) => {
    try{
    
    const codigo_pessoa =  req.params.id;
    
    const user = await pessoaModel.findByPk(codigo_pessoa);
    
    if(!user){
        return res.status(400).json({Error:"Usuário não encontrado"});
    }
    
    await validationEdit.validate(req.body);
    
    await user.update(req.body);
    
    return res.status(200).json({Message:"Usuário editado com sucesso!"});
    }catch(err){
        return res.status(400).json(err.message);
    }
}

// Middleware para remover usuário
=======

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

>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790

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

<<<<<<< HEAD
// Exportando Middlewares
module.exports = {
    updateFile,
    update,
    store,
    index,
    indexById,
    remove
};
=======
module.exports = {updateFile,update,store,index,indexById,remove};
>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
