const db = require("../../../models/index.js");
const { errorHelper, logger, getText } = require("../../../utils/index.js");

let checkAdmin = async (req, res, next) => {
  const user = await db.User.findOne({
    where: req.user.id,
  });

  if (user.type !== "admin")
    return res.status(403).json(errorHelper("00017", req));
  next();
};

module.exports = checkAdmin;
