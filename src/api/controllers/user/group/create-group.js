const db = require("../../../../models/index.js");
const { errorHelper, getText, logger } = require("../../../../utils/index.js");

let createAGroup = async (req, res) => {
  try {
    let checkedUser = await db.User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (checkedUser.belongsToGroupAdminId != "0") {
      return res.status(500).json(errorHelper("00093", req));
    } else {
      await db.User.update(
        {
          belongsToGroupAdminId: req.user.id,
        },
        {
          where: {
            id: req.user.id,
            isVerified: true,
            isActivated: true,
          },
        }
      );
    }
  } catch (err) {
    return res.status(500).json(errorHelper("00094", req, err.message));
  }

  logger("00095", req.user.id, getText("en", "00095"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00095"), vn: getText("vn", "00095") },
    resultCode: "00095",
  });
};

module.exports = createAGroup;
