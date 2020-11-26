<<<<<<< HEAD
// dependecies 
const jwt = require('jsonwebtoken');
// Model de instituicao
const instituicaoModel = require('../models').instituicao;
// Chamando a função para o auth instituicao
const { instituicaoToken } = require('../config/auth');
// Chamando o validation do token
const validationToken = require('../validations/session');

// Middleware para criação de Sessão (Login)
=======
const jwt = require('jsonwebtoken');

const instituicaoModel = require('../models').instituicao;

const { instituicaoToken } = require('../config/auth');

>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
const store = async (req, res) => {

    try {

        const { email, senha } = req.body;

<<<<<<< HEAD
        await validationToken.validate({
            email,
            senha
        });

=======
>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
        const organization = await instituicaoModel.findOne({ where: { email } });

        if (!organization) {
            return res.status(400).json({ Error: 'Organization not found' });
        }

        if (!(await organization.checkoutPassword(senha))) {
            return res.status(400).json({ error: "Password does not match!" });
        }

        const { codigo_instituicao, nome_instituicao } = organization;

        return res.json({
            instituicao: {
                codigo_instituicao,
                nome_instituicao,
                email
            },
            token: jwt.sign({ codigo_instituicao }, instituicaoToken.secret, {
                expiresIn: instituicaoToken.expiresIn
            }),
        });

    } catch (err) {
<<<<<<< HEAD
        return res.status(400).json(err.message);
=======
        return res.status(400).json(err);
>>>>>>> 6d924f083f8437effe00b321d02f6e58c5870790
    }
}

module.exports = { store };
