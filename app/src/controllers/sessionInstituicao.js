const jwt = require('jsonwebtoken');

const instituicaoModel = require('../models').instituicao;

const { instituicaoToken } = require('../config/auth');

const store = async (req, res) => {

    try {

        const { email, senha } = req.body;

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
        return res.status(400).json(err);
    }
}

module.exports = { store };
