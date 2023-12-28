const db = require("../../../models/index.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let getAllFoodsOfGroup = async (req, res) => {
  let foods = "";
  let adminId = 0;

  try {
    let user = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (user.belongsToGroupAdminId == 0) {
      return res.status(403).json(errorHelper("00185", req));
    }
    adminId = user.belongsToGroupAdminId;
  } catch (err) {
    return res.status(500).json(errorHelper("00186", req, err.message));
  }

  try {
    foods = await db.Food.findAll({
      where: {
        UserId: adminId,
      },
      include: [
        {
          model: db.UnitOfMeasurement,
          attributes: ["unitName"],
        },
        {
          model: db.FoodCategory,
          attributes: ["name"],
        },
      ],
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00187", req, err.message));
  }

  logger("00188", req.user.id, getText("en", "00188"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00188"), vn: getText("vn", "00188") },
    resultCode: "00188",
    foods,
  });
};

module.exports = getAllFoodsOfGroup;
