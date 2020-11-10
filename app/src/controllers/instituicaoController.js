const instituicaoModel = require('../models').instituicao;

const listAll = async (req,res)=>{
    const allInsts = await instituicaoModel.findAll();
const instituicao = require('../models').instituicao;



module.exports = {listAll};