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

function validateUpdateShoppingList(body) {
  const schema = Joi.object({
    listId: Joi.string().required(),
    newName: Joi.string().min(1).max(24).optional(),
    newAssignToUsername: Joi.string().allow("").optional(),
    newNote: Joi.string().allow("").optional(),
    newDate: Joi.date().optional(),
  }).or("newName", "newAssignToUsername", "newNote", "newDate");

  return schema.validate(body);
}

module.exports = {
  validateCreateShoppingList,
  validateUpdateShoppingList,
};