const login = require("./auth/login.js");
const logout = require("./auth/logout.js");
const register = require("./auth/register.js");
const refreshToken = require("./auth/refresh-token.js");
const sendVerificationCode = require("./auth/send-verification-code.js");

module.exports = {
  login,
  logout,
  register,
  refreshToken,
  sendVerificationCode,
};
