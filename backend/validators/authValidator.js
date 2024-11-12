const Joi = require('joi');

const authSchema = {
  login: Joi.object({
    address: Joi.string().required(),
    signature: Joi.string().required()
  })
};

module.exports = authSchema;