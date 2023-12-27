const Joi = require("joi");

function validateCreateCategory(body) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
  });
  return schema.validate(body);
}

function validateDeleteCategory(body) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
  });
  return schema.validate(body);
}

function validateUpdateCategory(body) {
  const schema = Joi.object({
    oldName: Joi.string().min(1).required(),
    newName: Joi.string().min(1).required(),
  });
  return schema.validate(body);
}

module.exports = {
  validateCreateCategory,
  validateDeleteCategory,
  validateUpdateCategory,
};
