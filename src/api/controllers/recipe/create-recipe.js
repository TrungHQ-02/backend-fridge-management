const db = require("../../../models/index.js");
const {
  validateCreateRecipe,
} = require("../../validators/recipe.validator.js");

const { errorHelper, logger, getText } = require("../../../utils/index.js");

let createRecipe = async (req, res) => {
  const { error } = validateCreateRecipe(req.body);

  if (error) {
    let code = "00349";
    if (error.details[0].message.includes("foodName")) code = "00350";
    else if (error.details[0].message.includes("name")) code = "00351";
    else if (error.details[0].message.includes("description")) code = "00352";
    else if (error.details[0].message.includes("htmlContent")) code = "00353";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let food;
  try {
    food = await db.Food.findOne({
      where: {
        name: req.body.foodName,
      },
    });

    // food with the provided id doesnt exist
    if (!food) {
      return res.status(403).json(errorHelper("00354", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00355", req, error.message));
  }

  let newRecipe = "";

  try {
    newRecipe = await db.Recipe.create({
      name: req.body.name,
      description: req.body.description || req.body.name,
      htmlContent: req.body.htmlContent,
      FoodId: food.id,
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00356", req, err.message));
  }

  newRecipe = await db.Recipe.findOne({
    id: newRecipe.id,
    include: db.Food,
    raw: true,
  });

  logger("00357", req.user.id, getText("en", "00357"), "Info", req);

  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00357"),
      vn: getText("vn", "00357"),
    },
    resultCode: "00357",
    newRecipe,
  });
};

module.exports = createRecipe;
