const db = require("../../../../models/index.js");
const {
  validateUpdateCategory,
} = require("../../../validators/food-category.validator.js");

const { errorHelper, logger, getText } = require("../../../../utils/index.js");

let editFoodCategoryByName = async (req, res) => {
  const { error } = validateUpdateCategory(req.body);
  if (error)
    return res
      .status(400)
      .json(errorHelper("00136", req, error.details[0].message));

  if (req.body.oldName === req.body.newName)
    return res.status(400).json(errorHelper("00137", req));

  let category = "";
  try {
    category = await db.FoodCategory.findOne({
      where: {
        name: req.body.oldName,
      },
    });

    if (category == null) {
      return res.status(400).json(errorHelper("00138", req));
    }
  } catch (err) {
    return res.status(500).json(errorHelper("00139", req, err.message));
  }

  try {
    await db.FoodCategory.update(
      {
        name: req.body.newName,
      },
      {
        where: {
          name: req.body.oldName,
        },
      }
    );
  } catch (e) {
    return res.status(500).json(errorHelper("00140", req, err.message));
  }

  logger("00141", req.user.id, getText("en", "00141"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00141"), vn: getText("vn", "00141") },
    resultCode: "00141",
  });
};

module.exports = editFoodCategoryByName;
