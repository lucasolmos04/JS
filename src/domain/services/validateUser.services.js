const Joi = require('Joi');

const schema = Joi.object().keys({
    firstName : Joi.string(),
    lastName : Joi.string(),
    email : Joi.string().trim().email()
});

module.exports = schema;