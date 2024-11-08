/* Wallet Validators */

const Joi = require('joi');

const walletSchema = {
  create: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required().length(42)
  }),

  update: Joi.object({
    name: Joi.string(),
    address: Joi.string().length(42)
  })
}

module.exports = walletSchema;