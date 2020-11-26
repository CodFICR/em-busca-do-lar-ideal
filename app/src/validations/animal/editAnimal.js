const Yup = require('yup');


const editAnimalSchema = Yup.object().shape({
    nome: Yup.string()
        .min(3)
        .max(100)
        .required(),
    genero: Yup.string()
        .min(3)
        .max(100)
        .required(),
    vacinacao: Yup.string()
        .min(3)
        .max(100)
        .required(),
    castracao: Yup.string()
        .min(2)
        .max(100)
        .required(),
    observacao: Yup.string()
        .min(2)
        .max(100)
        .required()

});


module.exports = editAnimalSchema;