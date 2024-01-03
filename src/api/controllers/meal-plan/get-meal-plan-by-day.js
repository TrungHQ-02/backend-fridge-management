const db = require("../../../models/index.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let getPlansInADay = async (req, res) => {
  let plans = "";
  let adminId = 0;

  try {
    let user = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (user.belongsToGroupAdminId == 0) {
      return res.status(403).json(errorHelper("00345", req));
    }
    adminId = user.belongsToGroupAdminId;
  } catch (err) {
    return res.status(500).json(errorHelper("00346", req, err.message));
  }

  try {
    plans = await db.MealPlan.findAll({
      where: {
        UserId: adminId,
        timestamp: req.query.date,
      },
      include: {
        model: db.Food,
      },
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00347", req, err.message));
  }

  logger("00348", req.user.id, getText("en", "00348"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00348"), vn: getText("vn", "00348") },
    resultCode: "00348",
    plans: plans,
  });
};

module.exports = getPlansInADay;
