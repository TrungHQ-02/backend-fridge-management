const db = require("../../../models/index.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let getAllFridgeItemsOfGroup = async (req, res) => {
  let fridgeItems = "";
  let adminId = 0;

  try {
    let user = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (user.belongsToGroupAdminId == 0) {
      return res.status(403).json(errorHelper("00225", req));
    }
    adminId = user.belongsToGroupAdminId;
  } catch (err) {
    return res.status(500).json(errorHelper("00226", req, err.message));
  }

  try {
    fridgeItems = await db.FridgeItem.findAll({
      where: {
        UserId: adminId,
      },
      include: {
        model: db.Food,
      },
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00227", req, err.message));
  }

  logger("00228", req.user.id, getText("en", "00228"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00228"), vn: getText("vn", "00228") },
    resultCode: "00228",
    fridgeItems,
  });
};

module.exports = getAllFridgeItemsOfGroup;
