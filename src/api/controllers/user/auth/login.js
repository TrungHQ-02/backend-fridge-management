const db = require("../../../../models/index.js");
const { validateLogin } = require("../../../validators/user.validator.js");
const {
  errorHelper,
  getText,
  logger,
  signAccessToken,
  signRefreshToken,
} = require("../../../../utils/index.js");
const bcrypt = require("bcryptjs");
// const { compare } = bcrypt;

let login = async (req, res) => {
  // console.log(req.body);
  const { error } = validateLogin(req.body);
  if (error) {
    let code = "00038";
    if (error.details[0].message.includes("email")) code = "00039";
    else if (error.details[0].message.includes("password")) code = "00040";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  // query for the user
  const user = await db.User.findOne({
    where: {
      email: req.body.email,
      isActivated: true,
      isVerified: true,
    },
  }).catch((err) => {
    return res.status(500).json(errorHelper("00008", req, err.message));
  });

  if (!user) return res.status(404).json(errorHelper("00042", req));

  if (!user.isActivated) return res.status(400).json(errorHelper("00043", req));

  if (!user.isVerified) return res.status(400).json(errorHelper("00044", req));

  //   const match = await compare(req.body.password, user.password);
  const match = req.body.password == user.password;
  if (!match) return res.status(400).json(errorHelper("00045", req));

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);
  //NOTE: 604800000 ms is equal to 7 days. So, the expiry date of the token is 7 days after.
  try {
    await db.Token.update(
      {
        refreshToken: refreshToken,
        status: true,
        expiresIn: Date.now() + 604800000,
        createdAt: Date.now(),
      },
      {
        where: {
          userId: user.id,
        },
      }
    );
  } catch (err) {
    return res.status(500).json(errorHelper("00008", req, err.message));
  }

  logger("00047", user._id, getText("en", "00047"), "Info", req);
  user.password = "";
  return res.status(200).json({
    resultMessage: { en: getText("en", "00047"), vn: getText("vn", "00047") },
    resultCode: "00047",
    user,
    accessToken,
    refreshToken,
  });
};

module.exports = login;
