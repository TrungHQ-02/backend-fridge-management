const createFood = require("./create-food");
const updateFood = require("./update-food");
const deleteFoodByName = require("./delete-food");
const getAllFoodsOfGroup = require("./get-foods-of-group");
const getAllCategories = require("./get-all-food-category");
const getAllUnits = require("./get-all-unit-of-measurement");
module.exports = {
  createFood,
  updateFood,
  deleteFoodByName,
  getAllFoodsOfGroup,
  getAllCategories,
  getAllUnits,
};
