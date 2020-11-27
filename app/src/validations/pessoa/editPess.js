const Yup = require('yup');

const editPessoaSchema = Yup.object().shape({

    nome: Yup.string()
        .min(3)
        .max(100),
    sobrenome: Yup.string()
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
    password: Yup.string()
        .min(6)
        .max(25),
    genero: Yup.string()
        .min(8)
        .max(9),
    email: Yup.string()
        .email(),
    telefone: Yup.string()
        .length(11),
    password: Yup.string()
    .min(6),
    confirmPassword: Yup.string().when('password',(password,field)=>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),

});

module.exports = editPessoaSchema;
