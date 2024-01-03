const Joi = require("joi");

function validateCreateRecipe(body) {
  const schema = Joi.object({
    foodName: Joi.string().min(1).max(24).required(),
    name: Joi.string().min(1).max(24).required(),
    htmlContent: Joi.string().required(),
    description: Joi.string().optional(),
  });
  return schema.validate(body);
}

function validateDeleteRecipe(body) {
  const schema = Joi.object({
    recipeId: Joi.number().positive().required(),
  });
  return schema.validate(body);
}

function validateUpdateRecipe(body) {
  const schema = Joi.object({
    recipeId: Joi.number().positive().required(),
    newFoodName: Joi.string().min(1).max(24).optional(),
    newHtmlContent: Joi.string().optional(),
    newName: Joi.string().min(1).optional(),
    newDescription: Joi.string().min(1).optional(),
  }).or("newFoodName", "newHtmlContent", "newName", "newDescription");

  return schema.validate(body);
}

module.exports = {
  validateCreateRecipe,
  validateUpdateRecipe,
  validateDeleteRecipe,
};
