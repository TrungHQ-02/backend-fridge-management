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
    listId: Joi.number().required(),
    newName: Joi.string().min(1).max(24).optional(),
    newAssignToUsername: Joi.string().allow("").optional(),
    newNote: Joi.string().allow("").optional(),
    newDate: Joi.date().optional(),
  }).or("newName", "newAssignToUsername", "newNote", "newDate");

  return schema.validate(body);
}

function validateDeleteShoppingList(body) {
  const schema = Joi.object({
    listId: Joi.number().required(),
  });

  return schema.validate(body);
}

// task
function validateCreateShoppingTasks(body) {
  const schema = Joi.object({
    listId: Joi.number().required(),
    tasks: Joi.array()
      .items(
        Joi.object({
          foodName: Joi.string().required(),
          quantity: Joi.number().required(),
        })
      )
      .required(),
  });

  return schema.validate(body);
}

function validateDeleteTask(body) {
  const schema = Joi.object({
    taskId: Joi.number().required(),
  });

  return schema.validate(body);
}

function validateUpdateTask(body) {
  const schema = Joi.object({
    taskId: Joi.number().required(),
    newFoodName: Joi.string().min(1).max(24).optional(),
    newQuantity: Joi.number().optional(),
  }).or("newFoodName", "newQuantity");

  return schema.validate(body);
}

module.exports = {
  validateCreateShoppingList,
  validateUpdateShoppingList,
  validateDeleteShoppingList,
  validateCreateShoppingTasks,
  validateDeleteTask,
  validateUpdateTask,
};
