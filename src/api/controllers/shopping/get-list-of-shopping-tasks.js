const db = require("../../../models/index.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let getListOfTasks = async (req, res) => {
  let userId = req.user.id;
  let role = "member";
  let user = "";
  let list = "";

  try {
    user = await db.User.findOne({
      where: {
        id: userId,
      },
    });

    // this user doesnt belong to any group
    if (user.belongsToGroupAdminId == 0) {
      return res.status(403).json(errorHelper("00288", req));
    }

    // this user is not admin of the group
    if (user.id == user.belongsToGroupAdminId) {
      role = "admin";
    }
  } catch (error) {
    return res.status(500).json(errorHelper("00289", req, error.message));
  }

  if (role == "admin") {
    try {
      list = await db.ShoppingList.findAll({
        where: {
          belongsToGroupAdminId: userId,
        },
        raw: true,
      });

      await Promise.all(
        list.map(async function (shoppingList) {
          let details = await db.ShoppingListDetail.findAll({
            where: {
              ShoppingListId: shoppingList.id,
            },
            include: {
              model: db.Food,
              attributes: ["name", "imageUrl", "type"],
              include: {
                model: db.UnitOfMeasurement,
                attributes: ["unitName"],
              },
            },
            raw: true,
          });

          shoppingList.details = details;
        })
      );
    } catch (error) {
      return res.status(500).json(errorHelper("00290", req, error.message));
    }
  }

  if (role == "member") {
    try {
      list = await db.ShoppingList.findAll({
        where: {
          assignedToUserId: userId,
        },
        raw: true,
      });
      await Promise.all(
        list.map(async function (shoppingList) {
          let details = await db.ShoppingListDetail.findAll({
            where: {
              ShoppingListId: shoppingList.id,
            },
            include: {
              model: db.Food,
              attributes: ["name", "imageUrl", "type"],
              include: {
                model: db.UnitOfMeasurement,
                attributes: ["unitName"],
              },
            },
            raw: true,
          });

          shoppingList.details = details;
        })
      );
    } catch (error) {
      return res.status(500).json(errorHelper("00291", req, error.message));
    }
  }

  logger("00292", req.user.id, getText("en", "00292"), "Info", req);

  return res.status(200).json({
    resultMessage: {
      en: getText("en", "00292"),
      vn: getText("vn", "00292"),
    },
    resultCode: "00292",
    role,
    list,
  });
  //
};

module.exports = getListOfTasks;
