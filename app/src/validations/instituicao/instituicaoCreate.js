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
    email: Yup.string()
        .email()
        .required(),
    cnpj: Yup.string()
        .length(14)
        .required(),
    telefone: Yup.string()
        .length(11)
        .required(),
    password: Yup.string()
        .min(6),
    confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
});


module.exports = instituicaoSchema;