const logger = require("./logger");
const errorHelper = require("./helpers/error-helper.js");
const generateRandomCode = require("./helpers/generate-random-code.js");
const giveCurrentDateTime = require("./helpers/give-current-date-time.js");
const getText = require("./lang/get_text.js");
const {
  signAccessToken,
  signConfirmCodeToken,
  signRefreshToken,
} = require("./helpers/jwt-helper.js");
const sendCodeToEmail = require("./send-code-to-email.js");
const sendNotificationToUserId = require("./send-notification-to-user.js");
module.exports = {
  logger,
  errorHelper,
  generateRandomCode,
  getText,
  signAccessToken,
  signConfirmCodeToken,
  signRefreshToken,
  sendCodeToEmail,
  giveCurrentDateTime,
  sendNotificationToUserId,
};
