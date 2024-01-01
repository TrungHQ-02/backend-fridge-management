const createShoppingList = require("./create-shopping-list");
const updateShoppingList = require("./update-shopping-list");
const deleteShoppingList = require("./delete-shopping-list");

const createTasks = require("./create-shopping-tasks");
const getListOfTasks = require("./get-list-of-shopping-tasks");
const deleteTask = require("./delete-shopping-task");
const updateShoppingTask = require("./update-shopping-task");

module.exports = {
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
  createTasks,
  getListOfTasks,
  deleteTask,
  updateShoppingTask,
};
