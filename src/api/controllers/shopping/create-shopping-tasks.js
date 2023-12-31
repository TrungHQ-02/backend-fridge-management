const db = require("../../../models/index.js");
const {
  validateCreateShoppingTasks,
} = require("../../validators/shopping.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let createTasks = async (req, res) => {
  const { error } = validateCreateShoppingTasks(req.body);

  if (error) {
    let code = "00276";
    console.log(error.details[0].message);
    if (error.details[0].message.includes("listId")) code = "00277";
    else if (
      error.details[0].message.includes("tasks") &&
      !error.details[0].message.includes(".")
    )
      code = "00278";
    else if (error.details[0].message.includes("tasks")) code = "00279";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let currentList = "";

  // get the list with the provided list id
  try {
    currentList = await db.ShoppingList.findOne({
      where: {
        id: req.body.listId,
      },
    });
  } catch (error) {
    return res.status(500).json(errorHelper("00280", req, error.message));
  }

  // get the admin by req.user.id
  try {
    let admin = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    // this user is not admin of the group
    if (admin.id != admin.belongsToGroupAdminId) {
      return res.status(403).json(errorHelper("00281", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00282", req, error.message));
  }

  if (!currentList) {
    return res.status(403).json(errorHelper("00283", req));
  }

  // this user is not the admin of this shopping list
  if (currentList.belongsToGroupAdminId != req.user.id) {
    return res.status(403).json(errorHelper("00284", req));
  }

  //   create task
  let tasks = req.body.tasks;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const foodName = task.foodName;
    const quantity = task.quantity;
    let food = "";

    console.log(`Food: ${foodName}, Quantity: ${quantity}`);
    try {
      food = await db.Food.findOne({
        where: {
          name: foodName,
        },
      });

      if (!food) {
        return res.status(403).json(errorHelper("00285", req));
      }
      let exists = await db.ShoppingListDetail.findOne({
        where: {
          FoodId: food.id,
        },
      });
      if (exists) {
        return res.status(403).json(errorHelper("00285x", req));
      }
      // food with the provided name doesnt exist
    } catch (error) {
      return res.status(500).json(errorHelper("00286", req, error.message));
    }

    try {
      await db.ShoppingListDetail.create({
        quantity: quantity,
        FoodId: food.id,
        ShoppingListId: currentList.id,
      });
    } catch (error) {
      return res.status(500).json(errorHelper("00271", req, error.message));
    }
  }

  logger("00287", req.user.id, getText("en", "00287"), "Info", req);

  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00287"),
      vn: getText("vn", "00287"),
    },
    resultCode: "00287",
  });
};

module.exports = createTasks;
