const express = require("express");
const {
  login,
  logout,
  register,
  refreshToken,
  sendVerificationCode,
  forgotPassword,
  verifyEmail,
} = require("../controllers/user/index.js");

const { auth } = require("../middlewares/index.js");

let router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/verify-email", verifyEmail);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", auth, forgotPassword);
router.post("/send-verification-code", sendVerificationCode);

module.exports = router;
