const db = require("../../../models/index.js");
const {
  validateCreateFridgeItem,
} = require("../../validators/fridge-item.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let createFridgeItem = async (req, res) => {
  const { error } = validateCreateFridgeItem(req.body);
  if (error) {
    let code = "00189";

    // console.log(error.details[0].message);
    if (error.details[0].message.includes("foodName")) code = "00190";
    else if (error.details[0].message.includes("useWithin")) code = "00191";
    else if (error.details[0].message.includes("quantity")) code = "00192";
    else if (error.details[0].message.includes("note")) code = "00193";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let food = "";
  let user = "";
  let newFridgeItem = "";

  // check food
  try {
    const exists = await db.Food.findOne({
      where: {
        name: req.body.foodName,
      },
    });

    // console.log(exists);
    if (exists == null) return res.status(409).json(errorHelper("00194", req));
    food = exists;
  } catch (err) {
    return res.status(500).json(errorHelper("00195", req, err.message));
  }

  try {
    user = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (user.belongsToGroupAdminId == 0) {
      return res.status(400).json(errorHelper("00196", req));
    }
  } catch (err) {
    return res.status(500).json(errorHelper("00197", req, err.message));
  }

  if (food.UserId != user.belongsToGroupAdminId) {
    return res.status(400).json(errorHelper("00198", req));
  }

  try {
    const exists = await db.FridgeItem.findOne({
      where: {
        FoodId: food.id,
      },
    });

    if (exists != null) return res.status(409).json(errorHelper("00199", req));
  } catch (err) {
    return res.status(500).json(errorHelper("00200", req, err.message));
  }

  try {
    let currentDate = new Date();
    // currentDate = new Date(currentDate.getTime() + 60 * 60000);
    newFridgeItem = await db.FridgeItem.create({
      startDate: currentDate,
      expiredDate: new Date(currentDate.getTime() + req.body.useWithin * 60000),
      quantity: req.body.quantity,
      note: req.body.note ? req.body.note : "",
      FoodId: food.id,
      UserId: user.belongsToGroupAdminId,
    });

    newFridgeItem = await db.FridgeItem.findOne({
      where: {
        FoodId: food.id,
      },
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00201", req, err.message));
  }

  logger("00202", req.user.id, getText("en", "00202"), "Info", req);
  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00202"),
      vn: getText("vn", "00202"),
    },
    resultCode: "00202",
    newFridgeItem,
  });
};

module.exports = createFridgeItem;
