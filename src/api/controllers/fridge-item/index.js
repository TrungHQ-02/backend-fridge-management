const createFridgeItem = require("./create-fridge-item");
const updateFridgeItem = require("./update-fridge-item");
const deleteFridgeItemByName = require("./delete-fridge-item");
const getAllFridgeItemsOfGroup = require("./get-fridge-items-of-group");
const getSpecificFridgeItem = require("./get-specific-item");

module.exports = {
  createFridgeItem,
  updateFridgeItem,
  deleteFridgeItemByName,
  getAllFridgeItemsOfGroup,
  getSpecificFridgeItem,
};
