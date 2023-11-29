const db = require("../../../../models/index.js");

const {
  validateSendVerificationCode,
} = require("../../../validators/user.validator.js");
const {
  errorHelper,
  generateRandomCode,
  sendCodeToEmail,
  logger,
  getText,
  signConfirmCodeToken,
} = require("../../../../utils/index.js");

let sendVerificationCode = async (req, res) => {
  const { error } = validateSendVerificationCode(req.body);
  if (error)
    return res
      .status(400)
      .json(errorHelper("00029", req, error.details[0].message));

  let user;
  try {
    user = await db.User.findOne({
      where: {
        email: req.body.email,
        isActivated: true,
      },
    });
  } catch (err) {
    return res.json(500).json(errorHelper("00030", req, err.message));
  }

  if (!user) return res.status(404).json(errorHelper("00036", req));

  const emailCode = generateRandomCode(4);
  await sendCodeToEmail(
    req.body.email,
    user.name,
    emailCode,
    user.language,
    "newCode",
    req,
    res
  );

  try {
    await db.User.update(
      {
        isVerified: false,
      },
      {
        where: {
          email: req.body.email,
        },
      }
    );
  } catch (err) {
    return res.status(500).json(errorHelper("00037", req, err.message));
  }

  const confirmCodeToken = signConfirmCodeToken(user.id, emailCode);
  logger("00048", user.id, getText("en", "00048"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00048"), vn: getText("vn", "00048") },
    resultCode: "00048",
    confirmToken: confirmCodeToken,
  });
};

module.exports = sendVerificationCode;
