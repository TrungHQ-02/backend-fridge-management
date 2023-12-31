const express = require("express");
const {
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
  createTasks,
} = require("../controllers/shopping/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, createShoppingList);
router.put("/", auth, updateShoppingList);
router.delete("/", auth, deleteShoppingList);

router.post("/task", auth, createTasks);

module.exports = router;
