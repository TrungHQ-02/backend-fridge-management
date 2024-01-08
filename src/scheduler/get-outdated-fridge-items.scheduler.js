const schedule = require("node-schedule");
const db = require("../models/index");
const moment = require("moment");
const { sendNotificationToUserId } = require("../utils/index");

function scheduleJob() {
  schedule.scheduleJob("*/3 * * * * *", getOutdatedItemAndSendNotification);
}

let getOutdatedItemAndSendNotification = async () => {
  let items = await db.FridgeItem.findAll({
    raw: true,
  });

  const currentDate = moment();

  items.forEach((item) => {
    const expiredDate = moment(item.expiredDate);

    const daysDifference = expiredDate.diff(currentDate, "days");
    if (daysDifference == 0 || daysDifference == 1) {
      sendAboutToOutdate(item.id);
    } else if (daysDifference < 0) {
      sendOutdateNoti(item.id);
    }
  });
};

let sendOutdateNoti = async (itemId) => {
  let item = await db.FridgeItem.findOne({
    where: {
      id: itemId,
    },
    include: {
      model: db.Food,
      attributes: ["UserId", "name"],
    },
    raw: true,
  });

  let adminId = item["Food.UserId"];

  let members = await db.User.findAll({
    where: {
      belongsToGroupAdminId: adminId,
    },
    raw: true,
    attribute: ["id"],
  });

  members.forEach((member) => {
    sendNotificationToUserId(member.id, {
      title: "A food expired!!!",
      body: "An item in your fridge expired, remove it!",
    });
  });
};

let sendAboutToOutdate = async (itemId) => {
  let item = await db.FridgeItem.findOne({
    where: {
      id: itemId,
    },
    include: {
      model: db.Food,
      attributes: ["UserId", "name"],
    },
    raw: true,
  });

  let adminId = item["Food.UserId"];

  let members = await db.User.findAll({
    where: {
      belongsToGroupAdminId: adminId,
    },
    raw: true,
    attribute: ["id"],
  });

  members.forEach((member) => {
    sendNotificationToUserId(member.id, {
      title: "About to expire!!!",
      body: "An item in your fridge is about to expire",
    });
  });
};

module.exports = scheduleJob;
