const db = require("../../../../models/index.js");
const {
  errorHelper,
  getText,
  logger,
  sendNotificationToUserId,
} = require("../../../../utils/index.js");
const {
  validateAddUserToGroup,
} = require("../../../validators/user.validator.js");

let addMemberToGroup = async (req, res) => {
  let members = [];
  let adminId = 0;
  let userToAdd = "";

  const { error } = validateAddUserToGroup(req.body);
  if (error) {
    let code = "00100";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  try {
    userToAdd = await db.User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (userToAdd == null) {
      return res.status(500).json(errorHelper("00099x", req));
    }

    adminId = userToAdd.belongsToGroupAdminId;
    //  this user has already belonged to a group
    if (adminId != 0) {
      return res.status(500).json(errorHelper("00099", req));
    }

    await db.User.update(
      {
        belongsToGroupAdminId: req.user.id,
      },
      {
        where: {
          username: req.body.username,
        },
      }
    );
  } catch (err) {
    return res.status(500).json(errorHelper("00101", req, err.message));
  }

  sendNotificationToUserId(
    userToAdd.id,
    {
      title: "You have been added to a group.",
      body: "A user has added you to a group. Please check the app for any updates in your group!",
    },
    req,
    res
  );
  logger("00102", req.user.id, getText("en", "00102"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00102"), vn: getText("vn", "00102") },
    resultCode: "00102",
  });
};

module.exports = addMemberToGroup;
