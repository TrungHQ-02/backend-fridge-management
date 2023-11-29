const db = require("../../../../models/index.js");

const {
  validateVerifyEmail,
} = require("../../../validators/user.validator.js");
const {
  errorHelper,
  logger,
  getText,
  signAccessToken,
  signRefreshToken,
} = require("../../../../utils/index.js");

const { jwtSecretKey } = require("../../../../config/index.js");
const pkg = require("jsonwebtoken");
const { verify } = pkg;

let verifyEmail = async (req, res) => {
  const { error } = validateVerifyEmail(req.body);
  if (error)
    return res
      .status(400)
      .json(errorHelper("00053", req, error.details[0].message));

  try {
    req.user = verify(req.body.token, jwtSecretKey);
  } catch (err) {
    return res.status(400).json(errorHelper("00055", req, err.message));
  }

  let user;
  try {
    user = await db.Token.findOne({
      where: {
        id: req.user.id,
        isActivated: true,
      },
    });
    //  console.log(userToken);
  } catch (err) {
    return res.status(500).json(errorHelper("00051", req, err.message));
  }

  if (user == null) return res.status(400).json(errorHelper("00052", req));

  if (req.body.code !== req.user.code)
    return res.status(400).json(errorHelper("00054", req));

  try {
    await db.User.update(
      {
        isVerified: true,
      },
      {
        where: {
          userId: req.user.id,
        },
      }
    );
  } catch (err) {
    return res.status(500).json(errorHelper("00056", req, err.message));
  }

  const accessToken = signAccessToken(req.user.id);
  const refreshToken = signRefreshToken(req.user.id);

  try {
    await db.Token.update(
      {
        userId: req.user.id,
        refreshToken: refreshToken,
        status: true,
        expires: Date.now() + 604800000,
        createdAt: Date.now(),
      },
      {
        where: {
          userId: req.user.id,
        },
      }
    );
  } catch (err) {
    return res.status(500).json(errorHelper("00057", req, err.message));
  }

  logger("00058", req.user.id, getText("en", "00058"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00058"), vn: getText("vn", "00058") },
    resultCode: "00058",
    accessToken,
    refreshToken,
  });
};

module.exports = verifyEmail;
