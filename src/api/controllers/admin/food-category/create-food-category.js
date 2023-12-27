const db = require("../../../../models/index.js");

const {
  validateCreateCategory,
} = require("../../../validators/food-category.validator.js");
const { errorHelper, logger, getText } = require("../../../../utils/index.js");

let createCategory = async (req, res) => {
  let category = "";
  const { error } = validateCreateCategory(req.body);
  if (error) {
    let code = "00131";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  try {
    const exists = await db.FoodCategory.findOne({
      where: {
        name: req.body.name,
      },
    });

    // console.log(exists);
    if (exists != null) return res.status(409).json(errorHelper("00132", req));
  } catch (err) {
    return res.status(500).json(errorHelper("00133", req, err.message));
  }
  try {
    category = await db.FoodCategory.create({
      name: req.body.name,
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00134", req, err.message));
  }

  logger("00135", req.user.id, getText("en", "00135"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00135"), vn: getText("vn", "00135") },
    resultCode: "00135",
    unit: category,
  });
};

module.exports = createCategory;
