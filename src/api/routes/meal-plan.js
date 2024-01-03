const express = require("express");
const { createMealPlan } = require("../controllers/meal-plan/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, createMealPlan);

module.exports = router;
