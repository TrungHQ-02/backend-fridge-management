const express = require("express");
const { createShoppingList } = require("../controllers/shopping/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", auth, createShoppingList);

module.exports = router;
