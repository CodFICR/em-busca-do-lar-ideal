const Yup = require('yup');

const editInstSchema = Yup.object().shape({
    nome_instituicao: Yup.string()
        .min(3)
        .max(100),
    nome_responsavel: Yup.string()
        .min(3)
        .max(100),
    cidade: Yup.string()
        .min(2)
        .max(100),
    bairro: Yup.string()
        .min(2)
        .max(100),
    estado: Yup.string()
        .min(2)
        .max(100),
    email: Yup.string()
        .email(),
    cnpj: Yup.string()
        .length(14),
    telefone: Yup.string()
        .length(11),
    password: Yup.string()
        .min(6),
    confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
});

module.exports = editInstSchema;
