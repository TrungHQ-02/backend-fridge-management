const sequelizeLoader = require("./connectDB.js");
const expressLoader = require("./express.js");
const firebaseAdminLoader = require("./firebase-admin.js");

let loader = async (app) => {
  await sequelizeLoader();
  expressLoader(app);
  firebaseAdminLoader();
};

module.exports = loader;
