const express = require("express");
const { createFridgeItem } = require("../controllers/fridege-item/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, createFridgeItem);
module.exports = router;
