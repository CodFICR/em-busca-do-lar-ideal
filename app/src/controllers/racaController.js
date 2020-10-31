const racaModel = require('../models').raca;

const create = async (req,res)=>{
    const {description} = req.body;
    await racaModel.create({description});
    return res.send({Message: "Raça Criada"});
}

const listAll = async (req,res)=>{
    const listRacas = await racaModel.findAll();
    return res.send(listRacas);
}

module.exports = {create,listAll};