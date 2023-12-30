const Joi = require("joi");

function validateCreateShoppingList(body) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    assignToUsername: Joi.string().min(1).required(),
    note: Joi.string().allow("").optional(),
    date: Joi.string().optional(),
  });
  return schema.validate(body);
}

module.exports = {
  validateCreateShoppingList,
};
