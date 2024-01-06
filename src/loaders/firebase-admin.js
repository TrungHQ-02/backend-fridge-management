const admin = require("firebase-admin");
const serviceAccount = require("../config/hustexam-firebase-adminsdk-25dto-1a4ddb5835.json");

let firebaseAdminLoader = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};

module.exports = firebaseAdminLoader;
