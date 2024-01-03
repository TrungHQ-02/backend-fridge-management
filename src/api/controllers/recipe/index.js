const createRecipe = require("./create-recipe");
const updateRecipe = require("./update-recipe");
const deleteRecipe = require("./delete-recipe");
const getRecipesByFoodId = require("./get-recipes-by-food");

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByFoodId,
};
