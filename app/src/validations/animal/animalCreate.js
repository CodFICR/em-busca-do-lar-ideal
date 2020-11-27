const Yup = require('yup');


const animalSchema = Yup.object().shape({
    nome: Yup.string()
        .min(3)
        .max(100)
        .required(),
    genero: Yup.string()
        .oneOf(['MACHO', 'FEMEA'])
        .required(),
    vacinacao: Yup.boolean()
        .required(),
    porte: Yup.mixed()
        .oneOf(['MINI', 'P', 'M', 'G', 'GG']),
    castracao: Yup.boolean()
        .required(),
    observacao: Yup.string()
        .min(2)
        .max(100)
        .required()
});


module.exports = animalSchema;