const db = require("../../../../models/index.js");

const { errorHelper, logger, getText } = require("../../../../utils/index.js");

let getAllCategories = async (req, res) => {
  let categories = "";
  try {
    categories = await db.FoodCategory.findAll();
  } catch (err) {
    return res.status(500).json(errorHelper("00130", req, err.message));
  }

  logger("00129", req.user.id, getText("en", "00129"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00129"), vn: getText("vn", "00129") },
    resultCode: "00129",
    categories,
  });
};

module.exports = getAllCategories;
