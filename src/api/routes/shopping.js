const express = require("express");
const {
  createShoppingList,
  updateShoppingList,
} = require("../controllers/shopping/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, createShoppingList);
router.put("/", auth, updateShoppingList);

module.exports = router;
