const jwt = require('jsonwebtoken');

const pessoalModel = require('../models').pessoa;
const { pessoaToken } = require('../config/auth');


const store = async (req, res) => {
    try {

        const { email, senha } = req.body;
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
        return res.status(400).json(err);
    }
};

module.exports = { store };
