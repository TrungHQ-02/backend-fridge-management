const express = require("express");
const { login } = require("../controllers/user/index.js");

let router = express.Router();

router.post("/login", login);

module.exports = router;
