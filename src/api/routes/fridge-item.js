const express = require("express");
const {
  createFridgeItem,
  updateFridgeItem,
} = require("../controllers/fridege-item/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, createFridgeItem);
router.put("/", auth, updateFridgeItem);
module.exports = router;
