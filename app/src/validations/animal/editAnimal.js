const Yup = require('yup');


const editAnimalSchema = Yup.object().shape({
    nome: Yup.string()
        .min(3)
        .max(100),
    genero: Yup.string()
        .oneOf(['MACHO', 'FEMEA']),
    vacinacao: Yup.boolean(),
    porte: Yup.mixed()
        .oneOf(['MINI', 'P', 'M', 'G', 'GG']),
    castracao: Yup.boolean(),
    observacao: Yup.string()
        .min(2)
        .max(100)

});


module.exports = editAnimalSchema;