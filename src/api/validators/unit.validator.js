const Joi = require("joi");

function validateCreateUnitOfMeasurement(body) {
  const schema = Joi.object({
    unitName: Joi.string().min(1).required(),
  });
  return schema.validate(body);
}

function validateDeleteUnitOfMeasurement(body) {
  const schema = Joi.object({
    unitName: Joi.string().min(1).required(),
  });
  return schema.validate(body);
}

function validateUpdateUnitOfMeasurement(body) {
  const schema = Joi.object({
    oldName: Joi.string().min(1).required(),
    newName: Joi.string().min(1).required(),
  });
  return schema.validate(body);
}

module.exports = {
  validateCreateUnitOfMeasurement,
  validateUpdateUnitOfMeasurement,
  validateDeleteUnitOfMeasurement,
};
