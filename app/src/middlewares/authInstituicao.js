const jwt = require('jsonwebtoken');

const {promisify} = require('util');
const {instituicaoToken} = require('../config/auth');

const autenticate =  async (req,res,next)=>{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(400).json({Error:"Token is not defined"});
        }

        const [,token] = authHeader.split(' ');

        try{
            const decoded = await promisify(jwt.verify)(token, instituicaoToken.secret);
           
            req.codigo_instituicao =  decoded.codigo_instituicao;
            
            return next();
        }catch(err){
            return res.status(400).json(err);
        }
}

module.exports =  {autenticate};