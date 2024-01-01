const db = require("../../../models/index.js");
const {
  validateUpdateFridgeItem,
} = require("../../validators/fridge-item.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let updateFridgeItem = async (req, res) => {
  const { error } = validateUpdateFridgeItem(req.body);
  if (error) {
    let code = "00203";

    if (error.details[0].message.includes("itemId")) code = "00204";
    else if (error.details[0].message.includes("at least")) code = "00204x";
    else if (error.details[0].message.includes("newUseWithin")) code = "00205";
    else if (error.details[0].message.includes("newQuantity")) code = "00206";
    else if (error.details[0].message.includes("newNote")) code = "00207";
    else if (error.details[0].message.includes("newFoodName")) code = "00207x";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let food = "";
  let user = "";
  let existingFridgeItem = "";

  // Check if food exists
  // try {
  //   const exists = await db.Food.findOne({
  //     where: {
  //       name: req.body.foodName,
  //     },
  //   });

  //   if (exists == null) return res.status(409).json(errorHelper("00208", req));
  //   food = exists;
  // } catch (err) {
  //   return res.status(500).json(errorHelper("00209", req, err.message));
  // }

  try {
    user = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (user.belongsToGroupAdminId == 0) {
      return res.status(400).json(errorHelper("00210", req));
    }
  } catch (err) {
    return res.status(500).json(errorHelper("00211", req, err.message));
  }

  // Check if the fridge item exists
  try {
    existingFridgeItem = await db.FridgeItem.findOne({
      where: {
        id: req.body.itemId,
      },
    });

    if (existingFridgeItem == null)
      return res.status(409).json(errorHelper("00213", req));

    if (existingFridgeItem.UserId != user.belongsToGroupAdminId) {
      console.log(existingFridgeItem.UserId);
      return res.status(400).json(errorHelper("00212", req));
    }
  } catch (err) {
    return res.status(500).json(errorHelper("00214", req, err.message));
  }

  try {
    // Update the fridge item
    // console.log(req.body);
    if (req.body.newUseWithin) {
      existingFridgeItem.expiredDate = new Date(
        new Date(existingFridgeItem.startDate).getTime() +
          req.body.newUseWithin * 60000
      );
    }

    if (req.body.newQuantity) {
      existingFridgeItem.quantity = req.body.newQuantity;
    }

    if (req.body.newNote) {
      existingFridgeItem.note = req.body.newNote;
    }

    if (req.body.newFoodName) {
      let newFood = "";
      try {
        newFood = await db.Food.findOne({
          where: {
            name: req.body.newFoodName,
          },
        });

        if (newFood == null)
          return res.status(409).json(errorHelper("00214x", req));

        existingFridgeItem.FoodId = newFood.id;
      } catch (err) {
        return res.status(500).json(errorHelper("00214xx", req, err.message));
      }
    }

    await existingFridgeItem.save();
    existingFridgeItem = await db.FridgeItem.findOne({
      where: {
        id: existingFridgeItem.id,
      },
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00215", req, err.message));
  }

  logger("00216", req.user.id, getText("en", "00216"), "Info", req);
  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00216"),
      vn: getText("vn", "00216"),
    },
    resultCode: "00216",
    updatedFridgeItem: existingFridgeItem,
  });
};

module.exports = updateFridgeItem;
