const db = require("../../../models/index.js");
const {
  validateUpdateTask,
} = require("../../validators/shopping.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let updateShoppingTask = async (req, res) => {
  const { error } = validateUpdateTask(req.body);

  if (error) {
    let code = "00300";
    if (error.details[0].message.includes("taskId")) code = "00301";
    else if (error.details[0].message.includes("at least")) code = "00302";
    else if (error.details[0].message.includes("newFoodName")) code = "00303";
    else if (error.details[0].message.includes("newQuantity")) code = "00304";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let task = "";
  let food = "";

  // find the task with provided id
  try {
    task = await db.ShoppingListDetail.findOne({
      where: {
        id: req.body.taskId,
      },
      include: db.ShoppingList,
    });
  } catch (error) {
    return res.status(500).json(errorHelper("00305", req, error.message));
  }

  // task not found
  if (!task) {
    return res.status(403).json(errorHelper("00306", req));
  }

  let rawTask = await db.ShoppingListDetail.findOne({
    where: {
      id: req.body.taskId,
    },
    include: db.ShoppingList,
    raw: true,
  });
  // the modify user is not group admin
  let adminId = rawTask["ShoppingList.belongsToGroupAdminId"];
  // console.log(adminId);

  if (adminId != req.user.id) {
    return res.status(403).json(errorHelper("00307", req));
  }

  if (req.body.newFoodName) {
    //try to find food with newname
    try {
      food = await db.Food.findOne({
        where: {
          name: req.body.newFoodName,
        },
      });

      if (!food) {
        return res.status(403).json(errorHelper("00308", req));
      }
      let exists = await db.ShoppingListDetail.findOne({
        where: {
          FoodId: food.id,
        },
      });
      if (exists) {
        return res.status(403).json(errorHelper("00309", req));
      }
      task.FoodId = food.id;
    } catch (error) {
      return res.status(500).json(errorHelper("00310", req, error.message));
    }
  }

  if (req.body.newQuantity) {
    task.quantity = req.body.newQuantity;
  }
  // Update shopping task
  try {
    await task.save();
  } catch (error) {
    return res.status(500).json(errorHelper("00311", req, error.message));
  }

  logger("00312", req.user.id, getText("en", "00312"), "Info", req);

  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00312"),
      vn: getText("vn", "00312"),
    },
    resultCode: "00312",
  });
};

module.exports = updateShoppingTask;
