const Joi = require("joi");

function validateCreateFood(body) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(24).required(),
    foodCategoryName: Joi.string().min(1).required(),
    unitName: Joi.string().min(1).required(),
  });
  return schema.validate(body);
}

function validateUpdateFood(body) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(24).required(),
    newName: Joi.string().min(1).max(24).optional(),
    newCategory: Joi.string().min(1).optional(),
    newUnit: Joi.string().min(1).optional(),
  }).or("newName", "newCategory", "newUnit");

  return schema.validate(body);
}

function validateDeleteFood(body) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
  });
  return schema.validate(body);
}

module.exports = {
  validateCreateFood,
  validateUpdateFood,
  validateDeleteFood,
};
