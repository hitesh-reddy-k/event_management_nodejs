const Joi = require("joi");

const createEventSchema = Joi.object({
  title: Joi.string().min(3).required(),

  dateTime: Joi.date().iso().required(),
  
  location: Joi.string().required(),
  capacity: Joi.number().min(1).max(1000).required(),
});

module.exports = { createEventSchema };
