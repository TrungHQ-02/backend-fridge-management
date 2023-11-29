const login = require("./auth/login.js");
const logout = require("./auth/logout.js");
const register = require("./auth/register.js");
const refreshToken = require("./auth/refresh-token.js");

module.exports = {
  login,
  logout,
  register,
  refreshToken,
};
