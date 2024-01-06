const getText = require("./lang/get_text.js");
const errorHelper = require("./helpers/error-helper.js");
const { getMessaging } = require("firebase-admin/messaging");

const sendNotificationToUserId = (userId) => {
  await;
  const registrationToken =
    "ctCKdFawTJ6-2m_gxvDF2k:APA91bGRwVqh52eeGDum8vXNs-ezO5P9aQJfeH-XMUXpa1BwuQBr7C2tcKCm0eM62jyrfsJ6tWKCSm8kY9Yr0UFnGuXMkuYTyyNcihcMCv3ivsrCcDQDKt1smIuHzmhQVYjR9GMGNgr3";

  const message = {
    notification: {
      title: "Notif",
      body: "This is a Test Notification",
    },
    token:
      "ctCKdFawTJ6-2m_gxvDF2k:APA91bGRwVqh52eeGDum8vXNs-ezO5P9aQJfeH-XMUXpa1BwuQBr7C2tcKCm0eM62jyrfsJ6tWKCSm8kY9Yr0UFnGuXMkuYTyyNcihcMCv3ivsrCcDQDKt1smIuHzmhQVYjR9GMGNgr3",
  };

  getMessaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

const sendNotificationToListOfUsers = (listOfUsers) => {
  const registrationTokens = [
    "YOUR_REGISTRATION_TOKEN_1",
    // …
    "YOUR_REGISTRATION_TOKEN_N",
  ];

  const message = {
    data: { score: "850", time: "2:45" },
    tokens: registrationTokens,
  };

  getMessaging()
    .sendMulticast(message)
    .then((response) => {
      console.log(response.successCount + " messages were sent successfully");
    });
};

module.exports = sendNotificationToUserId;
