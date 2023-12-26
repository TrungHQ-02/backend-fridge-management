const login = require("./auth/login.js");
const logout = require("./auth/logout.js");
const register = require("./auth/register.js");
const refreshToken = require("./auth/refresh-token.js");
const sendVerificationCode = require("./auth/send-verification-code.js");
const forgotPassword = require("./auth/forgot-password.js");
const verifyEmail = require("./auth/verify-email.js");
const getUser = require("./get-user.js");
const changePassword = require("./edit/change-password.js");
const editUser = require("./edit/edit_user.js");
const deleteUser = require("./delete-user.js");
const createAGroup = require("./group/create-group.js");
const getMembersInGroup = require("./group/get-members.js");
const addMemberToGroup = require("./group/add-member.js");
const deleteMember = require("./group/delete-member.js");
module.exports = {
  login,
  logout,
  register,
  refreshToken,
  sendVerificationCode,
  forgotPassword,
  verifyEmail,
  getUser,
  changePassword,
  editUser,
  deleteUser,
  createAGroup,
  getMembersInGroup,
  addMemberToGroup,
  deleteMember,
};
