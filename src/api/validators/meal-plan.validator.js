const Joi = require("joi");

function validateCreateMealPlan(body) {
  const schema = Joi.object({
    foodName: Joi.string().min(1).max(24).required(),
    timestamp: Joi.string().min(1).max(24).required(),
    name: Joi.string().valid("breakfast", "lunch", "dinner").required(),
  });
  return schema.validate(body);
}
function validateDeleteMealPlan(body) {
  const schema = Joi.object({
    planId: Joi.number().positive().required(),
  });
  return schema.validate(body);
}

module.exports = {
  validateCreateMealPlan,
  validateDeleteMealPlan,
};
