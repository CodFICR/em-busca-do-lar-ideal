const instituicaoModel = require('../models').instituicao;

const listAll = async (req,res)=>{
    const allInsts = await instituicaoModel.findAll();
    return res.send(allInsts);
}

module.exports = {listAll};