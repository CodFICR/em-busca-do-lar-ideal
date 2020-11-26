// Dependencie
const jwt = require('jsonwebtoken');
// Model de pessoa
const pessoalModel = require('../models').pessoa;
// Chamando o token para validar pessoa
const { pessoaToken } = require('../config/auth');
// Chamando validation para o token
const validationSession = require('../validations/session');

const store = async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        await validationSession.validate({
            email,
            senha
        });
        const user = await pessoalModel.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ Error: 'User not found' });
        }
        if (!(await user.checkoutPassword(senha))) {
            return res.status(400).json({ Error: 'Password does not match' });
        }

        const { codigo_pessoa, nome } = user;

        return res.json({
            user: {
                codigo_pessoa,
                nome,
                email,
            },
            token: jwt.sign({ codigo_pessoa }, pessoaToken.secret, {
                expiresIn: pessoaToken.expiresIn
            }),
        });
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

module.exports = { store };
