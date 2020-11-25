const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const {pessoaToken} = require('../config/auth');


const autenticate =  async (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(400).json({error: "Token is not defined"});
    }

    const [,token] = authHeader.split(' ');

    try{
        
        const decoded = await promisify(jwt.verify)(token, pessoaToken.secret);
    
        req.codigo_pessoa = decoded.codigo_pessoa;
        
        return next();

    }catch(err){

        return res.status(400).json(err);

    }
}

module.exports = {autenticate};