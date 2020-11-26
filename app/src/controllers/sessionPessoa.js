<<<<<<< HEAD
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
=======
const jwt = require('jsonwebtoken');

const pessoalModel = require('../models').pessoa;
const { pessoaToken } = require('../config/auth');


const store = async (req, res) => {
    try {

        const { email, senha } = req.body;
>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
        const user = await pessoalModel.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ Error: 'User not found' });
        }
<<<<<<< HEAD
=======

>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
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
<<<<<<< HEAD
        return res.status(400).json(err.message);
=======
        return res.status(400).json(err);
>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
    }
};

module.exports = { store };
