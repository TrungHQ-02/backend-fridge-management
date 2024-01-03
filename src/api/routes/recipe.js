const express = require("express");
const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByFoodId,
} = require("../controllers/recipe/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, createRecipe);
router.put("/", auth, updateRecipe);
router.delete("/", auth, deleteRecipe);
router.get("/", auth, getRecipesByFoodId);

module.exports = router;
