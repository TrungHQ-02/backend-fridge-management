const db = require("../../../models/index.js");
const {
  validateUpdateRecipe,
} = require("../../validators/recipe.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let updateRecipe = async (req, res) => {
  const { error } = validateUpdateRecipe(req.body);
  if (error) {
    let code = "00358";

    if (error.details[0].message.includes("recipeId")) code = "00359";
    else if (error.details[0].message.includes("at least")) code = "00360";
    else if (error.details[0].message.includes("newFoodName")) code = "00361";
    else if (error.details[0].message.includes("newDescription"))
      code = "00362";
    else if (error.details[0].message.includes("newHtmlContent"))
      code = "00363";
    else if (error.details[0].message.includes("newName")) code = "00364";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let recipe = "";
  try {
    recipe = await db.Recipe.findOne({
      where: {
        id: req.body.recipeId,
      },
    });
    // plan with the provided id doesnt exist
    if (!recipe) {
      return res.status(403).json(errorHelper("00365", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00366", req, error.message));
  }

  try {
    if (req.body.newName) {
      recipe.name = req.body.newName;
    }

    if (req.body.newDescription) {
      recipe.description = req.body.newDescription;
    }

    if (req.body.newHtmlContent) {
      recipe.htmlContent = req.body.newHtmlContent;
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
          return res.status(409).json(errorHelper("00367", req));

        recipe.FoodId = newFood.id;
      } catch (err) {
        return res.status(500).json(errorHelper("00368", req, err.message));
      }
    }

    await recipe.save();
    recipe = await db.Recipe.findOne({
      where: {
        id: recipe.id,
      },
      include: db.Food,
      raw: true,
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00369", req, err.message));
  }

  logger("00370", req.user.id, getText("en", "00370"), "Info", req);
  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00370"),
      vn: getText("vn", "00370"),
    },
    resultCode: "00370",
    recipe: recipe,
  });
};

module.exports = updateRecipe;
