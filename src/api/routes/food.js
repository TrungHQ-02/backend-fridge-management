const express = require("express");
const { createFood } = require("../controllers/food/index.js");

const { auth, imageUpload, authority } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, imageUpload, createFood);
module.exports = router;
