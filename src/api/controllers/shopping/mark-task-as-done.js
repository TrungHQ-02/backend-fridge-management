const db = require("../../../models/index.js");
const {
  validateMarkTaskAsDone,
} = require("../../validators/shopping.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let markTask = async (req, res) => {
  const { error } = validateMarkTaskAsDone(req.body);

  if (error) {
    let code = "00287x";
    // console.log(error.details[0].message);
    if (error.details[0].message.includes("taskId")) code = "00287x1";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let task = "";

  // get the list with the provided list id
  try {
    task = await db.ShoppingListDetail.findOne({
      where: {
        id: req.body.taskId,
      },
      include: db.ShoppingList,
      raw: true,
    });

    //  console.log(task);
  } catch (error) {
    return res.status(500).json(errorHelper("00287x2", req, error.message));
  }

  if (!task) {
    return res.status(403).json(errorHelper("00287x3", req));
  }

  //   console.log(req.user.id);
  //   console.log(task["ShoppingList.belongsToGroupAdminId"]);
  //   console.log(task["ShoppingList.assignedToUserId"]);
  // this user is not the admin of this shopping list
  if (
    task["ShoppingList.belongsToGroupAdminId"] != req.user.id &&
    task["ShoppingList.assignedToUserId"] != req.user.id
  ) {
    // this user is not the assigned user nor the admin
    return res.status(403).json(errorHelper("00287x4", req));
  }

  try {
    await db.ShoppingListDetail.update(
      {
        done: !task.done,
      },
      {
        where: {
          id: req.body.taskId,
        },
      }
    );
  } catch (error) {
    return res.status(500).json(errorHelper("00287x5", req, error.message));
  }

  logger("00287x6", req.user.id, getText("en", "00287x6"), "Info", req);

  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00287x6"),
      vn: getText("vn", "00287x6"),
    },
    resultCode: "00287x6",
  });
};

module.exports = markTask;
