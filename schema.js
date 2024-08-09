
const Joi = require('joi');

const ownerSchema= Joi.object({

  fullname:Joi.string().required(),
      email:Joi.string().email().required(),
      password:Joi.string().required().min(8).max(16),
      Products:Joi.array().items(Joi.string()),
      image:Joi.string().uri(),
      gstin:Joi.number(),
  })

module.exports = ownerSchema;