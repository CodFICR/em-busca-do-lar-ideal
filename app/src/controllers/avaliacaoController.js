const avaliacaoModel = require('../models').avaliacao;
const pessoaModel = require('../models').pessoa;
const instituicaoModel = require('../models').instituicao;

const store = async (req, res) => {

    const { nota, tipo, codigo_pessoa, codigo_instituicao } = req.body;

    await avaliacaoModel.create({ nota, tipo, codigo_pessoa, codigo_instituicao });

    return res.send({ Message: "Tudo Certo!" });
}

const index = async (_, res) => {

    const allAvaliacao = await avaliacaoModel.findAll({
        attributes: ['nota', 'tipo'],
        include: [{
            model: pessoaModel,
            attributes: ['nome', 'sobrenome', 'email']
        }, {
            model: instituicaoModel,
            attributes: ['nome_instituicao']
        }]
    });

    return res.send(allAvaliacao);
}

const indexById = async (req,res)=>{
    const codigo_avaliacao = req.params.id;

    const avaliacao = await avaliacaoModel.findByPk(codigo_avaliacao,{
        attributes:['codigo_nota','nota','tipo'],
        include:[
            {
                model:pessoaModel,
                attributes:['nome','sobrenome','email']
            },
            {
                model:instituicaoModel,
                attributes:['nome_instituicao']
            }
        ]
    });

    if(!avaliacao){
        return res.status(400).json({Error:"Avaliação não encontrada"});
    }

    return res.status(200).json(avaliacao);
}

module.exports = {
    store,
    index,
    indexById
};
