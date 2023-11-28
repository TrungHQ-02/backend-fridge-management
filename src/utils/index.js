const logger = require("./logger");
const errorHelper = require("./helpers/error-helper.js");

const getText = require("./lang/get_text.js");
const {
  signAccessToken,
  signConfirmCodeToken,
  signRefreshToken,
} = require("./helpers/jwt-helper.js");
module.exports = {
  logger,
  errorHelper,
  getText,
  signAccessToken,
  signConfirmCodeToken,
  signRefreshToken,
};
