const getText = require("./lang/get_text.js");
const errorHelper = require("./helpers/error-helper.js");
const { getMessaging } = require("firebase-admin/messaging");
const db = require("../models/index.js");

const sendNotificationToUserId = async (userId, message, req, res) => {
  console.log(userId, message);
  let user = await db.User.findOne({
    where: {
      id: userId,
    },
  });

  console.log(user.notificationToken);

  let notifToken = user.notificationToken;
  const sendMessage = {
    data: message,
    token: notifToken,
  };

  getMessaging()
    .send(sendMessage)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      errorHelper("00005x", req);
    });
};

module.exports = {
  sendNotificationToUserId: sendNotificationToUserId,
};
