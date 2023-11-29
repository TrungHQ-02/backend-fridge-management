const db = require("../../../../models/index.js");
const { validateLogin } = require("../../../validators/user.validator.js");
const { errorHelper, getText, logger } = require("../../../../utils/index.js");
const bcrypt = require("bcryptjs");

// must attach refresh token in the header
let logout = async (req, res) => {
  try {
    await db.Token.update(
      {
        status: false,
        expiresIn: Date.now(),
      },
      {
        where: {
          userId: req.user.id,
        },
      }
    );
  } catch (err) {
    return res.status(500).json(errorHelper("00046", req, err.message));
  }

  logger("00050", req.user.id, getText("en", "00050"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00050"), vn: getText("vn", "00050") },
    resultCode: "00050",
  });
};

module.exports = logout;
