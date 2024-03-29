const express = require("express");
const {
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
  createTasks,
  getListOfTasks,
  deleteTask,
  updateShoppingTask,
  markTask,
} = require("../controllers/shopping/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, createShoppingList);
router.put("/", auth, updateShoppingList);
router.delete("/", auth, deleteShoppingList);

router.post("/task", auth, createTasks);
router.get("/task", auth, getListOfTasks);
router.delete("/task", auth, deleteTask);
router.put("/task", auth, updateShoppingTask);

router.put("/task/mark", auth, markTask);

module.exports = router;
