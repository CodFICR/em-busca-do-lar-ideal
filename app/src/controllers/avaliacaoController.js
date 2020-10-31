const avaliacao = require('../models').avaliacao;
const pessoa = require('../models').pessoa;
const instituicao = require('../models').instituicao;

const create = async (req,res)=>{

    const {nota,tipo,codigo_pessoa,codigo_instituicao} = req.body;

    await avaliacao.create({nota,tipo,codigo_pessoa,codigo_instituicao});
    return res.send({Message:"Tudo Certo!"});
}

const allList = async (req,res)=>{
    const allAvaliacao =  await avaliacao.findAll({
        include:[{
            model:pessoa
        },{
            model:instituicao
        }]
    });
    return res.send(allAvaliacao);
}


module.exports = {create,allList};
