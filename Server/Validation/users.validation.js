const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const userValidation = Joi.object({
  fullname : Joi.string().min(3).required(),
  username: Joi.string().min(3).required(),
  password: Joi.string(),
  email: Joi.string().required(),
  todos : Joi.array(),
  projects : Joi.array()
});
module.exports = userValidation;

