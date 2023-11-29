const express = require("express");
const { login, logout } = require("../controllers/user/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/login", login);
router.post("/logout", auth, logout);

module.exports = router;
