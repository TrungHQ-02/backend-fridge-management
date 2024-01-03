const db = require("../../../models/index.js");
const {
  validateUpdateMealPlan,
} = require("../../validators/meal-plan.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let updateMealPlan = async (req, res) => {
  const { error } = validateUpdateMealPlan(req.body);
  if (error) {
    let code = "00331";

    if (error.details[0].message.includes("planId")) code = "00332";
    else if (error.details[0].message.includes("at least")) code = "00333";
    else if (error.details[0].message.includes("newFoodName")) code = "00334";
    else if (error.details[0].message.includes("newTimestamp")) code = "00335";
    else if (error.details[0].message.includes("newName")) code = "00336";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let plan = "";
  try {
    plan = await db.MealPlan.findOne({
      where: {
        id: req.body.planId,
      },
      include: db.Food,
      raw: true,
    });
    // plan with the provided id doesnt exist
    if (!plan) {
      return res.status(403).json(errorHelper("00337", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00338", req, error.message));
  }

  try {
    let admin = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });
    // this user is not admin of the group that has this food
    if (admin.id != plan["Food.UserId"]) {
      return res.status(403).json(errorHelper("00339", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00340", req, error.message));
  }

  // get the sequelize instance
  plan = await db.MealPlan.findOne({
    where: {
      id: req.body.planId,
    },
  });

  try {
    if (req.body.newName) {
      plan.name = req.body.newName;
    }

    if (req.body.newTimestamp) {
      plan.timestamp = req.body.newTimestamp;
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
          return res.status(409).json(errorHelper("00341", req));

        plan.FoodId = newFood.id;
      } catch (err) {
        return res.status(500).json(errorHelper("00342", req, err.message));
      }
    }

    await plan.save();
    plan = await db.MealPlan.findOne({
      where: {
        id: plan.id,
      },
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00343", req, err.message));
  }

  logger("00344", req.user.id, getText("en", "00344"), "Info", req);
  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00344"),
      vn: getText("vn", "00344"),
    },
    resultCode: "00344",
    plan: plan,
  });
};

module.exports = updateMealPlan;
