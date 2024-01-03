const express = require("express");
const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, createRecipe);
router.put("/", auth, updateRecipe);
router.delete("/", auth, deleteRecipe);

module.exports = router;
