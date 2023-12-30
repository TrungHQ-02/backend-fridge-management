const db = require("../../../models/index.js");
const {
  validateCreateShoppingList,
} = require("../../validators/shopping.validator.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let createShoppingList = async (req, res) => {
  const { error } = validateCreateShoppingList(req.body);
  if (error) {
    let code = "00238";
    console.log(error.details[0].message);
    if (
      error.details[0].message.includes("name") &&
      !error.details[0].message.includes("assign")
    )
      code = "00239";
    else if (error.details[0].message.includes("assignToUsername"))
      code = "00240";
    else if (error.details[0].message.includes("note")) code = "00241";
    else if (error.details[0].message.includes("date")) code = "00242";
    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  let assignToUsername = req.body.assignToUsername;
  let assignPersonId = req.user.id;
  let assignedUser = "";

  let newShoppingList = "";

  try {
    let admin = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (admin.id != admin.belongsToGroupAdminId) {
      return res.status(403).json(errorHelper("00243", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00244", req, error.message));
  }

  // check authority
  try {
    assignedUser = await db.User.findOne({
      where: {
        username: assignToUsername,
      },
    });

    if (!assignedUser) {
      // không tồn tại username này
      return res.status(409).json(errorHelper("00245", req));
    }

    if (assignedUser.belongsToGroupAdminId !== assignPersonId) {
      return res.status(403).json(errorHelper("00246", req));
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00247", req, error.message));
  }

  // Create a new shopping list
  try {
    newShoppingList = await db.ShoppingList.create({
      name: req.body.name,
      note: req.body.note ? req.body.note : req.body.name,
      date: req.body.date ? new Date(req.body.date) : new Date(),
      belongsToGroupAdminId: req.user.id,
      assignedToUserId: assignedUser.id,
      UserId: req.user.id,
    });
    newShoppingList = await db.ShoppingList.findOne({
      where: {
        id: newShoppingList.id,
      },
    });
  } catch (error) {
    return res.status(500).json(errorHelper("00248", req, error.message));
  }

  logger("00249", req.user.id, getText("en", "00249"), "Info", req);

  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00249"),
      vn: getText("vn", "00249"),
    },
    resultCode: "00249",
    createdShoppingList: newShoppingList,
  });
};

module.exports = createShoppingList;
