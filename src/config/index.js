const dotenv = require("dotenv");
dotenv.config();

const swaggerConfig = require("./swagger.config.json");

const {
  PORT,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_HOST,
  MAIL_PORT,
} = process.env;
const prefix = "/api";

module.exports = {
  port: PORT || 8080,
  prefix: prefix,
  jwtSecretKey: JWT_SECRET_KEY,
  refreshTokenSecretKey: REFRESH_TOKEN_SECRET_KEY,
  mailUsername: MAIL_USERNAME,
  mailPassword: MAIL_PASSWORD,
  mailHost: MAIL_HOST,
  mailPort: MAIL_PORT,
  apiSpecs: "/docs",
  swaggerConfig: swaggerConfig,
};
