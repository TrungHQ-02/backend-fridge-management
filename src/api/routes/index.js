const express = require("express");
const user = require("./user.js");

let router = express.Router();

router.use("/user", user);

module.exports = router;
