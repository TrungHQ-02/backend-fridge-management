const dotenv = require("dotenv");
dotenv.config();

const { PORT, JWT_SECRET_KEY } = process.env;
const prefix = "/api";

module.exports = {
  port: PORT || 8080,
  prefix: prefix,
  jwtSecretKey: JWT_SECRET_KEY,
};
