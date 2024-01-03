const express = require("express");
const {
  createMealPlan,
  deleteMealPlan,
  updateMealPlan,
  getPlansInADay,
} = require("../controllers/meal-plan/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, createMealPlan);
router.delete("/", auth, deleteMealPlan);
router.put("/", auth, updateMealPlan);
router.get("/", auth, getPlansInADay);

module.exports = router;
