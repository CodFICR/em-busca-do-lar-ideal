const pessoa = require('../models').pessoa;

const listAll = async (req,res)=>{
    const allUsers = await pessoa.findAll();
    return res.send(allUsers);
}

module.exports = {listAll};