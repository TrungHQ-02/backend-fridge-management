const db = require("../../../../models/index.js");
const {
  validateForgotPassword,
} = require("../../../validators/user.validator.js");
const { errorHelper, getText, logger } = require("../../../../utils/index.js");
// import bcrypt from "bcryptjs";
// const { hash } = bcrypt;

let forgotPassword = async (req, res) => {
  const { error } = validateForgotPassword(req.body);
  if (error)
    return res
      .status(400)
      .json(errorHelper("00066", req, error.details[0].message));

  //   const hashed = await hash(req.body.password, 10);

  try {
    await db.User.update(
      {
        password: password,
      },
      {
        where: {
          userId: req.user.id,
          isVerified: true,
          isActivated: true,
        },
      }
    );
  } catch (err) {
    return res.status(500).json(errorHelper("00067", req, err.message));
  }

  logger("00068", req.user.id, getText("en", "00068"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00068"), vn: getText("vn", "00068") },
    resultCode: "00068",
  });
};

module.exports = forgotPassword;

/**
 * @swagger
 * /user/forgot-password:
 *    post:
 *      summary: Saves the Password when Forgot
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      requestBody:
 *        description: New password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                password:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: The new password was created successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "400":
 *          description: Please provide a password longer than 6, less than 20 characters.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "401":
 *          description: Invalid token.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
