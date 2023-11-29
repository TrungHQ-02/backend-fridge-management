const express = require("express");
const {
  login,
  logout,
  register,
  refreshToken,
} = require("../controllers/user/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/register", register);
router.post("/refresh-token", refreshToken);

module.exports = router;
