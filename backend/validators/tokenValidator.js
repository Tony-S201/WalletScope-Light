/* Token Validators */

const Joi = require('joi');

const tokenSchema = {
  create: Joi.object({
    name: Joi.string().required(),
    symbol: Joi.string().required(),
    contractAddress: Joi.string().required(),
    network: Joi.string().required(),
    coingeckoId: Joi.string().allow(null, ''),
    manualPrice: {
      usd: Joi.number().allow(null)
    },
  }),
};

module.exports = tokenSchema;