const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
});

module.exports = { createUserSchema };
