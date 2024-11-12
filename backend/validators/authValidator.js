const Joi = require('joi');

const authSchema = {
  login: Joi.object({
    address: Joi.string().required(),
    signature: Joi.string().required(),
    timestamp: Joi.number().required()
  })
};

module.exports = authSchema;