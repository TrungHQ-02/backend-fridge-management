const db = require("../../../../models/index.js");
const {
  validateSaveNotificationToken,
} = require("../../../validators/user.validator.js");
const { errorHelper, logger, getText } = require("../../../../utils/index.js");

let saveNotificationToken = async (req, res) => {
  const { error } = validateSaveNotificationToken(req.body);
  if (error)
    return res
      .status(400)
      .json(errorHelper("00092x1", req, error.details[0].message));

  try {
    await db.User.update(
      {
        notificationToken: req.body.token,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
  } catch (e) {
    return res.status(500).json(errorHelper("00092x2", req, err.message));
  }

  logger("00092x3", req.user.id, getText("en", "00092x3"), "Info", req);
  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00092x3"),
      vn: getText("vn", "00092x3"),
    },
    resultCode: "00092x3",
  });
};

module.exports = saveNotificationToken;
