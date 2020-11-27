const Yup = require('yup');

const sessionSchema = Yup.object().shape({
    email: Yup.string()
    .email()
    .required(),
    senha: Yup.string()
    .min(6)
    .required(),
});

module.exports = sessionSchema;