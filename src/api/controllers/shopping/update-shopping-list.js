const db = require("../../../models/index.js");
const {
  validateUpdateShoppingList,
} = require("../../validators/shopping.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let updateShoppingList = async (req, res) => {
  const { error } = validateUpdateShoppingList(req.body);

  console.log(req.body);

  if (error) {
    let code = "00250";
    if (error.details[0].message.includes("listId")) code = "00251";
    else if (error.details[0].message.includes("at least")) code = "00252";
    else if (error.details[0].message.includes("newName")) code = "00253";
    else if (error.details[0].message.includes("newAssignToUsername"))
      code = "00254";
    else if (error.details[0].message.includes("newNote")) code = "00255";
    else if (error.details[0].message.includes("newDate")) code = "00256";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let assignedUser = "";
  let currentList = "";

  // get the list with the provided list id
  try {
    currentList = await db.ShoppingList.findOne({
      where: {
        id: req.body.listId,
      },
    });
  } catch (error) {
    return res.status(500).json(errorHelper("00257", req, error.message));
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
      return res.status(403).json(errorHelper("00258", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00259", req, error.message));
  }

  if (!currentList) {
    return res.status(403).json(errorHelper("00260", req));
  }

  // this user is not the admin of this shopping list
  if (currentList.belongsToGroupAdminId != req.user.id) {
    return res.status(403).json(errorHelper("00261", req));
  }

  // check authority
  if (req.body.newAssignToUsername) {
    try {
      assignedUser = await db.User.findOne({
        where: {
          username: req.body.newAssignToUsername,
        },
      });

      if (!assignedUser) {
        // không tồn tại username này
        return res.status(409).json(errorHelper("00262", req));
      }

      // người dùng này không có quyền gán list này cho username
      if (assignedUser.belongsToGroupAdminId !== req.user.id) {
        return res.status(403).json(errorHelper("00263", req));
      }

      currentList.assignedToUserId = assignedUser.id;
    } catch (error) {
      return res.status(500).json(errorHelper("00264", req, error.message));
    }
  }

  if (req.body.newName) {
    currentList.name = req.body.newName;
  }

  if (req.body.newNote) {
    currentList.note = req.body.newNote;
  }

  if (req.body.newDate) {
    currentList.date = new Date(req.body.newDate);
  }

  // Update shopping list
  try {
    await currentList.save();
    currentList = await db.ShoppingList.findOne({
      where: {
        id: currentList.id,
      },
    });
  } catch (error) {
    return res.status(500).json(errorHelper("00265", req, error.message));
  }

  logger("00266", req.user.id, getText("en", "00266"), "Info", req);

  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00266"),
      vn: getText("vn", "00266"),
    },
    resultCode: "00266",
    newShoppingList: currentList,
  });
};

module.exports = updateShoppingList;
