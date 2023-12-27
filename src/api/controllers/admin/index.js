const getAllLogs = require("./get-logs");
const createUnitOfMeasurement = require("./unit-of-measurement/create-unit");
const getAllUnits = require("./unit-of-measurement/get-all");
const editUnitByName = require("./unit-of-measurement/update-unit");
const deleteUnitByName = require("./unit-of-measurement/delete-unit");

const getAllCategories = require("./food-category/get-all-category");
const createCategory = require("./food-category/create-food-category");
const deleteCategoryByName = require("./food-category/delete-food-category");
const editFoodCategoryByName = require("./food-category/update-food-category");

module.exports = {
  getAllLogs,
  createUnitOfMeasurement,
  getAllUnits,
  editUnitByName,
  deleteUnitByName,
  getAllCategories,
  createCategory,
  deleteCategoryByName,
  editFoodCategoryByName,
};
