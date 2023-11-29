const login = require("./auth/login.js");
const logout = require("./auth/logout.js");
const register = require("./auth/register.js");
const refreshToken = require("./auth/refresh-token.js");
const sendVerificationCode = require("./auth/send-verification-code.js");
const forgotPassword = require("./auth/forgot-password.js");
const verifyEmail = require("./auth/verify-email.js");

module.exports = {
  login,
  logout,
  register,
  refreshToken,
  sendVerificationCode,
  forgotPassword,
  verifyEmail,
};
