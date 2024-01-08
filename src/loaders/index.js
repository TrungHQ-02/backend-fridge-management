const sequelizeLoader = require("./connectDB.js");
const expressLoader = require("./express.js");
const firebaseAdminLoader = require("./firebase-admin.js");
const scheduleJob = require("../scheduler/get-outdated-fridge-items.scheduler.js"); // Đường dẫn tới file scheduler.js

let loader = async (app) => {
  await sequelizeLoader();
  expressLoader(app);
  firebaseAdminLoader();
  scheduleJob();
};

module.exports = loader;
