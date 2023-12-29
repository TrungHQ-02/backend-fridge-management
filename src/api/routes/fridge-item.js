const express = require("express");
const { createFridgeItem } = require("../controllers/fridege-item/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", createFridgeItem);
module.exports = router;
