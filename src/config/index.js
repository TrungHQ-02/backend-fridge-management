// Sử dụng require thay vì import
const dotenv = require("dotenv");
dotenv.config();

// Sử dụng exports thay vì export
const { PORT } = process.env;
module.exports = PORT || 8080;
