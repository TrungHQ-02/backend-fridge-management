const db = require("../../../../models/index.js");
const { errorHelper, getText, logger } = require("../../../../utils/index.js");
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

  logger("00102", req.user.id, getText("en", "00102"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00102"), vn: getText("vn", "00102") },
    resultCode: "00102",
  });
};

module.exports = addMemberToGroup;
