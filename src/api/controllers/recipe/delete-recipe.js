const db = require("../../../models/index.js");
const {
  validateDeleteRecipe,
} = require("../../validators/recipe.validator.js");

const { errorHelper, logger, getText } = require("../../../utils/index.js");

let deleteRecipe = async (req, res) => {
  const { error } = validateDeleteRecipe(req.body);

  if (error) {
    let code = "00371";
    if (error.details[0].message.includes("recipeId")) code = "00372";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let recipe;
  try {
    recipe = await db.Recipe.findOne({
      where: {
        id: req.body.recipeId,
      },
    });
    // plan with the provided id doesnt exist
    if (!recipe) {
      return res.status(403).json(errorHelper("00373", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00374", req, error.message));
  }

  try {
    await recipe.destroy({
      where: {
        id: req.body.planId,
      },
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00375", req, err.message));
  }

  logger("00376", req.user.id, getText("en", "00376"), "Info", req);

  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00376"),
      vn: getText("vn", "00376"),
    },
    resultCode: "00376",
  });
};

module.exports = deleteRecipe;
