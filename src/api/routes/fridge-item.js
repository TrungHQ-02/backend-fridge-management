const express = require("express");
const {
  createFridgeItem,
  updateFridgeItem,
  deleteFridgeItemByName,
  getAllFridgeItemsOfGroup,
  getSpecificFridgeItem,
} = require("../controllers/fridge-item/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, createFridgeItem);
router.put("/", auth, updateFridgeItem);
router.delete("/", auth, deleteFridgeItemByName);
router.get("/", auth, getAllFridgeItemsOfGroup);
router.get("/:foodName", auth, getSpecificFridgeItem);
module.exports = router;
