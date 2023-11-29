const dotenv = require("dotenv");
dotenv.config();

const {
  PORT,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
} = process.env;
const prefix = "/api";

module.exports = {
  port: PORT || 8080,
  prefix: prefix,
  jwtSecretKey: JWT_SECRET_KEY,
  refreshTokenSecretKey: REFRESH_TOKEN_SECRET_KEY,
  mailUsername: MAIL_USERNAME,
  mailPassword: MAIL_PASSWORD,
  oauthClientId: OAUTH_CLIENTID,
  oauthClientSecret: OAUTH_CLIENT_SECRET,
  oauthRefreshToken: OAUTH_REFRESH_TOKEN,
};
