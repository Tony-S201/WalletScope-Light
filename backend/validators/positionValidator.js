/* Position Validator */

const Joi = require('joi');

const positionSchema = Joi.object({
  token: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)  // Format ObjectId MongoDB
    .required(),
    
  wallet: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
    
  amount: Joi.number()
    .required()
    .min(0)
    .precision(18),
    
  isStaking: Joi.boolean()
    .default(false),
    
  stakingPlatform: Joi.object({
    name: Joi.string()
      .when('isStaking', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.optional()
      }),
    apy: Joi.number()
      .min(0)
      .max(100000)  // 100000% max APY
      .when('isStaking', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.optional()
      }),
    lockupPeriod: Joi.number()
      .integer()
      .min(0)
      .when('isStaking', {
        is: true,
        then: Joi.required(),
        otherwise: Joi.optional()
      })
  }).when('isStaking', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
    
  notes: Joi.string()
    .max(1000)
    .optional()
    .allow('', null),
    
  lastUpdate: Joi.date()
    .default(Date.now)
});

module.exports = positionSchema;