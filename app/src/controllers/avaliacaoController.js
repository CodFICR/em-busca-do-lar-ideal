const avaliacaoModel = require('../models').avaliacao;
const pessoaModel = require('../models').pessoa;
const instituicaoModel = require('../models').instituicao;

const create = async (req,res)=>{

    const {nota,tipo,codigo_pessoa,codigo_instituicao} = req.body;

    await avaliacaoModel.create({nota,tipo,codigo_pessoa,codigo_instituicao});
    
    return res.send({Message:"Tudo Certo!"});
}

const allList = async (req,res)=>{

    const allAvaliacao =  await avaliacaoModel.findAll({
        attributes:['nota','tipo'],
        include:[{
            model:pessoaModel,
            attributes:['nome','sobrenome','email']
        },{
            model:instituicaoModel,
            attributes:['nome_instituicao']
        }]
    });

    return res.send(allAvaliacao);
}


module.exports = {create,allList};
