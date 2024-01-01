const db = require("../../../models/index.js");
const {
  validateDeleteTask,
} = require("../../validators/shopping.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let deleteTask = async (req, res) => {
  const { error } = validateDeleteTask(req.body);

  if (error) {
    let code = "00293";
    if (error.details[0].message.includes("taskId")) code = "00294";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let task = "";
  try {
    task = await db.ShoppingListDetail.findOne({
      where: {
        id: req.body.taskId,
      },
      include: db.ShoppingList,
      raw: true,
    });
  } catch (error) {
    return res.status(500).json(errorHelper("00295", req, error.message));
  }

  // task not found
  if (!task) {
    return res.status(403).json(errorHelper("00296", req));
  }

  let adminId = task["ShoppingList.belongsToGroupAdminId"];

  if (adminId != req.user.id) {
    return res.status(403).json(errorHelper("00297", req));
  }

  try {
    await db.ShoppingListDetail.destroy({
      where: {
        id: req.body.taskId,
      },
    });
  } catch (error) {
    return res.status(500).json(errorHelper("00298", req, error.message));
  }

  logger("00299", req.user.id, getText("en", "00299"), "Info", req);
  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00299"),
      vn: getText("vn", "00299"),
    },
    resultCode: "00299",
  });
};

module.exports = deleteTask;
