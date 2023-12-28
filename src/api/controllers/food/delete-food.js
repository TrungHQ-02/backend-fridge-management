const db = require("../../../models/index.js");
const { validateDeleteFood } = require("../../validators/food.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let deleteFoodByName = async (req, res) => {
  let food = "";
  const { error } = validateDeleteFood(req.body);
  if (error) {
    let code = "00179";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  try {
    const exists = await db.Food.findOne({
      where: {
        name: req.body.name,
      },
    });

    // console.log(exists);
    if (exists == null) return res.status(409).json(errorHelper("00180", req));
    food = exists;

    let user = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (food.UserId != user.belongsToGroupAdminId) {
      return res.status(409).json(errorHelper("00181", req));
    }
  } catch (err) {
    return res.status(500).json(errorHelper("00182", req, err.message));
  }

  try {
    await food.destroy();
  } catch (err) {
    return res.status(500).json(errorHelper("00183", req, err.message));
  }

  logger("00184", req.user.id, getText("en", "00184"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00184"), vn: getText("vn", "00184") },
    resultCode: "00184",
  });
};

module.exports = deleteFoodByName;
