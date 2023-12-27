const Joi = require("joi");

function validateCreateFood(body) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(24).required(),
    foodCategoryName: Joi.string().min(1).required(),
    unitName: Joi.string().min(1).required(),
  });
  return schema.validate(body);
}

module.exports = {
  validateCreateFood,
};
