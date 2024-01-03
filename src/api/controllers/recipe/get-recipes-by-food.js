const db = require("../../../models/index.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let getRecipesByFoodId = async (req, res) => {
  let recipes = "";
  if (req.query.foodId) {
    try {
      recipes = await db.Recipe.findAll({
        where: {
          FoodId: req.query.foodId,
        },
        include: {
          model: db.Food,
        },
      });
    } catch (err) {
      return res.status(500).json(errorHelper("00377", req, err.message));
    }
  }

  logger("00378", req.user.id, getText("en", "00378"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00378"), vn: getText("vn", "00378") },
    resultCode: "00378",
    recipes: recipes,
  });
};

module.exports = getRecipesByFoodId;
