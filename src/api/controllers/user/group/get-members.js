const db = require("../../../../models/index.js");
const { errorHelper, getText, logger } = require("../../../../utils/index.js");

let getMembersInGroup = async (req, res) => {
  let members = [];
  let adminId = 0;

  try {
    let currentUser = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    adminId = currentUser.belongsToGroupAdminId;

    if (adminId == 0) {
      return res.status(500).json(errorHelper("00096", req, err.message));
    }

    members = await db.User.findAll({
      where: {
        belongsToGroupAdminId: adminId,
      },
      attributes: {
        exclude: ["password", "belongsToGroupAdminId"],
      },
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00097", req, err.message));
  }

  logger("00098", req.user.id, getText("en", "00098"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00098"), vn: getText("vn", "00098") },
    groupAdmin: adminId,
    members: members,
    resultCode: "00098",
  });
};

module.exports = getMembersInGroup;
