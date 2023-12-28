const db = require("../../../../models/index.js");
const { errorHelper, getText, logger } = require("../../../../utils/index.js");
const {
  validateDeleteUserFromGroup,
} = require("../../../validators/user.validator.js");

let deleteMember = async (req, res) => {
  let adminId = 0;
  let userToDelete = "";
  const { error } = validateDeleteUserFromGroup(req.body);
  if (error) {
    let code = "00107";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }
  try {
    userToDelete = await db.User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (userToDelete == null) {
      return res.status(500).json(errorHelper("00099x", req));
    }

    adminId = userToDelete.belongsToGroupAdminId;

    //  this user is not belong to any group
    if (adminId == 0) {
      return res.status(500).json(errorHelper("00103", req));
    }

    // the sender is not admin
    if (req.user.id != adminId) {
      return res.status(500).json(errorHelper("00104", req));
    }

    await db.User.update(
      {
        belongsToGroupAdminId: 0,
      },
      {
        where: {
          username: req.body.username,
        },
      }
    );
  } catch (err) {
    return res.status(500).json(errorHelper("00105", req, err.message));
  }

  logger("00106", req.user.id, getText("en", "00106"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00106"), vn: getText("vn", "00106") },
    resultCode: "00106",
  });
};

module.exports = deleteMember;
