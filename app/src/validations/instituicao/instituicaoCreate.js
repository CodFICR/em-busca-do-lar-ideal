const Yup = require('yup');


const instituicaoSchema = Yup.object().shape({
    nome_instituicao: Yup.string()
        .min(3)
        .max(100)
        .required(),
    nome_responsavel: Yup.string()
        .min(3)
        .max(100)
        .required(),
    sobrenome: Yup.string()
        .min(3)
        .max(100)
        .required(),
    cidade: Yup.string()
        .min(2)
        .max(100)
        .required(),
    bairro: Yup.string()
        .min(2)
        .max(100)
        .required(),
    estado: Yup.string()
        .min(2)
        .max(100)
        .required(),
    password: Yup.string()
        .min(6)
        .max(25),
    email: Yup.string()
        .email()
        .required(),
    telefone: Yup.string()
        .length(11)
        .required(),
});


module.exports = instituicaoSchema;