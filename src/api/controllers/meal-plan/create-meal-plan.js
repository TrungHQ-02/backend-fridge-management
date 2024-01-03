const db = require("../../../models/index.js");
const {
  validateCreateMealPlan,
} = require("../../validators/meal-plan.validator.js");

const { errorHelper, logger, getText } = require("../../../utils/index.js");

let createMealPlan = async (req, res) => {
  const { error } = validateCreateMealPlan(req.body);

  if (error) {
    let code = "00313";
    if (error.details[0].message.includes("foodName")) code = "00314";
    else if (error.details[0].message.includes("timestamp")) code = "00315";
    else if (error.details[0].message.includes("name")) code = "00316";
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
      return res.status(403).json(errorHelper("00317", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00318", req, error.message));
  }

  // get the admin by req.user.id
  try {
    let admin = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    // this user is not admin of the group that has this food
    if (admin.id != food.UserId) {
      return res.status(403).json(errorHelper("00319", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00320", req, error.message));
  }

  let newPlan = "";

  try {
    newPlan = await db.MealPlan.create({
      name: req.body.name,
      timestamp: req.body.timestamp,
      status: "NOT_PASS_YET",
      FoodId: food.id,
      UserId: req.user.id,
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00321", req, err.message));
  }

  logger("00322", req.user.id, getText("en", "00322"), "Info", req);

  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00322"),
      vn: getText("vn", "00322"),
    },
    resultCode: "00322",

    newPlan,
  });
};

module.exports = createMealPlan;
