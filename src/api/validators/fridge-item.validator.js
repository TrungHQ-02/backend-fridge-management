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
    expiredDate: Joi.date().optional(),
    quantity: Joi.number().integer().positive().optional(),
    note: Joi.string().allow("").optional(),
    startDate: Joi.date().optional(),
    foodName: Joi.string().min(1).optional(),
  }).or("expiredDate", "quantity", "note", "startDate", "foodName");

  return schema.validate(body);
}

function validateDeleteFridgeItem(body) {
  const schema = Joi.object({
    fridgeItemId: Joi.number().integer().positive().required(),
  });
  return schema.validate(body);
}

module.exports = {
  validateCreateFridgeItem,
  validateUpdateFridgeItem,
  validateDeleteFridgeItem,
};
