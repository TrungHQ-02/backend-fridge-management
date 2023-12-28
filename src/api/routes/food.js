const express = require("express");
const {
  createFood,
  updateFood,
  deleteFoodByName,
  getAllFoodsOfGroup,
} = require("../controllers/food/index.js");

const { auth, imageUpload, authority } = require("../middlewares/index.js");

let router = express.Router();

router.get("/", auth, getAllFoodsOfGroup);
router.post("/", auth, imageUpload, createFood);
router.put("/", auth, imageUpload, updateFood);
router.delete("/", auth, deleteFoodByName);
module.exports = router;
