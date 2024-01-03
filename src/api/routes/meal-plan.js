const express = require("express");
const {
  createMealPlan,
  deleteMealPlan,
} = require("../controllers/meal-plan/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, createMealPlan);
router.delete("/", auth, deleteMealPlan);

module.exports = router;
