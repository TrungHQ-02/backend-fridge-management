const db = require("../../../../models/index.js");
const {
  validateDeleteCategory,
} = require("../../../validators/food-category.validator.js");

const { errorHelper, logger, getText } = require("../../../../utils/index.js");

let deleteCategoryByName = async (req, res) => {
  const { error } = validateDeleteCategory(req.body);
  if (error) {
    let code = "00142";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let category = "";
  try {
    category = await db.FoodCategory.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (category == null) {
      return res.status(400).json(errorHelper("00143", req));
    }
  } catch (err) {
    return res.status(500).json(errorHelper("00144", req, err.message));
  }

  try {
    await category.destroy();
  } catch (err) {
    return res.status(500).json(errorHelper("00145", req, err.message));
  }

  logger("00146", req.user.id, getText("en", "00146"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00146"), vn: getText("vn", "00146") },
    resultCode: "00146",
  });
};

module.exports = deleteCategoryByName;
