const db = require("../../../models/index.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");
const {
  validateGetSpecificFridgeItem,
} = require("../../validators/fridge-item.validator.js");

let getSpecificFridgeItem = async (req, res) => {
  let item = "";
  let food = "";
  let adminId = 0;

  const { error } = validateGetSpecificFridgeItem(req.params);
  if (error) {
    let code = "00229";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  try {
    const exists = await db.Food.findOne({
      where: {
        name: req.params.foodName,
      },
    });

    if (exists == null) return res.status(409).json(errorHelper("00230", req));
    food = exists;
  } catch (err) {
    return res.status(500).json(errorHelper("00231", req, err.message));
  }

  try {
    let user = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (food.UserId != user.belongsToGroupAdminId) {
      return res.status(409).json(errorHelper("00232", req));
    }

    adminId = user.belongsToGroupAdminId;
  } catch (err) {
    return res.status(500).json(errorHelper("00233", req, err.message));
  }

  try {
    const exists = await db.FridgeItem.findOne({
      where: {
        FoodId: food.id,
      },
    });

    // console.log(exists);
    if (exists == null) return res.status(409).json(errorHelper("00234", req));
  } catch (err) {
    return res.status(500).json(errorHelper("00235", req, err.message));
  }

  try {
    item = await db.FridgeItem.findOne({
      where: {
        UserId: adminId,
        FoodId: food.id,
      },
      include: {
        model: db.Food,
        include: [
          {
            model: db.UnitOfMeasurement,
          },
          {
            model: db.FoodCategory,
          },
        ],
      },
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00236", req, err.message));
  }

  logger("00237", req.user.id, getText("en", "00237"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00237"), vn: getText("vn", "00237") },
    resultCode: "00237",
    item,
  });
};

module.exports = getSpecificFridgeItem;
