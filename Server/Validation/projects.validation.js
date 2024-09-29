const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const projectValidation = Joi.object({
  title : Joi.string().min(1).required(),
  description: Joi.string().min(30).required(),
  members : Joi.array(),
  tasks : Joi.array()
});
module.exports = projectValidation;

