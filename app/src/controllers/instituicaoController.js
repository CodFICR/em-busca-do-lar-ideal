const instituicao = require('../models').instituicao;

const listAll = async (req,res)=>{
    const allInsts = await instituicao.findAll();
    return res.send(allInsts);
}

module.exports = {listAll};