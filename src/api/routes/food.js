const express = require("express");
const { createFood, updateFood } = require("../controllers/food/index.js");

const { auth, imageUpload, authority } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, imageUpload, createFood);
router.put("/", auth, imageUpload, updateFood);
module.exports = router;
