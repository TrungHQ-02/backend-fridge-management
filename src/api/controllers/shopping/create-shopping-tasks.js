const db = require("../../../models/index.js");
const {
  validateCreateShoppingTasks,
} = require("../../validators/shopping.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let createTasks = async (req, res) => {
  const { error } = validateCreateShoppingTasks(req.body);

  console.log(req.body);

  if (error) {
    let code = "00267";
    console.log(error.details[0].message.includes);
    if (error.details[0].message.includes("listId")) code = "00268";
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
    return res.status(500).json(errorHelper("00269", req, error.message));
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
      return res.status(403).json(errorHelper("00270", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00271", req, error.message));
  }

  if (!currentList) {
    return res.status(403).json(errorHelper("00272", req));
  }

  // this user is not the admin of this shopping list
  if (currentList.belongsToGroupAdminId != req.user.id) {
    return res.status(403).json(errorHelper("00273", req));
  }

  // Update shopping list
  try {
    await currentList.destroy();
  } catch (error) {
    return res.status(500).json(errorHelper("00274", req, error.message));
  }

  logger("00275", req.user.id, getText("en", "00275"), "Info", req);

  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00275"),
      vn: getText("vn", "00275"),
    },
    resultCode: "00275",
  });
};

module.exports = createTasks;
