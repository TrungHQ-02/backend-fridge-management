const db = require("../../../models/index.js");
const {
  validateDeleteMealPlan,
} = require("../../validators/meal-plan.validator.js");

const { errorHelper, logger, getText } = require("../../../utils/index.js");

let deleteMealPlan = async (req, res) => {
  const { error } = validateDeleteMealPlan(req.body);

  if (error) {
    let code = "00323";
    if (error.details[0].message.includes("planId")) code = "00324";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let plan;
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
      return res.status(403).json(errorHelper("00325", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00326", req, error.message));
  }

  // get the admin by req.user.id
  try {
    let admin = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    // this user is not admin of the group that has this food
    if (admin.id != plan["Food.UserId"]) {
      return res.status(403).json(errorHelper("00327", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00328", req, error.message));
  }

  try {
    await db.MealPlan.destroy({
      where: {
        id: req.body.planId,
      },
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00329", req, err.message));
  }

  logger("00330", req.user.id, getText("en", "00330"), "Info", req);

  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00330"),
      vn: getText("vn", "00330"),
    },
    resultCode: "00330",
  });
};

module.exports = deleteMealPlan;
