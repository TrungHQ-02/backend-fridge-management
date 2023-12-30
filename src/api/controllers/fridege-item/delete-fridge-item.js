const db = require("../../../models/index.js");
const {
  validateDeleteFridgeItem,
} = require("../../validators/fridge-item.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let deleteFridgeItemByName = async (req, res) => {
  let food = "";
  let fridgeItem = "";
  const { error } = validateDeleteFridgeItem(req.body);
  if (error) {
    let code = "00217";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  try {
    const exists = await db.Food.findOne({
      where: {
        name: req.body.foodName,
      },
    });

    // console.log(exists);
    if (exists == null) return res.status(409).json(errorHelper("00218", req));
    food = exists;

    let user = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (food.UserId != user.belongsToGroupAdminId) {
      return res.status(409).json(errorHelper("00219", req));
    }
  } catch (err) {
    return res.status(500).json(errorHelper("00220", req, err.message));
  }

  try {
    const exists = await db.FridgeItem.findOne({
      where: {
        FoodId: food.id,
      },
    });

    // console.log(exists);
    if (exists == null) return res.status(409).json(errorHelper("00221", req));
    fridgeItem = exists;
  } catch (err) {
    return res.status(500).json(errorHelper("00222", req, err.message));
  }

  try {
    await fridgeItem.destroy();
  } catch (err) {
    return res.status(500).json(errorHelper("00223", req, err.message));
  }

  logger("00224", req.user.id, getText("en", "00224"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00224"), vn: getText("vn", "00224") },
    resultCode: "00224",
  });
};

module.exports = deleteFridgeItemByName;
