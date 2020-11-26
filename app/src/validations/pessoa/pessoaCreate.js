const Yup = require('yup');


const pessoaSchema = Yup.object().shape({
    nome: Yup.string()
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
    genero: Yup.string()
        .min(8)
        .max(9)
        .required(),
    email: Yup.string()
        .email()
        .required(),
    telefone: Yup.string()
        .length(11)
        .required(),
});


module.exports = pessoaSchema;