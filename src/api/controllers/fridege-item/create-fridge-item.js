const db = require("../../../models/index.js");
const {
  validateCreateFridgeItem,
} = require("../../validators/fridge-item.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let createFridgeItem = async (req, res) => {
  const { error } = validateCreateFridgeItem(req.body);
  if (error) {
    let code = "00147";
    console.log(error.details[0].message);
    if (error.details[0].message.includes("foodName")) code = "00151";
    else if (error.details[0].message.includes("expiredDate")) code = "00153";
    else if (error.details[0].message.includes("quantity")) code = "00200";
    else if (error.details[0].message.includes("note")) code = "00155";
    else if (error.details[0].message.includes("startDate")) code = "00156";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  logger("00160", req.user.id, getText("en", "00160"), "Info", req);
  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00160"),
      vn: getText("vn", "00160"),
    },
    resultCode: "00160",
    newFood,
  });
};

module.exports = createFridgeItem;
