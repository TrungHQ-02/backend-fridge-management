const Joi = require("joi");

function validateCreateFridgeItem(body) {
  const schema = Joi.object({
    foodName: Joi.string().min(1).required(),
    useWithin: Joi.number().positive().required(),
    quantity: Joi.number().positive().required(),
    note: Joi.string().allow("").optional(),
  });
  return schema.validate(body);
}

function validateUpdateFridgeItem(body) {
  const schema = Joi.object({
    foodName: Joi.string().min(1).max(24).required(),
    newUseWithin: Joi.number().positive().optional(),
    newQuantity: Joi.number().positive().optional(),
    newNote: Joi.string().allow("").optional(),
    newFoodName: Joi.string().min(1).optional(),
  }).or("newUseWithin", "newQuantity", "newNote");

  return schema.validate(body);
}

function validateDeleteFridgeItem(body) {
  const schema = Joi.object({
    foodName: Joi.string().min(1).required(),
  });
  return schema.validate(body);
}

function validateGetSpecificFridgeItem(body) {
  const schema = Joi.object({
    foodName: Joi.string().min(1).required(),
  });
  return schema.validate(body);
}

module.exports = {
  validateCreateFridgeItem,
  validateUpdateFridgeItem,
  validateDeleteFridgeItem,
  validateGetSpecificFridgeItem,
};
