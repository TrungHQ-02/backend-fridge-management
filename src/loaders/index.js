const sequelizeLoader = require("./connectDB.js");

let loader = async (app) => {
  await sequelizeLoader();
};

module.exports = loader;
